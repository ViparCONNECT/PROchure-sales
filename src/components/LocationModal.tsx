import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Search, Check, Languages, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
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
    "Kottayam",
    "Palakkad",
    "Thane",
    "Calicut",
    "Trivandrum",
    "Noida",
    "Manipal",
    "Udupi",
    "Kollam",
    "Goa",
    "Nainital",
    "Gurgaon",
    "Jaipur",
    "Kasargode",
    "Ghaziabad",
    "Raipur",
    "Puttur",
    "Nagpur",
    "Nashik",
    "Navi Mumbai",
    "Aurangabad",
    "Coimbatore",
    "Surat",
    "Vadodara",
    "Mysore",
    "V/pattanam",
    "Amritsar",
    "Bhopal",
    "Kanpur",
    "Faridabad",
    "Bhubaneshwar",
    "Gangtok",
    "Guwahati",
    "Gwalior",
    "Lucknow",
    "Patna",
    "Madurai",
    "Ranchi",
    "Indore",
    "Tirupur",
    "Trichy",
    "Vijayawada",
    "Jalandhar",
    "Imphal",
    "Itanagar",
    "Shillong",
    "Shimla",
    "Thimapur",
    "Agartala",
    "Aizwal",
    "Dehradun",
    "Sakleshpur",
    "Madikeri",
    "Thrissur",
];

type Tab = "languages" | "location";

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
    const [search, setSearch] = useState("");
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>("location");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            const saved = localStorage.getItem("prochure_selected_city");
            setSelectedCity(saved);
            setActiveTab("location");
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredCities = INDIAN_CITIES.filter((city) =>
        city.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectCity = (city: string) => {
        localStorage.setItem("prochure_selected_city", city);
        setSelectedCity(city);
        onClose();
        // Dispatch a custom event so other components can react
        window.dispatchEvent(new Event("locationChanged"));
    };

    const handleClearLocation = () => {
        localStorage.removeItem("prochure_selected_city");
        setSelectedCity(null);
        onClose();
        window.dispatchEvent(new Event("locationChanged"));
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-prochure-bg shadow-2xl rounded-sm overflow-hidden border border-white/10 max-h-[80vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 p-2"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-6 pb-0 text-white shrink-0">
                            <div className="flex items-center gap-2 mb-4">
                                <Globe size={22} className="text-yellow-400" />
                                <h2 className="text-xl font-bold tracking-wide uppercase">
                                    Languages &amp; Location
                                </h2>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-1 border-b border-white/10">
                                <button
                                    disabled
                                    title="Coming soon"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/30 cursor-not-allowed border-b-2 border-transparent"
                                >
                                    <Languages size={16} />
                                    Languages
                                    {/* <span className="text-[10px] uppercase tracking-wide bg-white/10 rounded px-1.5 py-0.5">Soon</span> */}
                                </button>
                                <button
                                    onClick={() => setActiveTab("location")}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors cursor-pointer border-b-2 ${
                                        activeTab === "location"
                                            ? "text-yellow-400 border-yellow-400"
                                            : "text-white/70 hover:text-white border-transparent"
                                    }`}
                                >
                                    <MapPin size={16} />
                                    Location
                                </button>
                            </div>
                        </div>

                        {activeTab === "location" && (
                            <>
                                <div className="px-6 pt-4 pb-3 text-white shrink-0">
                                    {selectedCity && (
                                        <div className="mb-4 flex items-center justify-between bg-white/10 rounded-lg px-4 py-2">
                                            <span className="text-white/90 text-sm">
                                                Current: <strong>{selectedCity}</strong>
                                            </span>
                                            <button
                                                onClick={handleClearLocation}
                                                className="text-xs text-yellow-400 hover:text-yellow-300 underline cursor-pointer"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    )}

                                    {/* Search */}
                                    <div className="relative">
                                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                                        <input
                                            type="text"
                                            placeholder="Search city..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* City List */}
                                <div className="px-6 pb-6 overflow-y-auto custom-scrollbar flex-1">
                                    <div className="space-y-1 mt-2">
                                        {filteredCities.map((city) => (
                                            <button
                                                key={city}
                                                onClick={() => handleSelectCity(city)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left cursor-pointer ${
                                                    selectedCity === city
                                                        ? "bg-yellow-400/20 text-yellow-400"
                                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                                }`}
                                            >
                                                <MapPin size={16} className="shrink-0 opacity-60" />
                                                <span className="flex-1 font-medium">{city}</span>
                                                {selectedCity === city && (
                                                    <Check size={18} className="text-yellow-400" />
                                                )}
                                            </button>
                                        ))}
                                        {filteredCities.length === 0 && (
                                            <p className="text-center text-white/50 py-6">
                                                No cities found matching "{search}"
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "languages" && (
                            <div className="px-6 py-12 flex flex-col items-center justify-center text-center text-white/50 flex-1">
                                <Languages size={40} className="mb-3 opacity-40" />
                                <p className="text-sm">Language selection is coming soon.</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
