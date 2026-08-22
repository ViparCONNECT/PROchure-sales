import { useEffect, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Globe, MapPin, Clock, User } from "lucide-react";
import type { Brand } from "./BrandCard";

interface BrandModalProps {
    brand: Brand;
    isOpen: boolean;
    onClose: () => void;
}

export default function BrandModal({ brand, isOpen, onClose }: BrandModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const isConsultant = brand.classification === "Professional Consultants";

    const name =
        brand.consultant_or_consultation_firm_name ||
        brand.name_of_the_service_brand_retail_brand_product_brand ||
        `PROFILE NAME`;

    const year = brand.year_of_starting_practice_or_service || brand.year_of_establishment;

    const phone = brand.official_contact_number
        ? `${brand.country_code || ""} ${brand.official_contact_number}`.trim()
        : null;

    const addressParts = [
        brand.building_mall_property_name,
        brand.door_shop_no,
        brand.floor,
        brand.street_lane_road_name_sub_locality,
        brand.nearest_landmark ? `Nearest Landmark: ${brand.nearest_landmark}` : undefined,
        brand.secondary_primary_locality,
        [brand.city_town, brand.state_province, brand.pin_code_zip_code].filter(Boolean).join(", ") || undefined,
        brand.country,
    ].filter(Boolean) as string[];

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ maxHeight: "90vh" }}
                    >
                        {/* Header */}
                        <div className="bg-prochure-bg p-6 text-white relative shrink-0 text-center">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center gap-3">
                                <div className="w-24 h-24 bg-white/90 rounded-lg flex items-center justify-center overflow-hidden border-2 border-white">
                                    {brand.image || brand.card_image ? (
                                        <img
                                            src={brand.image || "https://res.cloudinary.com/ovyuvqxa/image/upload/v1787371391/ChatGPT_Image_Aug_22_2026_09_31_19_AM_zbklwv.png"}
                                            alt={name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User size={40} className="text-prochure-bg" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold font-maiandra">{name}</h2>
                                    {year && (
                                        <p className="text-white/80 text-sm tracking-wide uppercase mt-1">
                                            {isConsultant ? "Established In" : "Established In"} {year}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">

                            {/* Specialization / Services */}
                            {brand.specialized_services_skills && (
                                <InfoSection label="Specializations / Services">
                                    <div className="text-slate-700">{brand.specialized_services_skills}</div>
                                </InfoSection>
                            )}

                            {brand.qualifications_degrees && (
                                <InfoSection label="Qualifications">
                                    <div className="text-slate-700">{brand.qualifications_degrees}</div>
                                </InfoSection>
                            )}

                            {/* Address */}
                            <InfoSection label="Address" icon={<MapPin size={16} className="text-prochure-bg" />}>
                                {addressParts.length > 0 && (
                                    <div className="space-y-1 text-slate-700">
                                        {addressParts.map((line, i) => (
                                            <div key={i}>{line}</div>
                                        ))}
                                    </div>
                                )}
                            </InfoSection>

                            {/* Contact divided into separate sections */}
                            <InfoSection label="Contact Number" icon={<Phone size={16} className="text-prochure-bg" />}>
                                <div className="space-y-3">
                                    {phone && (
                                        <div className="flex items-center gap-3 text-slate-700">
                                            <Phone size={18} className="prochure-text shrink-0" />
                                            <span>{phone}</span>
                                        </div>
                                    )}
                                </div>
                            </InfoSection>

                            <InfoSection label="Email ID" icon={<Mail size={16} className="text-prochure-bg" />}>
                                <div className="space-y-3">
                                    {brand.official_email_id && (
                                        <div className="flex items-center gap-3 text-slate-700">
                                            <Mail size={18} className="prochure-text shrink-0" />
                                            <a href={`mailto:${brand.official_email_id}`} className="hover:underline break-all">
                                                {brand.official_email_id}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </InfoSection>

                            <InfoSection label="Website" icon={<Globe size={16} className="text-prochure-bg" />}>
                                <div className="space-y-3">
                                    {brand.official_website_app && (
                                        <div className="flex items-center gap-3 text-slate-700">
                                            <Globe size={18} className="prochure-text shrink-0" />
                                            <a
                                                href={brand.official_website_app}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-prochure-bg hover:underline break-all"
                                            >
                                                {brand.official_website_app}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </InfoSection>

                            {/* Availability */}
                            <InfoSection label="Availability Information" icon={<Clock size={16} className="text-prochure-bg" />}>
                                {brand.availability && (
                                    <div className="text-slate-700">{brand.availability}</div>
                                )}
                            </InfoSection>

                            {/* Contact Person */}
                            {(brand.contact_person_name || brand.contact_person_designation || brand.preferred_languages) && (
                                <InfoSection label="Point of Contact">
                                    <div className="space-y-2 text-slate-700">
                                        {brand.contact_person_name && (
                                            <div>
                                                <span className="font-semibold text-slate-600">Name:</span> {brand.contact_person_name}
                                            </div>
                                        )}
                                        {brand.contact_person_designation && (
                                            <div>
                                                <span className="font-semibold text-slate-600">Designation:</span>{" "}
                                                {brand.contact_person_designation}
                                            </div>
                                        )}
                                        {brand.preferred_languages && (
                                            <div>
                                                <span className="font-semibold text-slate-600">Preferred Languages:</span>{" "}
                                                {brand.preferred_languages}
                                            </div>
                                        )}
                                    </div>
                                </InfoSection>
                            )}

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}

function InfoSection({
    label,
    icon,
    children,
}: {
    label: string;
    icon?: ReactNode;
    children: ReactNode;
}) {
    return (
        <div>
            <h3 className="text-xs font-bold text-prochure-bg/70 uppercase tracking-wider mb-2 flex items-center gap-2">
                {icon}
                {label}
            </h3>
            <div className="border border-gray-200 rounded-xl p-4 bg-slate-50/50">{children}</div>
        </div>
    );
}
