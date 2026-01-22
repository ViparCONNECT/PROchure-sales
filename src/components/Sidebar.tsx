import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import InceptionModal from "./InceptionModal";
import SubscriptionFeesModal from "./SubscriptionFeesModal";
import AppOverviewModal from "./AppOverviewModal";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [isInceptionOpen, setIsInceptionOpen] = useState(false);
    const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
    const [isAppOverviewOpen, setIsAppOverviewOpen] = useState(false);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black z-[99]"
                        />
                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-prochure-bg shadow-2xl z-[100] overflow-y-auto"
                        >
                            <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-prochure-bg/95 backdrop-blur-sm z-10">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 w-fit cursor-pointer"
                                >
                                    {/* SVG Logo */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="160"
                                        height="48"
                                        viewBox="0 0 906 258"
                                        // INCREASED: w-32 -> w-36 (mobile), sm:w-40 -> sm:w-48 (desktop)
                                        className="w-36 h-9 sm:w-48 sm:h-12"
                                    >
                                        <text
                                            className="fill-white font-bold"
                                            // Adjusted translate Y slightly to keep it centered with new size if needed,
                                            // but keeping your original coordinates usually works fine for small bumps.
                                            transform="translate(37 165) scale(1.172 1.069)"
                                            style={{
                                                // INCREASED: 140px -> 160px
                                                fontSize: "160px",
                                            }}
                                        >
                                            PROchure
                                            <tspan fontSize="0.5em" baselineShift="0.8em">
                                                ®
                                            </tspan>
                                        </text>
                                    </svg>
                                </motion.div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-white/80 hover:text-white" />
                                </button>
                            </div>

                            <nav className="p-4 space-y-6">
                                {/* Top Navigation Items */}
                                <div className="space-y-2">
                                    <Link
                                        to="/register"
                                        onClick={onClose}
                                        className="block p-2 text-white/90 hover:text-white text-sm font-medium transition-colors"
                                    >
                                        BE A PRO-MEMBER
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={onClose}
                                        className="block p-2 text-white/90 hover:text-white text-sm font-medium transition-colors"
                                    >
                                        SIGN IN / LOG IN
                                    </Link>
                                    <Link
                                        to="/"
                                        onClick={onClose}
                                        className="block p-2 text-white/90 hover:text-white text-sm font-medium transition-colors"
                                    >
                                        LOBBY
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={onClose}
                                        className="block p-2 text-white/90 hover:text-white text-sm font-medium transition-colors"
                                    >
                                        FAVOURITES
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={onClose}
                                        className="block p-2 text-white/90 hover:text-white text-sm font-medium transition-colors"
                                    >
                                        VIRTUAL SECRETARY
                                    </Link>
                                </div>

                                {/* Brands Section */}
                                <div>
                                    <h3 className="text-center text-xs font-bold text-white/70 pb-2 border-b border-white/20 mt-3">
                                        brands
                                    </h3>
                                    <div className="space-y-2 pt-3">
                                        <Link
                                            to="/services"
                                            onClick={onClose}
                                            className="block p-2 text-white/90 hover:text-white text-sm transition-colors"
                                        >
                                            CONSULTANT & SERVICE BRANDS
                                        </Link>
                                        <Link
                                            to="/products"
                                            onClick={onClose}
                                            className="block p-2 text-white/90 hover:text-white text-sm transition-colors"
                                        >
                                            RETAIL BRANDS
                                        </Link>
                                        <Link
                                            to="#"
                                            onClick={onClose}
                                            className="block p-2 text-white/90 hover:text-white text-sm transition-colors"
                                        >
                                            PRODUCT BRANDS
                                        </Link>
                                    </div>
                                </div>

                                {/* Information & Interaction Section */}
                                <div>
                                    <h3 className="text-center text-xs font-bold text-white/70 pb-2 border-b border-white/20 mt-3">
                                        information. interaction.
                                    </h3>
                                    <div className="space-y-2 pt-3">
                                        <Link
                                            to="#"
                                            onClick={onClose}
                                            className="block p-2 text-white/90 hover:text-white text-sm transition-colors"
                                        >
                                            PROLIFIC INFORMATION
                                        </Link>
                                        <Link
                                            to="#"
                                            onClick={onClose}
                                            className="block p-2 text-white/90 hover:text-white text-sm transition-colors"
                                        >
                                            CUBICLES
                                        </Link>
                                    </div>
                                </div>

                                {/* Tools Section */}
                                <div>
                                    <h3 className="text-center text-xs font-bold text-white/70 pb-2 border-b border-white/20 mt-3">
                                        tools
                                    </h3>
                                    <div className="space-y-2 pt-3">
                                        <Link
                                            to="#"
                                            onClick={onClose}
                                            className="block p-2 text-white/90 hover:text-white text-sm transition-colors"
                                        >
                                            QUICK FIX
                                        </Link>
                                        <Link
                                            to="#"
                                            onClick={onClose}
                                            className="block p-2 text-white/90 hover:text-white text-sm transition-colors"
                                        >
                                            ASK US
                                        </Link>
                                    </div>
                                </div>

                                {/* About Section */}
                                <div>
                                    <h3 className="text-center text-xs font-bold text-white/70 pb-2 border-b border-white/20 mt-3">
                                        about
                                    </h3>
                                    <div className="space-y-2 pt-3">
                                        <button
                                            onClick={() => setIsInceptionOpen(true)}
                                            className="block w-full text-left p-2 text-white/90 hover:text-white text-sm transition-colors focus:outline-none"
                                        >
                                            INCEPTION
                                        </button>
                                        <button
                                            onClick={() => setIsAppOverviewOpen(true)}
                                            className="block w-full text-left p-2 text-white/90 hover:text-white text-sm transition-colors focus:outline-none"
                                        >
                                            APP OVERVIEW
                                        </button>
                                        <button
                                            onClick={() => setIsSubscriptionOpen(true)}
                                            className="block w-full text-left p-2 text-white/90 hover:text-white text-sm transition-colors focus:outline-none"
                                        >
                                            SUBSCRIPTION FEES
                                        </button>
                                        <Link
                                            to="#"
                                            onClick={onClose}
                                            className="block p-2 text-white/90 hover:text-white text-sm transition-colors"
                                        >
                                            APP POLICIES
                                        </Link>
                                        <Link
                                            to="#"
                                            onClick={onClose}
                                            className="block p-2 text-white/90 hover:text-white text-sm transition-colors"
                                        >
                                            BE AWARE (DISCLAIMER)
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <InceptionModal isOpen={isInceptionOpen} onClose={() => setIsInceptionOpen(false)} />
            <SubscriptionFeesModal isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} />
            <AppOverviewModal isOpen={isAppOverviewOpen} onClose={() => setIsAppOverviewOpen(false)} />
        </>
    );
}
