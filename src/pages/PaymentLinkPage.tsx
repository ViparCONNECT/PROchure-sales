import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, CreditCard } from "lucide-react";
import ProfileCard from "../profile-kit/ProfileCard";
import {
    createPaymentLinkOrder,
    getErrorMessages,
    getPaymentLink,
    verifyPaymentLink,
} from "../config/myProfileApi";
import type { PaymentLinkInfo } from "../config/myProfileApi";
import { checkout, formatFee } from "../config/razorpay";
import PageSpinner from "../components/PageSpinner";
import { useSeo } from "../hooks/useSeo";

/** Shareable "pay & subscribe" page opened from an admin-generated link. No login required. */
export default function PaymentLinkPage() {
    const { token = "" } = useParams();
    const [info, setInfo] = useState<PaymentLinkInfo | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [paying, setPaying] = useState(false);
    const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);

    useSeo({ title: "Pay & Subscribe | PROchure", description: "Complete your PROchure profile subscription." });

    const load = useCallback(() => {
        setLoadError(null);
        getPaymentLink(token)
            .then(setInfo)
            .catch((e) => setLoadError(getErrorMessages(e)[0]));
    }, [token]);

    useEffect(load, [load]);

    const handlePay = async () => {
        setPaying(true);
        setNotice(null);
        try {
            const updated = await checkout(
                () => createPaymentLinkOrder(token),
                (body) => verifyPaymentLink(token, body),
                new Error("Payment was not completed. You can try again using this same link."),
            );
            setInfo(updated);
            setNotice({ kind: "success", text: "Payment successful — thank you! Your profile subscription is active." });
        } catch (err) {
            setNotice({ kind: "error", text: getErrorMessages(err)[0] });
        } finally {
            setPaying(false);
        }
    };

    if (loadError) {
        return (
            <div className="container mx-auto px-4 max-w-xl py-16 text-center text-slate-600">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Payment link unavailable</h1>
                <p className="mb-6">{loadError}</p>
                <Link to="/" className="prochure-text underline">Go to the LOBBY page</Link>
            </div>
        );
    }

    if (!info) return <div className="min-h-[50vh] flex items-center justify-center"><PageSpinner /></div>;

    const profileType = info.profile.category?.type ?? "PROFESSIONAL_CONSULTANT";

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Pay &amp; Subscribe</h1>
            <p className="text-slate-600 mb-6">
                {info.ownerName ? <>Hi {info.ownerName}, this</> : "This"} is your profile on{" "}
                <span className="brand-font">PROchure</span>. Complete the subscription to keep it published.
            </p>

            {notice && (
                <div
                    className={`mb-6 border rounded-lg px-4 py-3 text-sm ${
                        notice.kind === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
                    }`}
                >
                    {notice.text}
                </div>
            )}

            <div className="grid md:grid-cols-[1fr_minmax(260px,320px)] gap-8 items-start">
                <div className="shadow-lg">
                    <ProfileCard data={{ ...info.profile, profileType }} showDetails />
                </div>

                <div className="border border-slate-200 rounded-xl p-6 bg-white md:sticky md:top-6">
                    {info.paid ? (
                        <div className="flex flex-col items-center text-center gap-3 text-green-700">
                            <CheckCircle2 size={40} />
                            <p className="font-semibold">Subscription paid</p>
                            {info.paidAt && (
                                <p className="text-sm text-slate-500">
                                    on {new Date(info.paidAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-slate-500">Profile subscription fee</p>
                            <p className="text-3xl font-bold text-slate-800 mb-6">{formatFee(info.fee.amount)}</p>
                            <button
                                onClick={handlePay}
                                disabled={paying}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-prochure-bg text-white font-semibold hover:opacity-90 disabled:opacity-60 cursor-pointer"
                            >
                                <CreditCard size={18} />
                                {paying ? "Opening payment…" : `Pay ${formatFee(info.fee.amount)}`}
                            </button>
                            <p className="mt-3 text-xs text-slate-500 text-center">Secure payment via Razorpay</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
