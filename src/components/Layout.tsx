import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LocationModal from "./LocationModal";

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handler = () => setIsSidebarOpen(true);
        window.addEventListener("openSidebar", handler);
        return () => window.removeEventListener("openSidebar", handler);
    }, []);

    // useEffect(() => {
    //     const saved = localStorage.getItem("prochure_selected_city");
    //     if (!saved) {
    //         const timer = setTimeout(() => setIsLocationOpen(true), 800);
    //         return () => clearTimeout(timer);
    //     }
    // }, [location]);

    // useEffect(() => {
    //     const saved = localStorage.getItem("prochure_selected_city");
    //     if (!saved) {
    //         const timer = setTimeout(() => {
    //             setIsLocationOpen(true);
    //         }, 800);
    //         return () => clearTimeout(timer);
    //     }
    // }, []);

    return (
        <div className="min-h-screen bg-[#FDFBF7] selection:bg-purple-200 text-slate-900 flex flex-col">
            <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onOpenLocation={() => setIsLocationOpen(true)}
            />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />

            <LocationModal isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
        </div>
    );
}
