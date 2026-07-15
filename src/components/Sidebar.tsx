import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import type { ComponentType } from "react";
import ContentModal from "./ContentModal";
import LocationModal from "./LocationModal";
import C1WhoseIdea from "./docs/C1WhoseIdea";
import C2FoundersMessage from "./docs/C2FoundersMessage";
import D1ForYourKindInformation from "./docs/D1ForYourKindInformation";
import D2BeAware from "./docs/D2BeAware";
import D3TermsOfUse from "./docs/D3TermsOfUse";
import D4PrivacyPolicy from "./docs/D4PrivacyPolicy";
import D5CancellationPolicy from "./docs/D5CancellationPolicy";
import D6Disclaimer from "./docs/D6Disclaimer";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const LINK_CLASS = "block p-2 text-white/90 hover:text-white text-sm transition-colors";
const BTN_CLASS = "block w-full text-left p-2 text-white/90 hover:text-white text-sm transition-colors focus:outline-none cursor-pointer";
const SECTION_TITLE_CLASS = "text-center text-xs font-bold text-white/70 pb-2 border-b border-white/20 mt-3 uppercase";

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [openDoc, setOpenDoc] = useState<{ title: string; Component: ComponentType } | null>(null);
    const [isLocationOpen, setIsLocationOpen] = useState(false);

    const openPopup = (title: string, Component: ComponentType) => {
        setOpenDoc({ title, Component });
    };

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
                                        className="w-36 h-9 sm:w-48 sm:h-12"
                                    >
                                        <text
                                            className="fill-white font-bold"
                                            transform="translate(37 165) scale(1.172 1.069)"
                                            style={{ fontSize: "160px" }}
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

                                {/* Top links */}
                                <div className="space-y-2">
                                    <Link to="/" onClick={onClose} className={LINK_CLASS}>
                                        Go to the LOBBY Page
                                    </Link>
                                    <button
                                        onClick={() => setIsLocationOpen(true)}
                                        className={BTN_CLASS}
                                    >
                                        Set LOCATION &amp; LANGUAGE
                                    </button>
                                </div>

                                {/* BRANDS EXPLORATION */}
                                <div>
                                    <h3 className={SECTION_TITLE_CLASS}>brands exploration</h3>
                                    <div className="space-y-2 pt-3">
                                        <Link to="/consultants" onClick={onClose} className={LINK_CLASS}>
                                            CONSULTANTS Brands
                                        </Link>
                                        <Link to="/services" onClick={onClose} className={LINK_CLASS}>
                                            SERVICE Brands
                                        </Link>
                                        <Link to="/products" onClick={onClose} className={LINK_CLASS}>
                                            RETAIL Brands
                                        </Link>
                                        <Link to="/products" onClick={onClose} className={LINK_CLASS}>
                                            PRODUCT Brands
                                        </Link>
                                    </div>
                                </div>

                                {/* PROFESSIONAL & EDUCATIONAL INFORMATION */}
                                {/* <div>
                                    <h3 className={SECTION_TITLE_CLASS}>professional &amp; educational information</h3>
                                </div> */}

                                {/* CLARIFICATION & DISCUSSION */}
                                {/* <div>
                                    <h3 className={SECTION_TITLE_CLASS}>clarification &amp; discussion</h3>
                                    <p className="text-center text-[10px] text-white/50 mt-1">(Bino-bird answers)</p>
                                    <div className="space-y-2 pt-3">
                                        <Link to="#" onClick={onClose} className={LINK_CLASS}>
                                            Quick Fix and Solution Key
                                        </Link>
                                        <Link to="#" onClick={onClose} className={LINK_CLASS}>
                                            Post your Query
                                        </Link>
                                    </div>
                                </div> */}

                                {/* IDEA & INCEPTION */}
                                <div>
                                    <h3 className={SECTION_TITLE_CLASS}>idea &amp; inception</h3>
                                    <div className="space-y-2 pt-3">
                                        <button
                                            onClick={() => openPopup("Whose Idea is it ?", C1WhoseIdea)}
                                            className={BTN_CLASS}
                                        >
                                            Whose Idea is it ?
                                        </button>
                                        <button
                                            onClick={() => openPopup("Founder's Message", C2FoundersMessage)}
                                            className={BTN_CLASS}
                                        >
                                            Founder's Message
                                        </button>
                                    </div>
                                </div>

                                {/* POLICIES & REGULATION */}
                                <div>
                                    <h3 className={SECTION_TITLE_CLASS}>policies &amp; regulation</h3>
                                    <div className="space-y-2 pt-3">
                                        <button
                                            onClick={() => openPopup("For Your Kind Information", D1ForYourKindInformation)}
                                            className={BTN_CLASS}
                                        >
                                            For Your Kind Information
                                        </button>
                                        <button
                                            onClick={() => openPopup("Be Aware", D2BeAware)}
                                            className={BTN_CLASS}
                                        >
                                            Be Aware
                                        </button>
                                        <button
                                            onClick={() => openPopup("Terms of Use", D3TermsOfUse)}
                                            className={BTN_CLASS}
                                        >
                                            Terms of Use
                                        </button>
                                        <button
                                            onClick={() => openPopup("Privacy Policy", D4PrivacyPolicy)}
                                            className={BTN_CLASS}
                                        >
                                            Privacy Policy
                                        </button>
                                        <button
                                            onClick={() => openPopup("Cancellation Policy", D5CancellationPolicy)}
                                            className={BTN_CLASS}
                                        >
                                            Cancellation Policy
                                        </button>
                                        <button
                                            onClick={() => openPopup("Disclaimer", D6Disclaimer)}
                                            className={BTN_CLASS}
                                        >
                                            Disclaimer
                                        </button>
                                    </div>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Document Popup Modal */}
            <ContentModal
                isOpen={!!openDoc}
                title={openDoc?.title || ""}
                onClose={() => setOpenDoc(null)}
            >
                {openDoc ? <openDoc.Component /> : null}
            </ContentModal>

            {/* Languages & Location Modal */}
            <LocationModal isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
        </>
    );
}
