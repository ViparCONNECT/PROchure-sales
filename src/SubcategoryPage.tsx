import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileCard from "./components/ProfileCard";
import servicesData from "./data/services.json";
import productsData from "./data/products.json";
import consultantsData from "./data/consultants.json";
import Breadcrumbs from "./components/Breadcrumbs";
import SectionHeading from "./components/SectionHeading";
import { Users, MapPin } from "lucide-react";

import type { Profile } from "./components/ProfileCard";

interface Subcategory {
    id: number;
    name: string;
    profiles: Profile[]; // Use the imported Profile type
}

interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
}

const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

export default function SubcategoryPage() {
    const { type, category: categorySlug, subcategory: subcategorySlug } = useParams();
    const [data, setData] = useState<{ category: Category; subcategory: Subcategory } | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("prochure_selected_city");
        setSelectedCity(saved);
        const handler = () => setSelectedCity(localStorage.getItem("prochure_selected_city"));
        window.addEventListener("locationChanged", handler);
        return () => window.removeEventListener("locationChanged", handler);
    }, []);

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

    const filteredProfiles = selectedCity
        ? subcategory.profiles.filter(
              (p) => p.city.toLowerCase() === selectedCity.toLowerCase()
          )
        : subcategory.profiles;

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
                    title={`${subcategory.name} Profiles`}
                />
                <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-center text-lg">
                    Browse our professional profiles specialized in {subcategory.name}.
                </p>
            </div>

            {selectedCity && (
                <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 w-fit mx-auto">
                    <MapPin size={16} className="text-yellow-600" />
                    Showing profiles from <strong className="text-slate-700">{selectedCity}</strong>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProfiles.map(profile => (
                    <div key={profile.id} className="h-full">
                        <ProfileCard profile={profile} />
                    </div>
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
