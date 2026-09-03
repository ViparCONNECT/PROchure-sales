import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FolderOpen, MapPin } from "lucide-react";
import servicesData from "../data/services.json";
import productsData from "../data/products.json";
import consultantsData from "../data/consultants.json";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionHeading from "../components/SectionHeading";
import { useSeo } from "../hooks/useSeo";
import { getCategories, getSubcategories } from "../config/api";
import PageSpinner from "../components/PageSpinner";

const FILTER_BY_CITY = true;

const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

function getSubProfileCount(sub: any, city: string | null): number {
    if (!sub.profiles) return 0;
    if (!city) return sub.profiles.length;
    return sub.profiles.filter((p: any) => (p.city_town || p.city || "").toLowerCase() === city.toLowerCase()).length;
}

export default function SubcategoryListPage() {
    const { type, category: categoryParam } = useParams();
    const [category, setCategory] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const saved = localStorage.getItem("prochure_selected_city");
        setSelectedCity(saved);
        const handler = () => setSelectedCity(localStorage.getItem("prochure_selected_city"));
        window.addEventListener("locationChanged", handler);
        return () => window.removeEventListener("locationChanged", handler);
    }, []);

    useEffect(() => {
        if (!type || !categoryParam) return;

        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const typeMap: Record<string, string> = {
                    consultants: "PROFESSIONAL_CONSULTANT",
                    services: "SERVICE_BRANDS",
                    products: "PRODUCT_BRANDS",
                    retail: "RETAIL_BRANDS",
                };
                const apiType = typeMap[type as string] || "SERVICE_BRANDS";
                const cats = await getCategories(apiType);
                if (cancelled) return;
                const foundCategory = cats.find((c: any) => c.id === categoryParam || (c.urlSlug || toSlug(c.name)) === categoryParam || toSlug(c.name) === categoryParam);
                if (foundCategory) {
                    setCategory(foundCategory);
                    // fetch subcategories for the category
                    try {
                        const subs = await getSubcategories(foundCategory.id);
                        if (cancelled) return;
                        // attach subcategories to category object for rendering
                        setCategory((prev: any) => ({ ...(prev || foundCategory), subcategories: subs }));
                    } catch (err) {
                        // ignore subcategory fetch error, fall back to whatever we have
                        console.error("Failed to fetch subcategories", err);
                    }
                    return;
                }
                // fallback to local data
                const dataKey = type === "consultants" ? "consultant" : type === "services" ? "service" : "product";
                const data = type === "consultants" ? consultantsData : type === "services" ? servicesData : productsData;
                // @ts-ignore
                const foundLocal = data[dataKey]?.categories.find((c: any) => c.id === categoryParam || toSlug(c.name) === categoryParam);
                setCategory(foundLocal);
                if (foundLocal && !cancelled) {
                    // if local, subcategories already exist on object
                    setCategory(foundLocal);
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [type, categoryParam]);

    useSeo({
        title: category ? `${category.name} | PROchure` : "Category | PROchure",
        description: category
            ? `Explore ${category.name} and discover professional brands on PROchure.`
            : "Explore categories and discover professional brands on PROchure.",
    });

    if (loading) return <div className="min-h-[30vh] flex items-center justify-center"><PageSpinner /></div>;

    if (!category) return <div className="p-8 text-center text-slate-500">Category Not Found</div>;

    const filteredSubcategories = (FILTER_BY_CITY && selectedCity)
        ? (category.subcategories || []).filter((sub: any) => getSubProfileCount(sub, selectedCity) > 0)
        : (category.subcategories || []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
            <Breadcrumbs
                items={[
                    { label: type || "", to: `/${type}` },
                    { label: category.name }
                ]}
            />

            <SectionHeading
                icon={FolderOpen}
                title={category.name}
            />

            {selectedCity && (
                <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 w-fit mx-auto">
                    <MapPin size={16} className="text-yellow-600" />
                    Showing subcategories with profiles from <strong className="text-slate-700">{selectedCity}</strong>
                </div>
            )}

            {filteredSubcategories.length === 0 && (
                <div className="text-center py-12 text-slate-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    {selectedCity
                        ? `No subcategories with profiles found in ${selectedCity}.`
                        : "No subcategories found."}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubcategories.map((sub: any) => {
                    // const profileCount = getSubProfileCount(sub, selectedCity);
                    return (
                        <Link to={`/${type}/${category.id}/${sub.id}`} key={sub.id}>
                            <div className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-prochure-bg/10 transition-all duration-300 h-full flex flex-col items-center text-center cursor-pointer"
                            >
                                <div className="w-16 h-16 bg-prochure-50 rounded-full flex items-center justify-center prochure-text mb-4 group-hover:prochure-text group-hover:text-white transition-colors duration-300">
                                    <FolderOpen size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 group-hover:prochure-text transition-colors">
                                    {sub.name}
                                </h3>
                                {/* <p className="mt-2 text-slate-500 text-sm">
                                    Profiles : {profileCount}
                                </p> */}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
