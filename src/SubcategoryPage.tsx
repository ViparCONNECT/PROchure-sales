import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories, getSubcategories, getProfiles } from "./config/api";
import Breadcrumbs from "./components/Breadcrumbs";
import SectionHeading from "./components/SectionHeading";
import { Users, MapPin, Filter } from "lucide-react";
import { useSeo } from "./hooks/useSeo";
import PageSpinner from "./components/PageSpinner";
import ProfileCard from "./profile-kit/ProfileCard";
import ProfileCardModal from "./components/ProfileCardModal";
import type { ProfileCardData } from "./profile-kit/types";
import { routeForSlug } from "./config/profileTypes";
import { matchesSlug } from "./helper/helper";

type PublicProfile = ProfileCardData & { id: string };

interface Subcategory {
    id: number;
    name: string;
    profiles: PublicProfile[];
}

interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
}


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
    const [openProfile, setOpenProfile] = useState<PublicProfile | null>(null);
    const typeRoute = routeForSlug(type);

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
        if (!categorySlug || !subcategoryParam) return;
        if (!typeRoute) {
            setData(null);
            return;
        }
        const toCard = (profiles: PublicProfile[]) =>
            (profiles || []).map((p) => ({ ...p, profileType: typeRoute.type }));

        let cancelled = false;

        (async () => {
            setLoading(true);
            try {
                const categories = await getCategories(typeRoute.type);

                if (cancelled) return;

                const category = categories.find((c: any) => matchesSlug(c, categorySlug));
                if (!category) {
                    setData(null);
                    return;
                }

                const subcats = await getSubcategories(category.id);
                if (cancelled) return;


                const subcategory = subcats.find((s: any) =>
                    matchesSlug(s, subcategoryParam)
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
                        const mapped = toCard(profiles);

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

                const mapped = toCard(profiles);

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
    }, [typeRoute, categorySlug, subcategoryParam, appliedCity, appliedIsSheOnly]);

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
                (p) => (p.address?.cityTown || "").toLowerCase() === selectedCity.toLowerCase()
            );
        }

        // Apply page-level city filter (select)
        if (cityFilter && cityFilter !== "All") {
            filteredProfiles = filteredProfiles.filter(
                (p) => ((p.address?.cityTown || "") === cityFilter)
            );
        }

        // Apply SHE-PRO filter (checkbox)
        if (isSheOnly) {
            filteredProfiles = filteredProfiles.filter((p) => p.isWomenEntrepreneur === true);
        }
    }

    // (language filter removed)

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={[
                    { label: typeRoute?.label || type || "", to: `/${type}` },
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
                        <span className="text-sm bg-prochure-50 border border-prochure-200 px-2 py-1 rounded prochure-text">{typeRoute?.type === "PROFESSIONAL_CONSULTANT" ? "Women Professionals" : "Women Entrepreneurs"}</span>
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
                                <label htmlFor="sheOnly" className="text-sm">{typeRoute?.type === "PROFESSIONAL_CONSULTANT" ? "Women Professionals only" : "Women Entrepreneurs only"}</label>
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
                    <button
                        key={profile.id}
                        type="button"
                        onClick={() => setOpenProfile(profile)}
                        className="block w-full text-left shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-prochure-bg"
                        aria-label={`View ${profile.name ?? "profile"}`}
                    >
                        <ProfileCard data={profile} tone="light" />
                    </button>
                ))}
            </div>

            <ProfileCardModal data={openProfile} onClose={() => setOpenProfile(null)} />

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
