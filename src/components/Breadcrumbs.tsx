import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
    items: { label: string; to?: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const isServiceOrProduct = (label: string) => {
        if (label.toLowerCase() === "services") {
            return "Service Brands";
        } else if (label.toLowerCase() === "products") {
            return "Product Brands";
        } else if (label.toLowerCase() === "retail") {
            return "Retail Brands";
        } else if (label.toLowerCase() === "consultants") {
            return "Professional Consultants";
        } else {
            return label;
        }
    }

    return (
        <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link to="/" className="hover:prochure-text flex items-center gap-1 transition-colors">
                <Home size={14} />
                Lobby
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <ChevronRight size={14} />
                    {item.to ? (
                        <Link to={item.to} className="hover:prochure-text capitalize transition-colors">
                            {isServiceOrProduct(item.label)}
                        </Link>
                    ) : (
                        <span className={`capitalize ${index === items.length - 1 ? "font-bold prochure-text" : ""}`}>
                            {isServiceOrProduct(item.label)}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
