
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface InceptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InceptionModal({ isOpen, onClose }: InceptionModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
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
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-3xl bg-prochure-bg shadow-2xl rounded-sm overflow-hidden border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 p-2"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 sm:p-12 md:p-16 text-white font-maiandra relative">
                            {/* Header */}
                            <h2 className="text-3xl sm:text-4xl mb-12 tracking-wide uppercase">
                                INCEPTION
                            </h2>

                            {/* Content */}
                            <div className="space-y-8 text-lg sm:text-xl leading-relaxed font-light text-white/90">
                                <p>
                                    <span className="text-yellow-400 font-normal">PROchure ®</span> is a path-breaking concept envisioned by Architect Vinod Venugopal, a registered architect with the Council of Architecture (CA/2011/51213).
                                </p>

                                <p>
                                    A '96 batch graduate from M S Ramaiah Institute of Technology in Bangalore, Ar. Vinod with over 2 decades of professional experience and expertise in the field of architecture, has always been extremely passionate about creating innovative concepts.
                                </p>

                                <p>
                                    <span className="text-yellow-400 font-normal">PROchure ®</span> is an application developed by <span className="monotype-text">Vipar</span> CONNECT, a wing of <span className="monotype-text">Vipar</span>® (founded by Ar. Vinod).
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
