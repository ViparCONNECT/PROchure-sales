import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import servicesData from "../data/services.json";
import productsData from "../data/products.json";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionHeading from "../components/SectionHeading";

const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

export default function SubcategoryListPage() {
    const { type, category: categorySlug } = useParams();
    const [category, setCategory] = useState<any>(null);

    useEffect(() => {
        if (!type || !categorySlug) return;

        const dataKey = type === "services" ? "service" : "product";
        const data = type === "services" ? servicesData : productsData;

        // @ts-ignore
        const foundCategory = data[dataKey]?.categories.find((c: any) => toSlug(c.name) === categorySlug);
        setCategory(foundCategory);
    }, [type, categorySlug]);

    if (!category) return <div className="p-8 text-center text-slate-500">Category Not Found</div>;

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.subcategories.map((sub: any) => (
                    <Link to={`/${type}/${categorySlug}/${toSlug(sub.name)}`} key={sub.id}>
                        <div className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-prochure-bg/10 transition-all duration-300 h-full flex flex-col items-center text-center cursor-pointer"
                        >
                            <div className="w-16 h-16 bg-prochure-50 rounded-full flex items-center justify-center prochure-text mb-4 group-hover:prochure-text group-hover:text-white transition-colors duration-300">
                                <FolderOpen size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 group-hover:prochure-text transition-colors">
                                {sub.name}
                            </h3>
                            <p className="mt-2 text-slate-500 text-sm">
                                View Profiles
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
