import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Globe, MapPin, Clock, User } from "lucide-react";
import type { Brand } from "./BrandCard";
import { getProfile } from "../config/api";

interface BrandModalProps {
    brand: Brand;
    isOpen: boolean;
    onClose: () => void;
    isConsultant?: boolean;
}

export default function BrandModal({ brand, isOpen, onClose, isConsultant = false }: BrandModalProps) {
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

    const [fullBrand, setFullBrand] = useState<Brand>(brand);

    useEffect(() => setFullBrand(brand), [brand]);

    useEffect(() => {
        if (!isOpen) return;
        // If the passed brand seems partial (missing contact), try fetching full profile by id
        (async () => {
            try {
                if (!brand || !brand.id) return;
                // fetch only if some key fields missing
                if (!brand.official_contact_number && (brand as any).id) {
                    const p = await getProfile(String((brand as any).id));
                    // getProfile returns the profile object (not envelope)
                    if (p) {
                        const mapped: Brand = {
                            ...fullBrand,
                            id: p.id,
                            image: p.logo,
                            card_image: p.image || p.logo,
                            consultant_or_consultation_firm_name: p.name,
                            name_of_the_service_brand_retail_brand_product_brand: p.name,
                            year_of_establishment: p.yearOfEstablishment || p.year_of_establishment,
                            professional_title: p.professionalTitle || p.professional_title,
                            qualifications_degrees: p.qualifications || p.qualifications_degrees,
                            specialized_skills: p.specializations,
                            services: p.services,
                            building_mall_property_name: p.address?.buildingMallPropertyName,
                            door_shop_no: p.address?.doorShopNo,
                            floor: p.address?.floor,
                            street_lane_road_name_sub_locality: p.address?.streetLaneRoadNameSubLocality,
                            nearest_landmark: p.address?.nearestLandmark,
                            secondary_primary_locality: p.address?.secondaryPrimaryLocality,
                            city_town: p.address?.cityTown,
                            state_province: p.address?.stateProvince,
                            country: p.address?.country,
                            pin_code_zip_code: p.address?.pinCodeZipCode,
                            country_code: p.contact?.countryCode,
                            official_contact_number: p.contact?.officialContactNumber,
                            official_email_id: p.contact?.officialEmailId,
                            official_website_app: p.contact?.officialWebsiteApp,
                            contact_person_name: p.contact?.contactPersonName,
                            contact_person_designation: p.contact?.contactPersonDesignation,
                            preferred_languages: (p.contact?.mostComfortablePreferredLanguages || []).join?.(", ") || undefined,
                            workingHours: p.workingHours || p.working_hours || undefined,
                            is_she_pro: p.isShePro || p.is_she_pro || false,
                        };
                        setFullBrand(mapped);
                    }
                }
            } catch (err) {
                // ignore
                console.error("Failed to fetch full profile", err);
            }
        })();
    }, [isOpen]);

    const name =
        fullBrand.consultant_or_consultation_firm_name ||
        fullBrand.name_of_the_service_brand_retail_brand_product_brand ||
        `PROFILE NAME`;

    const professionalTitle = (fullBrand as any).professional_title || (fullBrand as any).professionalTitle || "";
    const displayName = professionalTitle ? `${professionalTitle} ${name}` : name;

    const year = (fullBrand as any).year_of_starting_practice_or_service || fullBrand.year_of_establishment;

    const phone = fullBrand.official_contact_number
        ? `${fullBrand.country_code || ""} ${fullBrand.official_contact_number}`.trim()
        : null;

    const addressParts = [
        fullBrand.building_mall_property_name,
        fullBrand.door_shop_no,
        fullBrand.floor,
        fullBrand.street_lane_road_name_sub_locality,
        fullBrand.nearest_landmark ? `Nearest Landmark: ${fullBrand.nearest_landmark}` : undefined,
        fullBrand.secondary_primary_locality,
        [fullBrand.city_town, fullBrand.state_province, fullBrand.pin_code_zip_code].filter(Boolean).join(", ") || undefined,
        fullBrand.country,
    ].filter(Boolean) as string[];

    const placeholderConsultant = "https://res.cloudinary.com/ovyuvqxa/image/upload/v1787371391/ChatGPT_Image_Aug_22_2026_09_31_19_AM_zbklwv.png";
    const placeholderOther = "https://res.cloudinary.com/ovyuvqxa/image/upload/v1787672207/ChatGPT_Image_Aug_25_2026_07_19_53_PM_mnmjhn.png";
    const imgSrc = fullBrand.image || (isConsultant ? placeholderConsultant : placeholderOther);

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
                                    {imgSrc ? (
                                        <img src={imgSrc} alt={displayName} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={40} className="text-prochure-bg" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold font-maiandra">{displayName}</h2>
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
                            {isConsultant && (
                                <>
                                    <InfoSection label="Specializations / Skills">
                                        {fullBrand.specialized_skills && (
                                            <div className="text-slate-700">{fullBrand.specialized_skills}</div>
                                        )}
                                    </InfoSection>

                                    <InfoSection label="Services">
                                        {fullBrand.services && (
                                            <div className="text-slate-700">{fullBrand.services}</div>
                                        )}
                                    </InfoSection>
                                </>
                            )}

                            {fullBrand.qualifications_degrees && (
                                <InfoSection label="Qualifications">
                                    <div className="text-slate-700">{fullBrand.qualifications_degrees}</div>
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
                                            <span>{phone}</span>
                                        </div>
                                    )}
                                </div>
                            </InfoSection>

                            <InfoSection label="Email ID" icon={<Mail size={16} className="text-prochure-bg" />}>
                                <div className="space-y-3">
                                    {fullBrand.official_email_id && (
                                        <div className="flex items-center gap-3 text-slate-700">
                                            <a href={`mailto:${fullBrand.official_email_id}`} className="hover:underline break-all">
                                                {fullBrand.official_email_id}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </InfoSection>

                            <InfoSection label="Website" icon={<Globe size={16} className="text-prochure-bg" />}>
                                <div className="space-y-3">
                                    {fullBrand.official_website_app && (
                                        <div className="flex items-center gap-3 text-slate-700">
                                            <a
                                                href={fullBrand.official_website_app}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-prochure-bg hover:underline break-all"
                                            >
                                                {fullBrand.official_website_app}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </InfoSection>

                            {/* Availability */}
                            <InfoSection label="Availability Information" icon={<Clock size={16} className="text-prochure-bg" />}>
                                {fullBrand.workingHours && Object.keys(fullBrand.workingHours).length > 0 ? (
                                    <div className="space-y-1 text-slate-700">
                                        {[
                                            ["monday", "Monday"],
                                            ["tuesday", "Tuesday"],
                                            ["wednesday", "Wednesday"],
                                            ["thursday", "Thursday"],
                                            ["friday", "Friday"],
                                            ["saturday", "Saturday"],
                                            ["sunday", "Sunday"],
                                        ].map(([key, label]) => {
                                            const val = (fullBrand.workingHours as any)[key];
                                            if (!val) return null;
                                            return (
                                                <div key={key}>
                                                    <span className="font-semibold text-slate-700">{label}:</span> <span className="text-slate-700">{val}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    fullBrand.availability && (
                                        <div className="text-slate-700">{fullBrand.availability}</div>
                                    )
                                )}
                            </InfoSection>

                            {/* Contact Person */}
                            {(fullBrand.contact_person_name || fullBrand.contact_person_designation || fullBrand.preferred_languages) && (
                                <InfoSection label="Preferred Languages for Communication">
                                    <div className="space-y-2 text-slate-700">
                                        {fullBrand.contact_person_name && (
                                            <div>
                                                <span className="font-semibold text-slate-600">Name:</span> {fullBrand.contact_person_name}
                                            </div>
                                        )}
                                        {fullBrand.contact_person_designation && (
                                            <div>
                                                <span className="font-semibold text-slate-600">Designation:</span>{" "}
                                                {fullBrand.contact_person_designation}
                                            </div>
                                        )}
                                        {fullBrand.preferred_languages && (
                                            <div>
                                                {fullBrand.preferred_languages}
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
