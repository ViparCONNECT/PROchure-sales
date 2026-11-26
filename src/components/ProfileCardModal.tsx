import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ProfileCard from "../profile-kit/ProfileCard";
import type { ProfileCardData } from "../profile-kit/types";

interface ProfileCardModalProps {
    data: ProfileCardData | null;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    actions?: ReactNode;
    allowShare?: boolean;
    shareUrl?: string;
}

/** Full visiting card (dark front + details) in a popup. */
export default function ProfileCardModal({
    data,
    onClose,
    title,
    children,
    actions,
    allowShare = true,
    shareUrl,
}: ProfileCardModalProps) {
    const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "failed">("idle");

    useEffect(() => {
        if (!data) return;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", onKey);
        };
    }, [data, onClose]);

    const handleShare = async () => {
        if (!shareUrl) return;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: data?.name ?? "PROchure profile",
                    text: `View this profile on PROchure: ${data?.name ?? "Profile"}`,
                    url: shareUrl,
                });
                return;
            }
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(shareUrl);
                setShareStatus("copied");
                return;
            }
            window.prompt("Copy this profile URL", shareUrl);
            setShareStatus("copied");
        } catch {
            setShareStatus("failed");
        }
    };

    return createPortal(
        <AnimatePresence>
            {data && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pk-root fixed inset-0 z-[300] flex items-start sm:items-center justify-center p-4 overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        className="pk-root relative flex h-[calc(100vh-4rem)] max-h-[90vh] w-full max-w-lg flex-col my-8 overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="shrink-0 border-b border-slate-200 bg-slate-50 px-12 py-2 text-center text-slate-700">
                            <div className="text-sm">e-Visiting Card</div>
                            {title && (
                                <div className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-slate-500">
                                    {title}
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-3 top-2 z-10 rounded-md p-2 text-slate-600 transition hover:bg-slate-100"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
                            <ProfileCard
                                data={data}
                                showDetails
                                tone="light"
                                actionSlot={allowShare && shareUrl ? (
                                    <button
                                        type="button"
                                        onClick={handleShare}
                                        className="inline-flex items-center justify-center rounded-md border border-prochure-bg bg-white px-2.5 py-1 text-xs font-bold text-prochure-bg transition hover:bg-prochure-bg hover:text-white"
                                    >
                                        {shareStatus === "copied" ? "Copied" : shareStatus === "failed" ? "Try again" : "Share Profile"}
                                    </button>
                                ) : null}
                            />
                            {children && <div className="mt-4">{children}</div>}
                            {actions && <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">{actions}</div>}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
