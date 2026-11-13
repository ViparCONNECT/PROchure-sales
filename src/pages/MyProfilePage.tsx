import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, EyeOff, FileText, LogIn, Pencil } from "lucide-react";
import ProfileCard from "../profile-kit/ProfileCard";
import ProfileForm from "../profile-kit/ProfileForm";
import { toFormValues } from "../profile-kit/format";
import type { ProfilePayload } from "../profile-kit/types";
import { useAuth } from "../context/AuthContext";
import { openAuthModal } from "../config/authEvents";
import { PROFILE_TYPE_ROUTES } from "../config/profileTypes";
import {
    getErrorMessages,
    getMyProfile,
    loadCategoryGroupOptions,
    loadCategoryOptions,
    loadSubCategoryOptions,
    saveProfileGstin,
    updateMyProfile,
} from "../config/myProfileApi";
import type { MyProfileResponse } from "../config/myProfileApi";
import { formatFee, payListingFee } from "../config/razorpay";
import PageSpinner from "../components/PageSpinner";
import ProfileCardModal from "../components/ProfileCardModal";
import { useSeo } from "../hooks/useSeo";
import type { MyProfileLocationState } from "./PublishProfilePage";

type Notice = NonNullable<MyProfileLocationState["notice"]>;

const NOTICE_CLASS: Record<Notice["kind"], string> = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-yellow-50 border-yellow-200 text-yellow-800",
};

