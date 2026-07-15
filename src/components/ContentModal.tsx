import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const BRAND_COLOR = "#55374a";

interface ContentModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

/**
 * Reusable popup shell for hand-authored (JSX) document content.
 * Brand-colour background, fixed close button, scrollable body.
 */
export default function ContentModal({ isOpen, title, onClose, children }: ContentModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4"
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl rounded-sm overflow-hidden flex flex-col"
                        style={{ backgroundColor: BRAND_COLOR, maxHeight: "85vh" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Sticky Header */}
                        <div
                            className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/20"
                            style={{ backgroundColor: BRAND_COLOR }}
                        >
                            <h2 className="text-white font-semibold text-lg pr-8">{title}</h2>
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 cursor-pointer"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="overflow-y-auto custom-scrollbar flex-1 px-5 sm:px-8 py-6">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
