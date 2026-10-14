import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LocationModal from "./LocationModal";
import AuthModal from "./AuthModal";
import type { AuthMode } from "./AuthModal";
import { onOpenAuthModal } from "../config/authEvents";

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode | null>(null);
    // const location = useLocation();

    useEffect(() => {
        const handler = () => setIsSidebarOpen(true);
        window.addEventListener("openSidebar", handler);
        return () => window.removeEventListener("openSidebar", handler);
    }, []);

    useEffect(() => onOpenAuthModal(setAuthMode), []);

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
                onOpenAuth={setAuthMode}
            />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />

            <LocationModal isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
            <AuthModal isOpen={!!authMode} initialMode={authMode ?? "login"} onClose={() => setAuthMode(null)} />
        </div>
    );
}