export default function MyProfilePage() {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState<MyProfileResponse | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);
    const [paying, setPaying] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewDeclarationAccepted, setPreviewDeclarationAccepted] = useState(false);
    const [previewGstinEnabled, setPreviewGstinEnabled] = useState(false);
    const [previewGstinValue, setPreviewGstinValue] = useState("");
    const [previewError, setPreviewError] = useState<string | null>(null);
    const [notice, setNotice] = useState<Notice | null>((location.state as MyProfileLocationState | null)?.notice ?? null);

    useSeo({ title: "My Profile | PROchure", description: "Manage your PROchure profile." });

    const load = useCallback(() => {
        setLoadError(null);
        return getMyProfile()
            .then(setData)
            .catch((e) => setLoadError(getErrorMessages(e)[0]));
    }, []);

    useEffect(() => {
        if (user) void load();
        else setData(null);
    }, [user, load]);

    // Drop the one-time notice from history so a refresh doesn't show it again
    useEffect(() => {
        if (location.state) navigate(location.pathname, { replace: true, state: null });
    }, [location.state, location.pathname, navigate]);

    const profile = data?.profile ?? null;
    const profileType = profile?.category?.type;

    useEffect(() => {
        if (!profile) return;
        setPreviewGstinEnabled(!!profile.gstin);
        setPreviewGstinValue(profile.gstin ?? "");
    }, [profile]);

    const initialValues = useMemo(() => (profile ? toFormValues(profile) : null), [profile]);

    if (isLoading) return <div className="min-h-[50vh] flex items-center justify-center"><PageSpinner /></div>;

    if (!user) {
        return (
            <div className="container mx-auto px-4 max-w-xl py-16 text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">My Profile</h1>
                <p className="text-slate-600 mb-8">Log in to view and manage your profile.</p>
                <button
                    onClick={() => openAuthModal("login")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-prochure-bg text-white font-semibold hover:opacity-90 cursor-pointer"
                >
                    <LogIn size={18} /> Login
                </button>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="container mx-auto px-4 max-w-xl py-16 text-center text-slate-600">
                <p className="mb-4">{loadError}</p>
                <button onClick={() => void load()} className="prochure-text underline cursor-pointer">Try again</button>
            </div>
        );
    }

    if (!data) return <div className="min-h-[50vh] flex items-center justify-center"><PageSpinner /></div>;

    if (!profile || !profileType || !initialValues) {
        return (
            <div className="container mx-auto px-4 max-w-2xl py-16 text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">You haven't Published a Professional Profile / Brand Profile yet !</h1>
                <p className="text-slate-600 mb-8">Choose your Classification to get started.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    {PROFILE_TYPE_ROUTES.map((r) => (
                        <Link
                            key={r.slug}
                            to={`/publish/${r.slug}`}
                            className="block py-4 px-4 rounded-lg bg-prochure-bg text-white font-semibold hover:opacity-90"
                        >
                            {r.label}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    const handlePay = async () => {
        setPaying(true);
        setNotice(null);
        try {
            setData(await payListingFee());
            setNotice({ kind: "success", text: "Payment successful — your profile is now live!" });
        } catch (err) {
            setNotice({ kind: "error", text: getErrorMessages(err)[0] });
        } finally {
            setPaying(false);
        }
    };

    const openPaymentPreview = () => {
        setPreviewError(null);
        setPreviewDeclarationAccepted(false);
        setPreviewGstinEnabled(!!profile?.gstin);
        setPreviewGstinValue(profile?.gstin ?? "");
        setPreviewOpen(true);
    };

    const continuePayment = async () => {
        if (!previewDeclarationAccepted) {
            setPreviewError("Please confirm the declaration to continue.");
            return;
        }
        if (previewGstinEnabled && previewGstinValue.trim().length !== 15) {
            setPreviewError("Please enter a valid 15-character GSTIN if you want to add it.");
            return;
        }
        setPreviewError(null);

        try {
            const updated = await saveProfileGstin({ gstin: previewGstinEnabled ? previewGstinValue.trim() : null });
            setData((d) => (d ? { ...d, profile: updated } : d));
        } catch (err) {
            setPreviewOpen(false);
            setNotice({ kind: "error", text: getErrorMessages(err)[0] });
            return;
        }

        setPreviewOpen(false);
        await handlePay();
    };

    const handleSave = async (payload: ProfilePayload) => {
        const updated = await updateMyProfile(payload);
        setData((d) => (d ? { ...d, profile: updated } : d));
        setEditing(false);
        setNotice({ kind: "success", text: "Your profile has been updated." });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const pending = profile.status === "PENDING_PAYMENT";

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">My Profile</h1>
                {!editing && (
                    <div className="flex flex-wrap gap-2">
                        {profile.paidAt && (
                            <Link
                                to="/my-profile/invoice"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-prochure-bg prochure-text font-semibold hover:bg-prochure-50"
                            >
                                <FileText size={16} /> View invoice
                            </Link>
                        )}
                        <button
                            onClick={() => setEditing(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-prochure-bg prochure-text font-semibold hover:bg-prochure-50 cursor-pointer"
                        >
                            <Pencil size={16} /> Edit profile
                        </button>
                    </div>
                )}
            </div>

            {notice && <div className={`mb-6 border rounded-lg px-4 py-3 text-sm ${NOTICE_CLASS[notice.kind]}`}>{notice.text}</div>}

            {pending ? (
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-yellow-200 bg-yellow-50 rounded-lg px-4 py-4">
                    <div className="flex items-start gap-3 text-yellow-900">
                        <Clock className="shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="font-semibold">Your {profileType === "PROFESSIONAL_CONSULTANT" ? "Professional" : "Business Brand"} Profile is SAVED but NOT PUBLISHED yet !</p>
                            <p className="text-sm">Pay ₹ {formatFee(data.fee.amount)} to make it globally visible on PROchure.</p>
                        </div>
                    </div>
                    <button
                        onClick={openPaymentPreview}
                        disabled={paying}
                        className="px-6 py-3 rounded-lg bg-prochure-bg text-white font-semibold hover:opacity-90 disabled:opacity-60 cursor-pointer"
                    >
                        {paying ? "Opening payment…" : "Make Payment to PUBLISH"}
                    </button>
                </div>
            ) : profile.isDisabled ? (
                <div className="mb-6 flex items-center gap-3 border border-slate-200 bg-slate-50 rounded-lg px-4 py-3 text-slate-700">
                    <EyeOff size={20} /> Your profile is currently hidden by the PROchure team. Please contact support.
                </div>
            ) : (
                <div className="mb-6 flex items-center gap-3 border border-green-200 bg-green-50 rounded-lg px-4 py-3 text-green-800">
                    <CheckCircle2 size={20} /> Your profile is live on PROchure.
                </div>
            )}

            {editing ? (
                <ProfileForm
                    profileType={profileType}
                    initialValues={initialValues}
                    loadCategoryGroups={loadCategoryGroupOptions}
                    loadCategories={loadCategoryOptions}
                    loadSubCategories={loadSubCategoryOptions}
                    getErrorMessages={getErrorMessages}
                    onSubmit={handleSave}
                    submitLabel="PUBLISH"
                    onCancel={() => setEditing(false)}
                />
            ) : (
                <div className="max-w-lg mx-auto shadow-lg">
                    <ProfileCard data={{ ...profile, profileType }} showDetails />
                </div>
            )}

            {profile && (
                <ProfileCardModal
                    data={previewOpen ? { ...profile, profileType, consultantKind: profile.consultantKind ?? null, gstin: previewGstinEnabled ? previewGstinValue : null } : null}
                    onClose={() => {
                        setPreviewOpen(false);
                        setPreviewError(null);
                        setPreviewDeclarationAccepted(false);
                        setPreviewGstinEnabled(!!profile.gstin);
                        setPreviewGstinValue(profile.gstin ?? "");
                    }}
                    title="PROFILE PREVIEW"
                    actions={
                        <>
                            <button
                                type="button"
                                className="pk-btn pk-btn-ghost"
                                onClick={() => {
                                    setPreviewOpen(false);
                                    setPreviewError(null);
                                    setPreviewDeclarationAccepted(false);
                                    setPreviewGstinEnabled(!!profile.gstin);
                                    setPreviewGstinValue(profile.gstin ?? "");
                                    setEditing(true);
                                }}
                                disabled={paying}
                            >
                                EDIT PROFILE
                            </button>
                            <button type="button" className="pk-btn pk-btn-primary" onClick={() => void continuePayment()} disabled={paying}>
                                {paying ? "Opening payment…" : "CONTINUE"}
                            </button>
                        </>
                    }
                >
                    <label className="pk-declaration" htmlFor="profile-payment-declaration">
                        <input
                            id="profile-payment-declaration"
                            type="checkbox"
                            checked={previewDeclarationAccepted}
                            onChange={(e) => {
                                setPreviewDeclarationAccepted(e.target.checked);
                                if (previewError) setPreviewError(null);
                            }}
                        />
                        <span className="pk-declaration-text">
                            I / We hereby declare that all the information provided in this profile is true and to the best of my / our knowledge.
                        </span>
                    </label>

                    <label className="pk-declaration pk-declaration-sub" htmlFor="profile-payment-gstin-check">
                        <input
                            id="profile-payment-gstin-check"
                            type="checkbox"
                            checked={previewGstinEnabled}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setPreviewGstinEnabled(checked);
                                if (!checked) {
                                    setPreviewGstinValue("");
                                }
                                if (previewError) setPreviewError(null);
                            }}
                        />
                        <span className="pk-declaration-text">I want to add my/our GSTIN</span>
                    </label>

                    {previewGstinEnabled && (
                        <div className="pk-gstin-wrap">
                            <input
                                className="pk-input"
                                type="text"
                                value={previewGstinValue}
                                maxLength={15}
                                placeholder="Enter GSTIN"
                                onChange={(e) => setPreviewGstinValue(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15))}
                            />
                            <p className="pk-gstin-note">
                                Your Payment (GST) Invoice will be sent to your registered Email ID and will also be available on the ‘My Profile’ link of your PROchure account after logging in, to download / print.
                            </p>
                        </div>
                    )}

                    {previewError && <div className="pk-alert pk-alert-inline" role="alert">{previewError}</div>}
                </ProfileCardModal>
            )}
        </div>
    );
}
