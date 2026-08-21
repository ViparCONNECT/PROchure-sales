import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Folder, MapPin } from "lucide-react";
import servicesData from "../data/services.json";
import productsData from "../data/products.json";
import consultantsData from "../data/consultants.json";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionHeading from "../components/SectionHeading";
import { useSeo } from "../hooks/useSeo";

const FILTER_BY_CITY = true;

const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

function getProfileCount(category: any, city: string | null): number {
    if (!category.subcategories) return 0;
    return category.subcategories.reduce((acc: number, sub: any) => {
        if (!sub.profiles) return acc;
        const profiles = city
            ? sub.profiles.filter((p: any) => (p.city_town || p.city || "").toLowerCase() === city.toLowerCase())
            : sub.profiles;
        return acc + profiles.length;
    }, 0);
}

function getSubcategoryCount(category: any, city: string | null): number {
    if (!city || !category.subcategories) return category.subcategories?.length || 0;
    return category.subcategories.filter((sub: any) =>
        sub.profiles?.some((p: any) => (p.city_town || p.city || "").toLowerCase() === city.toLowerCase())
    ).length;
}

export default function CategoryListPage() {
    const { type } = useParams();
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const pageTitle = type === "consultants" ? "Consultant Brands" : type === "services" ? "Service Brands" : "Product & Retail Brands";
    useSeo({
        title: `${pageTitle} | PROchure`,
        description: `Browse ${pageTitle.toLowerCase()} on PROchure — an e-brochure of professional services and products across India.`,
    });

    useEffect(() => {
        const saved = localStorage.getItem("prochure_selected_city");
        setSelectedCity(saved);
        const handler = () => setSelectedCity(localStorage.getItem("prochure_selected_city"));
        window.addEventListener("locationChanged", handler);
        return () => window.removeEventListener("locationChanged", handler);
    }, []);

    useEffect(() => {
        if (!type) return;

        // Normalize type to singular for data access (service | product | consultant)
        const dataKey = type === "consultants" ? "consultant" : type === "services" ? "service" : "product";
        const data = type === "consultants" ? consultantsData : type === "services" ? servicesData : productsData;

        // @ts-ignore - dynamic access
        setCategories(data[dataKey]?.categories || []);
    }, [type]);

    const filteredCategories = (FILTER_BY_CITY && selectedCity)
        ? categories.filter((cat) => getProfileCount(cat, selectedCity) > 0)
        : categories;

    if (!filteredCategories.length) return (
        <div className="p-8 text-center text-slate-500">
            {selectedCity ? `No categories with profiles found in ${selectedCity}.` : "Not Found"}
        </div>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
            <Breadcrumbs items={[{ label: type || "" }]} />

            <SectionHeading
                icon={Folder}
                title={`${type === "consultants" ? "Consultant Brands" : type === "services" ? "Service Brands" : "Retail Brands"} Categories`}
            />

            {selectedCity && (
                <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 w-fit mx-auto">
                    <MapPin size={16} className="text-yellow-600" />
                    Showing categories with profiles from <strong className="text-slate-700">{selectedCity}</strong>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => {
                    const profileCount = getProfileCount(category, selectedCity);
                    const subCatCount = getSubcategoryCount(category, selectedCity);
                    return (
                        <Link to={`/${type}/${toSlug(category.name)}`} key={category.id}>
                            <div
                                className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-prochure-bg/10 transition-all duration-300 h-full flex flex-col items-center text-center cursor-pointer"
                            >
                                <div className="w-16 h-16 bg-prochure-50 rounded-full flex items-center justify-center prochure-text mb-4 group-hover:prochure-text group-hover:text-white transition-colors duration-300">
                                    <Folder size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 group-hover:prochure-text transition-colors">
                                    {category.name}
                                </h3>
                                <p className="mt-2 text-slate-500 text-sm">
                                    Sub Categories : {subCatCount} | Profiles : {profileCount}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
