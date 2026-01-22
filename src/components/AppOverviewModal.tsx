
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { getAssetPath } from "../helper/helper";

interface AppOverviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AppOverviewModal({ isOpen, onClose }: AppOverviewModalProps) {
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
                        className="relative w-full max-w-5xl bg-prochure-bg shadow-2xl rounded-sm overflow-hidden border border-white/10 flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 p-2"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 sm:p-12 text-white font-maiandra overflow-y-auto custom-scrollbar">
                            {/* ==================== PAGE 1 CONTENT ==================== */}
                            <div className="space-y-8 mb-16">
                                {/* Header */}
                                <div className="flex items-center gap-6">
                                    <img src={getAssetPath("/proicon.png")} alt="Logo" className="w-16 h-auto" />
                                    <div className="flex flex-col">
                                        <h1 className="text-4xl sm:text-4xl text-yellow-400 font-normal">
                                            PROchure <sup className="text-xl">®</sup>
                                        </h1>
                                        <p className="text-yellow-400 text-lg">the Professional brochure</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <p className="text-yellow-400 text-lg sm:text-xl">
                                        an e-brochure of Professional Services, Products and Prolific Information
                                    </p>
                                    <p className="text-white text-xl font-medium">
                                        Stop Searching, Start Finding !
                                    </p>
                                </div>

                                {/* Divider Links */}
                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-lg sm:text-xl text-white/90 border-t border-white/20 pt-6">
                                    <span>Consultant and Service Brands</span>
                                    <span className="text-yellow-500">|</span>
                                    <span>Retail and Product Brands</span>
                                    <span className="text-yellow-500">|</span>
                                    <span>Professional Guidance</span>
                                    <span className="text-yellow-500">|</span>
                                    <span>Productive, Informative, Educative Content</span>
                                </div>

                                {/* Authentic Platform Section */}
                                <div className="space-y-4 pt-6">
                                    <h2 className="text-yellow-400 text-2xl">This APP is an <span className="underline decoration-yellow-400">A</span>uthentic <span className="underline decoration-yellow-400">P</span>rofessional <span className="underline decoration-yellow-400">P</span>latform</h2>

                                    <p className="leading-relaxed">
                                        <span className="text-yellow-400">PROchure</span> is a platform only for Professional Discourse. And in order to maintain the purpose behind this vision, Members cannot Post on a common page and Spam the platform with Social, Religious and Political content and dialogues.
                                    </p>

                                    <p className="leading-relaxed">
                                        <span className="text-yellow-400">PROchure</span> is an Information-based and Service-oriented domain where revenue generation is only via user subscriptions. So be rest assured that there will be NO unsolicited advertisement 'pop-ups'.
                                    </p>

                                    <p className="leading-relaxed text-sm opacity-90 text-justify">
                                        One can REPORT to PROchure about a Member with a Professional / Business Profile IF they find any uploaded Image / Photograph / Video / Audio or Textual content as a part of a Portfolio / Catalogue / Advertisement / Pro-Forum Post that is evidently Stolen, Incorrect and Inappropriate, Fraudulent, Impersonating, Socially Offensive, Abusive, Explicitly and/or Implicitly Sexually Offensive / Harassing / Abusive / Derogatory, Pornographic, Religious and/or Political in nature, information related to Firearms, Ammunition, Contraband products and/or banned / illegal Drugs.
                                    </p>
                                </div>
                            </div>

                            {/* ==================== PAGE 2 CONTENT ==================== */}
                            <div className="space-y-12 mb-16">
                                {/* Classification */}
                                <div>
                                    <h2 className="text-yellow-400 text-2xl mb-4 text-transform uppercase">Classification of Users</h2>
                                    <p className="mb-4">Subscribers / Users of this platform are classified as :</p>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-yellow-400 text-lg mb-2">Brands and Consultants <span className="text-white text-base font-normal">(Members with professional / business profiles)</span></h3>
                                            <p className="text-white/90">Professional Consultants, Entrepreneurs, Artists, Artisans, Art Dealers, Trainers, Technically Skilled Service Providers, Commercial Service Providers, Product Vendors, Business Enterprises</p>
                                        </div>

