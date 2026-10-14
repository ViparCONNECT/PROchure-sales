import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProfileCard from "../profile-kit/ProfileCard";
import type { ProfileCardData } from "../profile-kit/types";

interface ProfileCardModalProps {
    data: ProfileCardData | null;
    onClose: () => void;
}

/** Full visiting card (dark front + details) in a popup. */
export default function ProfileCardModal({ data, onClose }: ProfileCardModalProps) {
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

    return createPortal(
        <AnimatePresence>
            {data && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] flex items-start sm:items-center justify-center p-4 overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        className="relative w-full max-w-lg shadow-2xl my-8"
                    >
                        <ProfileCard data={data} showDetails onClose={onClose} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
