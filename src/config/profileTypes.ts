import type { ProfileType } from "../profile-kit/types";

export interface ProfileTypeRoute {
    slug: string;
    type: ProfileType;
    label: string;
    singular: string;
}

export const PROFILE_TYPE_ROUTES: ProfileTypeRoute[] = [
    {
        slug: "professional-consultants",
        type: "PROFESSIONAL_CONSULTANT",
        label: "PROFESSIONAL CONSULTANTS",
        singular: "Professional Consultant",
    },
    {
        slug: "service-and-retail-brands",
        type: "SERVICE_AND_RETAIL_BRANDS",
        label: "SERVICE & RETAIL Brands",
        singular: "Service & Retail Brand",
    },
];

export const routeForSlug = (slug?: string) => PROFILE_TYPE_ROUTES.find((r) => r.slug === slug);
export const routeForType = (type?: string | null) => PROFILE_TYPE_ROUTES.find((r) => r.type === type);

/** Old URL segments, redirected to the new ones. */
export const LEGACY_TYPE_SLUGS: Record<string, string> = {
    consultants: "professional-consultants",
    services: "service-and-retail-brands",
    retail: "service-and-retail-brands",
    products: "service-and-retail-brands",
};