                                        <div>
                                            <h3 className="text-yellow-400 text-lg mb-2">Clients and Customers <span className="text-white text-base font-normal">(Members without professional / business profiles)</span></h3>
                                            <p className="text-white/90">Anyone above 18 years of age</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <h2 className="text-yellow-400 text-2xl mb-6 text-transform uppercase">Member / User Features</h2>
                                    <div className="space-y-4">
                                        <p>1. You can <span className="text-yellow-400">SEARCH</span> for appropriate CONSULTANTS, SERVICE PROVIDERS, and PRODUCT RETAILERS for services and products in your preferred locations via state, city and pin code search options.</p>

                                        <p>2. Members have access to the Profiles, Portfolios and Catalogues of all Consultants, Service Providers and Product Retailers.</p>

                                        <p>3. Know the years of experience, type of services / works / projects handled by the Consultants, Service Providers and their specialization.</p>

                                        <p>4. Without one-on-one meetings or phone conversations, put forward your requirements and <span className="text-yellow-400">GET QUOTES</span> / estimations / costing for the services you are looking for.</p>

                                        <p>5. You can <span className="text-yellow-400">SHORT-LIST</span> Consultants, Service Providers, Product Retailers to contact them later.</p>

                                        <p>6. You can <span className="text-yellow-400">RATE</span> and <span className="text-yellow-400">REFER</span> Consultants, Service Providers, Product Retailers based on their Work Portfolio, Product Catalogue.</p>

                                        <p>7. You can <span className="text-yellow-400">COMMUNICATE</span> with Consultants, Service Providers, and Product Retailers one-on-one <span className="text-yellow-400">via CHATS</span>.</p>
                                    </div>
                                </div>
                            </div>

                            {/* ==================== PAGE 3 CONTENT ==================== */}
                            <div className="space-y-12">
                                {/* Remaining Features */}
                                <div>
                                    <div className="space-y-4">
                                        <p>8. To help the clients, customers avoid the hassle of approaching multiple Consultants, Service Providers, Product Retailers one-by-one, the client, customer can <span className="text-yellow-400">SHOUT-OUT</span> his / her query / requirement to the Consultants, Service Providers, Product Retailers in a particular sub-category. This query goes to ALL the Consultants, Service Providers, Product Retailers (of that sub-category) as a Direct Message.</p>

                                        <p className="mt-2">You can also send a SHOUT-OUT to only selected Consultants, Service Providers, Product Retailers after SHORT-LISTING them.</p>
                                    </div>
                                </div>

                                {/* Authentication Badge */}
                                <div>
                                    <h2 className="text-yellow-400 text-2xl mb-6 text-transform uppercase">Authentication Badge</h2>
                                    <p className="mb-6 leading-relaxed">
                                        A tag labelled ‘<span className="text-yellow-400">PRO-</span> AUTHENTIC !’ on the profile card means that PROchure has verified the authenticity of that respective Consultant, Service Provider, Product Retailer. That means, we have verified the following via periodic checks :
                                    </p>

                                    <div className="space-y-4">
                                        <p>1. Operating Address and/or Contact Information of the Consultant, Service Provider, Product Retailer.</p>
                                        <p>2. Whether the Consultant, Service Provider is currently actively providing consultation / services pertinent to the category in which the profile is created.</p>
                                        <p>3. Whether the Product Retailer is currently actively running the business and if it is pertinent to the category in which the profile is created.</p>
                                        <p>4. Whether the Consultant, Service Provider is genuinely registered with the statutory body (constituted by the Government of India) as claimed by them.</p>
                                        <p>5. If it is observed at any time via our periodic checks that any false information has been provided or any of the above mentioned criteria is incorrect, then the ‘<span className="text-yellow-400">PRO-</span> AUTHENTIC !’ tag will be removed from that respective profile.</p>
                                    </div>
                                </div>

                                {/* Footer Note */}
                                <div className="pt-4 mt-8 border-t border-white/10">
                                    <p className="mb-4 text-white/90">Please note :</p>
                                    <div className="space-y-2">
                                        <p>1. Only PAID members are Eligible for this badge.</p>
                                        <p>2. Not all Consultants and Service Providers need to be mandatorily registered with any statutory body to offer professional consultation / commercial services.</p>
                                    </div>
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
