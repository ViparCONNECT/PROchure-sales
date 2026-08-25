import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandCard, { type Brand } from "./components/BrandCard";
import servicesData from "./data/services.json";
import productsData from "./data/products.json";
import consultantsData from "./data/consultants.json";
import Breadcrumbs from "./components/Breadcrumbs";
import SectionHeading from "./components/SectionHeading";
import { Users, MapPin, Filter } from "lucide-react";
import { useSeo } from "./hooks/useSeo";

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
    const { type, category: categorySlug, subcategory: subcategorySlug } = useParams();
    const [data, setData] = useState<{ category: Category; subcategory: Subcategory } | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [cityFilter, setCityFilter] = useState<string | "All">("All");
    const [isSheOnly, setIsSheOnly] = useState<boolean>(false);
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

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
    }, [selectedCity]);

    useEffect(() => {
        if (!type || !categorySlug || !subcategorySlug) return;

        const rootData = (type === "consultants" ? consultantsData.consultant : type === "services" ? servicesData.service : productsData.product) as { categories: Category[] };

        // Find category
        const category = rootData.categories.find(c => toSlug(c.name) === categorySlug);
        if (!category) {
            setData(null);
            return;
        }

        // Find subcategory
        const subcategory = category.subcategories.find(s => toSlug(s.name) === subcategorySlug) as Subcategory | undefined;
        if (!subcategory) {
            setData(null);
            return;
        }

        // Since our interfaces match the JSON structure loosely, we cast or just use it.
        // The JSON structure has been validated by creation.
        setData({ category: category as unknown as Category, subcategory: subcategory as unknown as Subcategory });

    }, [type, categorySlug, subcategorySlug]);

    useSeo({
        title: data ? `${data.subcategory.name} | PROchure` : "Subcategory | PROchure",
        description: data
            ? `Browse ${data.subcategory.name} brands on PROchure — discover consultants, services, retail and product brands.`
            : "Browse brands on PROchure — an e-brochure of professional services and products.",
    });

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
                    {cityFilter && cityFilter !== "All" && (
                        <span className="text-sm bg-slate-100 border border-slate-200 px-2 py-1 rounded">{cityFilter}</span>
                    )}
                    {isSheOnly && (
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
                                onClick={() => setShowFilterModal(false)}
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
