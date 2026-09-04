import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandCard, { type Brand } from "./components/BrandCard";
import { getCategories, getSubcategories, getProfiles } from "./config/api";
import Breadcrumbs from "./components/Breadcrumbs";
import SectionHeading from "./components/SectionHeading";
import { Users, MapPin, Filter } from "lucide-react";
import { useSeo } from "./hooks/useSeo";
import PageSpinner from "./components/PageSpinner";

interface Subcategory {
    id: number;
    name: string;
    profiles: Brand[];
}

interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
}

const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

const INDIAN_CITIES = [
    "Ahmedabad",
    "Bangalore",
    "Chennai",
    "Cochin",
    "Delhi",
    "Hyderabad",
    "Kolkata",
    "Mangalore",
    "Mumbai",
    "Pune",
    "Agartala",
    "Aizwal",
    "Amritsar",
    "Aurangabad",
    "Bhopal",
    "Bhubaneshwar",
    "Calicut",
    "Coimbatore",
    "Dehradun",
    "Faridabad",
    "Gangtok",
    "Ghaziabad",
    "Goa",
    "Gurgaon",
    "Guwahati",
    "Gwalior",
    "Imphal",
    "Indore",
    "Itanagar",
    "Jaipur",
    "Jalandhar",
    "Kanpur",
    "Kasargode",
    "Kollam",
    "Kottayam",
    "Lucknow",
    "Madikeri",
    "Madurai",
    "Manipal",
    "Mysore",
    "Nagpur",
    "Nainital",
    "Nashik",
    "Navi Mumbai",
    "Noida",
    "Palakkad",
    "Patna",
    "Puttur",
    "Raipur",
    "Ranchi",
    "Sakleshpur",
    "Shillong",
    "Shimla",
    "Surat",
    "Thane",
    "Thimapur",
    "Thrissur",
    "Tirupur",
    "Trichy",
    "Trivandrum",
    "Udupi",
    "Vadodara",
    "V/pattanam",
    "Vijayawada"
];

