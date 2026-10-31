import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Folder, MapPin } from "lucide-react";
import { getCategories } from "../config/api";
import { routeForSlug } from "../config/profileTypes";
import { slugOf } from "../helper/helper";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionHeading from "../components/SectionHeading";
import { useSeo } from "../hooks/useSeo";
import PageSpinner from "../components/PageSpinner";

const FILTER_BY_CITY = true;

// const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

function getProfileCount(category: any, city: string | null): number {
    // Prefer backend-provided count
    if (typeof category.profileCount === "number") return category.profileCount;
    if (!category.subcategories) return 0;
    return category.subcategories.reduce((acc: number, sub: any) => {
        if (!sub.profiles) return acc;
        const profiles = city
            ? sub.profiles.filter((p: any) => (p.city_town || p.city || "").toLowerCase() === city.toLowerCase())
            : sub.profiles;
        return acc + profiles.length;
    }, 0);
}

// function getSubcategoryCount(category: any, city: string | null): number {
//     if (typeof category.subCategoryCount === "number" && (!city)) return category.subCategoryCount;
//     if (!city || !category.subcategories) return category.subcategories?.length || 0;
//     return category.subcategories.filter((sub: any) =>
//         sub.profiles?.some((p: any) => (p.city_town || p.city || "").toLowerCase() === city.toLowerCase())
//     ).length;
// }

export default function CategoryListPage() {
    const { type } = useParams();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const typeRoute = routeForSlug(type);
    const pageTitle = typeRoute?.label ?? "Profiles";
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
        if (!typeRoute) {
            setCategories([]);
            return;
        }

        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const cats = await getCategories(typeRoute.type);
                if (cancelled) return;
                setCategories(cats);
            } catch (err) {
                console.error("Failed to load categories", err);
                if (!cancelled) setCategories([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [typeRoute]);

    const filteredCategories = FILTER_BY_CITY && selectedCity
        ? categories.filter((c) => getProfileCount(c, selectedCity) > 0)
        : categories;

    if (loading) return <div className="min-h-[30vh] flex items-center justify-center"><PageSpinner /></div>;

    if (!filteredCategories.length) return (
        <div className="p-8 text-center text-slate-500">
            {selectedCity ? `No categories with profiles found in ${selectedCity}.` : "Not Found"}
        </div>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
            <Breadcrumbs items={[{ label: pageTitle }]} />

            {selectedCity && (
                <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 w-fit mx-auto">
                    <MapPin size={16} className="text-yellow-600" />
                    Showing categories with profiles from <strong className="text-slate-700">{selectedCity}</strong>
                </div>
            )}

            {groupSections(filteredCategories, `${typeRoute?.singular ?? ""}`).map((section) => (
            <section key={section.key} className="mb-12">
            <SectionHeading icon={Folder} title={`${section.title}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.categories.map((category) => {
                    // const profileCount = getProfileCount(category, selectedCity);
                    // const subCatCount = getSubcategoryCount(category, selectedCity);
                    const target = (category.isSubCategoryNeeded === false) ? `/${type}/${slugOf(category)}/profiles` : `/${type}/${slugOf(category)}`;
                    return (
                        <Link to={target} key={category.id}>
                            <div
                                className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-prochure-bg/10 transition-all duration-300 h-full flex flex-col items-center text-center cursor-pointer"
                            >
                                <div className="w-16 h-16 bg-prochure-50 rounded-full flex items-center justify-center prochure-text mb-4 group-hover:prochure-text group-hover:text-white transition-colors duration-300">
                                    <Folder size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 group-hover:prochure-text transition-colors">
                                    {category.name}
                                </h3>
                                {/* <p className="mt-2 text-slate-500 text-sm">
                                    Sub Categories : {subCatCount} | Profiles : {profileCount}
                                </p> */}
                            </div>
                        </Link>
                    );
                })}
            </div>
            </section>
            ))}
        </div>
    );
}

interface CategoryGroupRef {
    id: string;
    name: string;
    sortOrder?: number;
}

/** Splits categories under their category type ("group") headings, in the group's display order. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function groupSections(categories: any[], fallbackTitle: string) {
    const sections = new Map<string, { key: string; title: string; order: number; categories: typeof categories }>();
    for (const c of categories) {
        const g = c.group as CategoryGroupRef | null | undefined;
        const key = g?.id ?? "__ungrouped";
        if (!sections.has(key)) {
            sections.set(key, {
                key,
                title: g?.name ?? fallbackTitle,
                order: g ? (g.sortOrder ?? 0) : Number.MAX_SAFE_INTEGER,
                categories: [],
            });
        }
        sections.get(key)!.categories.push(c);
    }
    return [...sections.values()].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
