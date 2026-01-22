
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface SubscriptionFeesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubscriptionFeesModal({ isOpen, onClose }: SubscriptionFeesModalProps) {
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
                        className="relative w-full max-w-4xl bg-prochure-bg shadow-2xl rounded-sm overflow-hidden border border-white/10 flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 p-2"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 sm:p-12 md:p-16 text-white font-maiandra overflow-y-auto custom-scrollbar">
                            {/* Header */}
                            <h2 className="text-2xl sm:text-3xl mb-12 tracking-wide uppercase">
                                MEMBERSHIP SUBSCRIPTION FEES
                            </h2>

                            <div className="space-y-12">
                                {/* Section 1: Brands */}
                                <div>
                                    <h3 className="text-xl text-yellow-500 mb-6">
                                        For <span className="font-bold">BRANDS and CONSULTANT PROFILES</span>
                                    </h3>
                                    <div className="space-y-4 text-lg">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-2">
                                            <span>One-time Registration Fee (1<sup>st</sup> year) :</span>
                                            <span className="font-medium whitespace-nowrap">Rs <span className="text-xl">25000/-</span></span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-2">
                                            <span>Subscription Renewal Fee :</span>
                                            <span className="font-medium whitespace-nowrap">Rs <span className="text-xl">5000/-</span> <span className="text-sm opacity-80">per year</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Clients */}
                                <div>
                                    <h3 className="text-xl text-yellow-500 mb-6">
                                        For <span className="font-bold">CLIENTS, CUSTOMERS</span>
                                    </h3>
                                    <div className="space-y-6 text-lg">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-2">
                                            <span>Viewing Business and Consultant Profiles</span>
                                            <span className="text-xl font-medium">FREE</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                                <span>To Use / Access the following features :</span>
                                                <span className="font-medium whitespace-nowrap">Rs <span className="text-xl">500/-</span> <span className="text-sm opacity-80">per year</span></span>
                                            </div>

                                            <div className="pl-0 sm:pl-4 text-white/80 text-base leading-relaxed">
                                                <p>
                                                    Preferred Location,<br />
                                                    Advanced Search Filters,<br />
                                                    Portfolios and Catalogues,<br />
                                                    Prolific Information, Cubicles,<br />
                                                    Shout-Out, Favourites, Virtual Secretary,<br />
                                                    Simultaneous usage on 3 devices
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Information */}
                                <div className="pt-8 mt-8 border-t border-white/20">
                                    <p className="mb-4 text-sm opacity-90">For Your Information :</p>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-white/80">
                                        <li>All Fees are inclusive of 18% GST.</li>
                                        <li>Membership Subscription Fee is strictly Non-Refundable.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