export default function SubcategoryPage() {
    const { type, category: categorySlug, subcategory: subcategoryParam } = useParams();
    const [data, setData] = useState<{ category: Category; subcategory: Subcategory } | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [cityFilter, setCityFilter] = useState<string | "All">("All");
    const [isSheOnly, setIsSheOnly] = useState<boolean>(false);
    // Applied filters (only used for API calls when user clicks Apply)
    const [appliedCity, setAppliedCity] = useState<string | undefined>(undefined);
    const [appliedIsSheOnly, setAppliedIsSheOnly] = useState<boolean>(false);
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const saved = localStorage.getItem("prochure_selected_city");
        setSelectedCity(saved);
        const handler = () => setSelectedCity(localStorage.getItem("prochure_selected_city"));
        window.addEventListener("locationChanged", handler);
        return () => window.removeEventListener("locationChanged", handler);
    }, []);

    // Initialize local city filter from global selected city when it changes
    useEffect(() => {
        setCityFilter(selectedCity || "All");
        // if no appliedCity set yet, initialize appliedCity from global selectedCity
        if (appliedCity === undefined) setAppliedCity(selectedCity || undefined);
    }, [selectedCity]);

    useEffect(() => {
        if (!type || !categorySlug || !subcategoryParam) return;

        let cancelled = false;

        (async () => {
            setLoading(true);
            try {
                // Map route type to API type value
                const typeMap: Record<string, string> = {
                    consultants: "PROFESSIONAL_CONSULTANT",
                    services: "SERVICE_BRANDS",
                    products: "PRODUCT_BRANDS",
                    retail: "RETAIL_BRANDS",
                };

                const apiType = typeMap[type as string] || "SERVICE_BRANDS";

                const categories = await getCategories(apiType);

                if (cancelled) return;

                const category = categories.find((c: any) => c.id === categorySlug || (c.urlSlug || toSlug(c.name)) === categorySlug || toSlug(c.name) === categorySlug);
                if (!category) {
                    setData(null);
                    return;
                }

                const subcats = await getSubcategories(category.id);
                if (cancelled) return;


                const subcategory = subcats.find((s: any) =>
                    s.id === subcategoryParam ||
                    (s.urlSlug || toSlug(s.name)) === subcategoryParam ||
                    toSlug(s.name) === subcategoryParam
                ) as any | undefined;

                // If subcategory not found, but route indicates 'profiles', fetch by categoryId
                if (!subcategory) {
                    if (subcategoryParam === "profiles") {
                        // Use applied filters for API call
                        const cityParam = appliedCity;
                        const params: any = { categoryId: category.id };
                        if (cityParam) params.city = cityParam;
                        if (appliedIsSheOnly) params.isWomenEntrepreneur = true;
                        const profiles = await getProfiles(params);
                        if (cancelled) return;
                        const mapped = (profiles || []).map((p: any) => ({
                            id: p.id,
                            image: p.image || p.logo,
                            card_image: p.image || p.logo,
                            consultant_or_consultation_firm_name: p.name,
                            name_of_the_service_brand_retail_brand_product_brand: p.name,
                            year_of_establishment: p.yearOfEstablishment || p.year_of_establishment,
                            year_of_practice: p.yearOfPractice || p.year_of_practice,
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
                            is_she_pro: p.isShePro || p.is_she_pro || false,
                        })) as unknown as Brand[];

                        // create a pseudo-subcategory to render profiles under
                        const pseudoSub: any = { id: `category-${category.id}`, name: `${category.name}`, profiles: mapped };
                        setData({ category: category as unknown as Category, subcategory: pseudoSub as unknown as Subcategory });
                        return;
                    }

                    // No subcategory found — treat as not found
                    setData(null);
                    return;
                }

                // Use applied filters for API call
                const cityParam = appliedCity;
                const params: any = { subCategoryId: subcategory.id };
                if (cityParam) params.city = cityParam;
                if (appliedIsSheOnly) params.isWomenEntrepreneur = true;
                // Fetch profiles for the subcategory with filter query params
                const profiles = await getProfiles(params);

                if (cancelled) return;

                // Map API profile objects to local Brand shape (best effort)
                const mapped = (profiles || []).map((p: any) => ({
                    id: p.id,
                    image: p.image || p.logo,
                    card_image: p.image || p.logo,
                    consultant_or_consultation_firm_name: p.name,
                    name_of_the_service_brand_retail_brand_product_brand: p.name,
                    year_of_establishment: p.yearOfEstablishment || p.year_of_establishment,
                    year_of_practice: p.yearOfPractice || p.year_of_practice,
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
                    is_she_pro: p.isShePro || p.is_she_pro || false,
                })) as unknown as Brand[];

                setData({ category: category as unknown as Category, subcategory: { ...subcategory, profiles: mapped } as unknown as Subcategory });
            } catch (err) {
                // fallback to null
                setData(null);
                console.error("Failed to load categories/subcategories/profiles", err);
            }
            finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [type, categorySlug, subcategoryParam, appliedCity, appliedIsSheOnly]);

    useSeo({
        title: data ? `${data.subcategory.name} | PROchure` : "Subcategory | PROchure",
        description: data
            ? `Browse ${data.subcategory.name} brands on PROchure — discover consultants, services, retail and product brands.`
            : "Browse brands on PROchure — an e-brochure of professional services and products.",
    });

    if (loading) return <div className="min-h-[50vh] flex items-center justify-center"><PageSpinner /></div>;

    if (!data) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-slate-500">
                <h2 className="text-2xl font-bold mb-2">Not Found</h2>
                <p>We couldn't find the requested category or subcategory.</p>
                <Link to="/" className="mt-4 prochure-text hover:underline">Go Home</Link>
            </div>
        );
    }

    const { category, subcategory } = data;

    let filteredProfiles = subcategory.profiles.slice();

    // If we asked the API for filtered results (appliedCity or appliedIsSheOnly),
    // do not apply additional client-side filtering that could remove minimal server results.
    const serverFiltered = (appliedCity !== undefined) || appliedIsSheOnly === true;

    if (!serverFiltered) {
        // Apply global selectedCity if present
        if (selectedCity) {
            filteredProfiles = filteredProfiles.filter(
                (p) => (p.city_town || "").toLowerCase() === selectedCity.toLowerCase()
            );
        }

        // Apply page-level city filter (select)
        if (cityFilter && cityFilter !== "All") {
            filteredProfiles = filteredProfiles.filter(
                (p) => ((p.city_town || "") === cityFilter)
            );
        }

        // Apply is_she_pro filter (checkbox)
        if (isSheOnly) {
            filteredProfiles = filteredProfiles.filter((p) => p.is_she_pro === true);
        }
    }

    // (language filter removed)

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={[
                    { label: type || "", to: `/${type}` },
                    { label: category.name, to: `/${type}/${categorySlug}` },
                    { label: subcategory.name }
                ]}
            />

            <div className="mb-12">
                <SectionHeading
                    icon={Users}
                    title={`${subcategory.name}`}
                />
                {/* <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-center text-lg">
                    Browse our professional profiles specialized in {subcategory.name}.
                </p> */}
            </div>

            {/* Filters - compact button that opens a modal */}
            <div className="mb-6 flex items-center gap-3">
                <button
                    onClick={() => setShowFilterModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded shadow-sm hover:shadow-md text-sm"
                >
                    <Filter size={16} />
                    Filters
                </button>

                {/* Active filter badges */}
                <div className="flex items-center gap-2">
                    {appliedCity && (
                        <span className="text-sm bg-slate-100 border border-slate-200 px-2 py-1 rounded">{appliedCity}</span>
                    )}
                    {appliedIsSheOnly && (
                        <span className="text-sm bg-prochure-50 border border-prochure-200 px-2 py-1 rounded prochure-text">{type === "consultants" ? "Women Professionals" : "Women Entrepreneurs"}</span>
                    )}
                </div>
            </div>

            {/* Filter Modal */}
            {showFilterModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilterModal(false)} />
                    <div className="relative bg-prochure-bg text-white max-w-md w-full rounded-lg shadow-lg p-6 z-10">
                        <div className="flex items-center justify-between mb-4 -mx-6 px-6 py-3 border-b border-white/10">
                            <h3 className="text-lg font-semibold">Filters</h3>
                            <button onClick={() => setShowFilterModal(false)} className="text-white/90 hover:opacity-80">Close</button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-white mb-2">Location (city)</label>
                                <select
                                    value={cityFilter}
                                    onChange={(e) => setCityFilter(e.target.value)}
                                    className="w-full px-3 py-2 border rounded bg-white text-sm text-slate-900"
                                >
                                    <option value="All">All</option>
                                    {INDIAN_CITIES.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <input id="sheOnly" type="checkbox" checked={isSheOnly} onChange={(e) => setIsSheOnly(e.target.checked)} className="w-4 h-4" />
                                <label htmlFor="sheOnly" className="text-sm">{type === "consultants" ? "Women Professionals only" : "Women Entrepreneurs only"}</label>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end">
                            <button
                                onClick={() => {
                                    // apply current UI filters to API
                                    setAppliedCity(cityFilter && cityFilter !== "All" ? cityFilter : undefined);
                                    setAppliedIsSheOnly(isSheOnly);
                                    setShowFilterModal(false);
                                }}
                                className="px-4 py-2 bg-white text-slate-900 rounded text-sm"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedCity && (
                <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 w-fit mx-auto">
                    <MapPin size={16} className="text-yellow-600" />
                    Showing profiles from <strong className="text-slate-700">{selectedCity}</strong>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProfiles.map(profile => (
                    <BrandCard key={profile.id} brand={profile} isConsultant={type === "consultants"} />
                ))}
            </div>

            {filteredProfiles.length === 0 && (
                <div className="text-center py-12 text-slate-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    {selectedCity
                        ? `No profiles found in ${selectedCity} for this category.`
                        : "No profiles found for this category yet."}
                </div>
            )}
        </div>
    );
}
