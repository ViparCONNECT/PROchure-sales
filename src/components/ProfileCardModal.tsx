import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
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
                        className="pk-root relative w-full max-w-lg max-h-[90vh] my-8 overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        {title && (
                            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-slate-700">
                                {title}
                            </div>
                        )}
                        <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-5">
                            <ProfileCard
                                data={data}
                                showDetails
                                onClose={onClose}
                                actionSlot={allowShare && shareUrl ? (
                                    <button
                                        type="button"
                                        onClick={handleShare}
                                        className="inline-flex items-center justify-center rounded-lg border border-prochure-bg bg-prochure-bg/5 px-3 py-2 text-sm font-semibold text-prochure-bg transition hover:bg-prochure-bg hover:text-white"
                                    >
                                        {shareStatus === "copied" ? "Copied" : shareStatus === "failed" ? "Try again" : "Share profile"}
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
