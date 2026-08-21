import { useState } from "react";
import { User } from "lucide-react";
import BrandModal from "./BrandModal";

export interface Brand {
    id: number;
    card_image?: string;
    image?: string;
    classification?: string;
    category?: string;
    sub_category?: string;
    // Consultant
    professional_title?: string;
    consultant_or_consultation_firm_name?: string;
    qualifications_degrees?: string;
    year_of_starting_practice_or_service?: string;
    specialized_services_skills?: string;
    // Service / Retail / Product
    name_of_the_service_brand_retail_brand_product_brand?: string;
    year_of_establishment?: string;
    // Common address
    building_mall_property_name?: string;
    door_shop_no?: string;
    floor?: string;
    street_lane_road_name_sub_locality?: string;
    nearest_landmark?: string;
    secondary_primary_locality?: string;
    city_town?: string;
    state_province?: string;
    country?: string;
    pin_code_zip_code?: string;
    // Common contact
    country_code?: string;
    official_contact_number?: string;
    official_email_id?: string;
    official_website_app?: string;
    availability?: string;
    contact_person_name?: string;
    contact_person_designation?: string;
    preferred_languages?: string;
    // Meta
    profile_created_by?: string;
    profile_creator_name?: string;
}

interface BrandCardProps {
    brand: Brand;
    isConsultant?: boolean;
}

export default function BrandCard({ brand, isConsultant = false }: BrandCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-gray-200 shadow-md hover:shadow-2xl hover:shadow-prochure-bg/20 bg-gray-50 transition-all duration-300 w-full text-left cursor-pointer"
                type="button"
            >
                <div className={isConsultant ? "aspect-[1.75/1]" : "aspect-square"}>
                    {brand.card_image || brand.image ? (
                        <img
                            src={brand.card_image || brand.image}
                            alt={displayName(brand)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            <User size={48} />
                        </div>
                    )}
                </div>
            </button>

            <BrandModal brand={brand} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

export function displayName(brand: Brand): string {
    return (
        brand.consultant_or_consultation_firm_name ||
        brand.name_of_the_service_brand_retail_brand_product_brand ||
        `Profile ${brand.id}`
    );
}
