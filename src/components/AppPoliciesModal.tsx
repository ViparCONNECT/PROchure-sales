import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Shield, FileText, AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface AppPoliciesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCloseSidebar: () => void;
}

const policies = [
    { label: "Privacy Policy", path: "/policies/privacy-policy", icon: Shield },
    { label: "Terms & Conditions", path: "/policies/terms-and-conditions", icon: FileText },
    { label: "Disclaimer", path: "/policies/disclaimer", icon: AlertTriangle },
    { label: "Refund Policy", path: "/policies/refund-policy", icon: RefreshCw },
];

export default function AppPoliciesModal({ isOpen, onClose, onCloseSidebar }: AppPoliciesModalProps) {
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleNavigate = (path: string) => {
        onClose();
        onCloseSidebar();
        navigate(path);
    };

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
                        className="relative w-full max-w-md bg-prochure-bg shadow-2xl rounded-sm overflow-hidden border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 p-2"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 text-white">
                            <h2 className="text-xl font-bold mb-6 tracking-wide uppercase">
                                App Policies
                            </h2>

                            <div className="space-y-3">
                                {policies.map((policy) => (
                                    <button
                                        key={policy.path}
                                        onClick={() => handleNavigate(policy.path)}
                                        className="w-full flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/15 transition-colors text-left group cursor-pointer"
                                    >
                                        <policy.icon size={20} className="text-yellow-400 shrink-0" />
                                        <span className="text-white/90 group-hover:text-white font-medium flex-1">
                                            {policy.label}
                                        </span>
                                        <ChevronRight size={18} className="text-white/40 group-hover:text-white/80 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
