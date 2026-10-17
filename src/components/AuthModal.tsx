import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, LogIn, ArrowLeft, Loader2, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../config/authApi";

export type AuthMode = "register" | "login";

interface AuthModalProps {
    isOpen: boolean;
    initialMode: AuthMode;
    onClose: () => void;
}

const COUNTRY_CODES = [
    { code: "+91", label: "IN +91" },
    { code: "+971", label: "AE +971" },
    { code: "+966", label: "SA +966" },
    { code: "+974", label: "QA +974" },
    { code: "+968", label: "OM +968" },
    { code: "+965", label: "KW +965" },
    { code: "+973", label: "BH +973" },
    { code: "+1", label: "US/CA +1" },
    { code: "+44", label: "UK +44" },
    { code: "+61", label: "AU +61" },
    { code: "+65", label: "SG +65" },
    { code: "+60", label: "MY +60" },
    { code: "+49", label: "DE +49" },
    { code: "+33", label: "FR +33" },
    { code: "+977", label: "NP +977" },
    { code: "+94", label: "LK +94" },
    { code: "+880", label: "BD +880" },
];

const E164_REGEX = /^\+[1-9]\d{7,14}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_CLASS =
    "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors";
const LABEL_CLASS = "block text-xs font-semibold uppercase tracking-wide text-white mb-1.5";
const PRIMARY_BTN_CLASS =
    "w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-prochure-bg font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer";

