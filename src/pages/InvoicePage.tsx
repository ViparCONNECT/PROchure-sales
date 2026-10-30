import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LogIn, Printer } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { openAuthModal } from "../config/authEvents";
import { getErrorMessages, getMyInvoice } from "../config/myProfileApi";
import type { Invoice } from "../config/myProfileApi";
import PageSpinner from "../components/PageSpinner";
import { useSeo } from "../hooks/useSeo";

const inr = (paise: number) =>
    `₹ ${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
};

/** GST membership invoice for the logged-in user's paid subscription. Printable / Save as PDF. */
export default function InvoicePage() {
    const { user, isLoading } = useAuth();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [error, setError] = useState<string | null>(null);

    useSeo({ title: "Invoice | PROchure", description: "Membership payment invoice." });

    useEffect(() => {
        if (!user) return;
        getMyInvoice()
            .then(setInvoice)
            .catch((e) => setError(getErrorMessages(e)[0]));
    }, [user]);

    if (isLoading) return <div className="min-h-[50vh] flex items-center justify-center"><PageSpinner /></div>;

    if (!user) {
        return (
            <div className="container mx-auto px-4 max-w-xl py-16 text-center">
                <p className="text-slate-600 mb-6">Log in to view your invoice.</p>
                <button
                    onClick={() => openAuthModal("login")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-prochure-bg text-white font-semibold cursor-pointer"
                >
                    <LogIn size={18} /> Login
                </button>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 max-w-xl py-16 text-center text-slate-600">
                <p className="mb-6">{error}</p>
                <Link to="/my-profile" className="prochure-text underline">Back to My Profile</Link>
            </div>
        );
    }

    if (!invoice) return <div className="min-h-[50vh] flex items-center justify-center"><PageSpinner /></div>;

    const a = invoice.amounts;

    return (
        <div className="container mx-auto px-4 max-w-xl py-8">
            <div className="flex items-center justify-between mb-4 print:hidden">
                <Link to="/my-profile" className="inline-flex items-center gap-1 text-sm prochure-text hover:underline">
                    <ArrowLeft size={16} /> My Profile
                </Link>
                <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-prochure-bg text-white font-semibold hover:opacity-90 cursor-pointer"
                >
                    <Printer size={16} /> Download / Print
                </button>
            </div>

            <article className="invoice-print bg-white border border-slate-300 shadow-sm text-[14px] text-slate-800 font-sans">
                <header className="bg-prochure-bg text-white px-4 py-3">
                    <span className="brand-font text-2xl">PROchure</span>
                    <sup className="text-sm"> ®</sup>
                </header>

                <div className="px-4 py-4 space-y-4">
                    <p>
                        <span className="brand-font">PROchure</span> is a web application developed by{" "}
                        <span className="monotype-text">Vipar</span> CONNECT, IT wing of <span className="monotype-text">Vipar</span>{" "}
                        <sup>®</sup>
                    </p>

                    <h1 className="text-center font-bold tracking-wide">MEMBERSHIP PAYMENT INVOICE</h1>

                    <Field label="Invoice Id">{invoice.invoiceNumber}</Field>
                    <Field label="Invoice Date">{formatDate(invoice.invoiceDate)}</Field>

                    <div>
                        <p className="font-semibold">
                            <span className="monotype-text">Vipar</span> <sup>®</sup>
                        </p>
                        {invoice.seller.addressLines.map((l) => (
                            <p key={l}>{l}</p>
                        ))}
                        <p>GSTIN : {invoice.seller.gstin}</p>
                    </div>

                    <hr className="border-slate-200" />

                    <div>
                        <p>Recipient</p>
                        <p className="uppercase">{invoice.recipient}</p>
                    </div>

                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="bg-slate-100 font-semibold">
                                <td className="p-2">Order Id</td>
                                <td className="p-2 text-right break-all">{invoice.orderId}</td>
                            </tr>
                            <Row label="Profile Display Choice" value={invoice.profileDisplayChoice} />
                            <Row label="Advertising Charges (NIL for statutory licenced professionals)" value={inr(a.advertising)} />
                            <Row label="Tech Support (monthly) & Periodical Verification" value={inr(a.techSupport)} />
                            <Row label="CGST @ 9%" value={inr(a.cgst)} />
                            <Row label="SGST @ 9%" value={inr(a.sgst)} />
                            <Row label="Round-off" value={inr(a.roundOff)} />
                            <tr className="border-t border-slate-300 font-bold">
                                <td className="p-2">Total Amount</td>
                                <td className="p-2 text-right whitespace-nowrap">{inr(a.total)}</td>
                            </tr>
                            <tr className="font-bold">
                                <td className="p-2 align-top">
                                    Total Amount <span className="font-normal">( In Words )</span>
                                </td>
                                <td className="p-2 text-right">{invoice.amountInWords}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="text-center pt-2">** This is a computer-generated invoice. No signature required **</p>
                </div>
            </article>
        </div>
    );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div>
            <p className="font-semibold">{label}</p>
            <p>{children}</p>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <tr>
            <td className="p-2">{label}</td>
            <td className="p-2 text-right whitespace-nowrap">{value}</td>
        </tr>
    );
}