export default function AuthModal({ isOpen, initialMode, onClose }: AuthModalProps) {
    const { sendRegisterOtp, verifyRegisterOtp, sendLoginOtp, verifyLoginOtp } = useAuth();

    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [step, setStep] = useState<"details" | "otp">("details");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [mobile, setMobile] = useState("");
    const [loginBy, setLoginBy] = useState<"mobile" | "email">("mobile");
    const [otp, setOtp] = useState("");
    const [maskedPhone, setMaskedPhone] = useState("");
    const [resendIn, setResendIn] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = "hidden";
        setMode(initialMode);
        setStep("details");
        setOtp("");
        setError(null);
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, initialMode]);

    useEffect(() => {
        if (resendIn <= 0) return;
        const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [resendIn]);

    if (!isOpen) return null;

    const phone = `${countryCode}${mobile.replace(/\D/g, "")}`;
    const identifier = loginBy === "email" ? email.trim().toLowerCase() : phone;

    const validateDetails = (): string | null => {
        if (mode === "register" && name.trim().length < 2) return "Please enter your full name.";
        if ((mode === "register" || loginBy === "email") && !EMAIL_REGEX.test(email.trim())) {
            return "Please enter a valid email address.";
        }
        if ((mode === "register" || loginBy === "mobile") && !E164_REGEX.test(phone)) {
            return "Please enter a valid mobile number.";
        }
        return null;
    };

    const requestOtp = async () => {
        setError(null);
        setIsSubmitting(true);
        try {
            const res =
                mode === "register"
                    ? await sendRegisterOtp({ name: name.trim(), email: email.trim().toLowerCase(), phone })
                    : await sendLoginOtp(identifier);
            setMaskedPhone(res.maskedPhone);
            setResendIn(res.resendInSeconds);
            setOtp("");
            setStep("otp");
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDetailsSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationError = validateDetails();
        if (validationError) return setError(validationError);
        void requestOtp();
    };

    const handleOtpSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!/^\d{4,8}$/.test(otp)) return setError("Please enter the OTP you received.");
        setError(null);
        setIsSubmitting(true);
        try {
            if (mode === "register") await verifyRegisterOtp({ phone, otp });
            else await verifyLoginOtp({ identifier, otp });
            onClose();
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    };

    const switchMode = (next: AuthMode) => {
        setMode(next);
        setStep("details");
        setError(null);
    };

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-prochure-bg shadow-2xl rounded-sm overflow-hidden border border-white/10 max-h-[90vh] flex flex-col text-white"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 p-2 cursor-pointer"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-6 pb-0 shrink-0">
                        <div className="flex items-center gap-2 mb-4">
                            {mode === "register" ? (
                                <UserPlus size={22} />
                            ) : (
                                <LogIn size={22} />
                            )}
                            <h2 className="text-xl font-bold tracking-wide uppercase">
                                {mode === "register" ? "Register" : "Login"}
                            </h2>
                        </div>

                        {/* Tabs */}
                        {step === "details" && (
                            <div className="flex gap-1 border-b border-white/10">
                                {(["register", "login"] as const).map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => switchMode(m)}
                                        className={`px-4 py-2 text-sm font-medium uppercase transition-colors cursor-pointer border-b-2 ${
                                            mode === m
                                                ? ""
                                                : "text-white/70 hover:text-white border-transparent"
                                        }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-6 overflow-y-auto">
                        {step === "details" ? (
                            <form onSubmit={handleDetailsSubmit} className="space-y-4" noValidate>
                                {mode === "login" && (
                                    <div className="flex gap-2 text-xs">
                                        {(["mobile", "email"] as const).map((by) => (
                                            <button
                                                key={by}
                                                type="button"
                                                onClick={() => {
                                                    setLoginBy(by);
                                                    setError(null);
                                                }}
                                                className={`px-3 py-1.5 rounded-full border uppercase tracking-wide cursor-pointer transition-colors ${
                                                    loginBy === by
                                                        ? ""
                                                        : "border-white/20 text-white/70 hover:text-white"
                                                }`}
                                            >
                                                <span className="lowercase">via</span> {by}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {mode === "register" && (
                                    <div>
                                        <label htmlFor="auth-name" className={LABEL_CLASS}>Full name</label>
                                        <input
                                            id="auth-name"
                                            type="text"
                                            autoComplete="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your Name"
                                            maxLength={100}
                                            className={INPUT_CLASS}
                                        />
                                    </div>
                                )}

                                {(mode === "register" || loginBy === "email") && (
                                    <div>
                                        <label htmlFor="auth-email" className={LABEL_CLASS}>Email</label>
                                        <input
                                            id="auth-email"
                                            type="email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className={INPUT_CLASS}
                                        />
                                    </div>
                                )}

                                {(mode === "register" || loginBy === "mobile") && (
                                   <div>
                                        <label htmlFor="auth-mobile" className={LABEL_CLASS}>WhatsApp mobile number</label>
                                        <div className="flex gap-2">
                                            <select
                                                aria-label="Country code"
                                                value={countryCode}
                                                onChange={(e) => setCountryCode(e.target.value)}
                                                className={`${INPUT_CLASS} w-auto min-w-[5rem] max-w-[8rem] px-2 shrink-0 cursor-pointer`}
                                            >
                                                {COUNTRY_CODES.map((c) => (
                                                    <option key={c.label} value={c.code} className="text-black">
                                                        {c.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                id="auth-mobile"
                                                type="tel"
                                                inputMode="numeric"
                                                autoComplete="tel-national"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value.replace(/[^\d\s]/g, ""))}
                                                placeholder="9876543210"
                                                maxLength={16}
                                                className={`${INPUT_CLASS} flex-1`}
                                            />
                                        </div>
                                    </div>
                                )}

                                {error && <p className="text-sm text-red-300" role="alert">{error}</p>}

                                <button type="submit" disabled={isSubmitting} className={PRIMARY_BTN_CLASS}>
                                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <MessageCircle size={18} />}
                                    Send OTP on WhatsApp
                                </button>

                                <p className="text-center text-xs text-white/60">
                                    {mode === "register" ? "Already Registered ? " : "New to PROchure ? "}
                                    <button
                                        type="button"
                                        onClick={() => switchMode(mode === "register" ? "login" : "register")}
                                        className="text-white underline cursor-pointer"
                                    >
                                        {mode === "register" ? "LOGIN" : "REGISTER"}
                                    </button>
                                </p>
                            </form>
                        ) : (
                            <form onSubmit={handleOtpSubmit} className="space-y-4" noValidate>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep("details");
                                        setError(null);
                                    }}
                                    className="flex items-center gap-1 text-xs text-white/70 hover:text-white cursor-pointer"
                                >
                                    <ArrowLeft size={14} /> Edit details
                                </button>

                                <p className="text-sm text-white/80">
                                    We've sent an OTP to your WhatsApp number{" "}
                                    <strong className="text-white">{maskedPhone}</strong> via ‘Verify’.
                                </p>

                                <div>
                                    <label htmlFor="auth-otp" className={LABEL_CLASS}>Enter OTP</label>
                                    <input
                                        id="auth-otp"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        autoFocus
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))}
                                        placeholder="••••••"
                                        className={`${INPUT_CLASS} text-center text-2xl tracking-[0.5em] font-mono`}
                                    />
                                </div>

                                {error && <p className="text-sm text-red-300" role="alert">{error}</p>}

                                <button type="submit" disabled={isSubmitting || otp.length < 4} className={PRIMARY_BTN_CLASS}>
                                    {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                                    Verify &amp; {mode === "register" ? "Register" : "Login"}
                                </button>

                                <p className="text-center text-xs text-white/60">
                                    Didn't receive it?{" "}
                                    {resendIn > 0 ? (
                                        <span>RESEND in {resendIn}s</span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => void requestOtp()}
                                            disabled={isSubmitting}
                                            className="text-yellow-400 hover:text-yellow-300 underline cursor-pointer disabled:opacity-60"
                                        >
                                            RESEND OTP
                                        </button>
                                    )}
                                </p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}
