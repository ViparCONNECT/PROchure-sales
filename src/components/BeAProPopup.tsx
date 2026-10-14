import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { openAuthModal } from "../config/authEvents";
import { PROFILE_TYPE_ROUTES } from "../config/profileTypes";

const THEME_COLOR = "#55374a";

const BUTTON_LABEL: Record<string, string> = {
    "professional-consultants": "PROFESSIONAL CONSULTANTS",
    "service-and-retail-brands": "SERVICE & RETAIL BRANDS",
};

interface BeAProPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BeAProPopup({ isOpen, onClose }: BeAProPopupProps) {
    const navigate = useNavigate();
    const { user } = useAuth();

    if (!isOpen) return null;

    const start = (slug: string) => {
        onClose();
        navigate(`/publish/${slug}`);
        // The form needs an account; ask the user to register/login straight away
        if (!user) openAuthModal("register");
    };

    return createPortal(
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className="relative w-full max-w-md rounded-sm overflow-hidden p-6 text-center"
                style={{ backgroundColor: THEME_COLOR }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 cursor-pointer"
                    aria-label="Close"
                >
                    <X size={22} />
                </button>

                <h2 className="text-white font-semibold text-lg mb-6">
                    Be a PRO !
                </h2>

                <div className="space-y-4">
                    {PROFILE_TYPE_ROUTES.map((r) => (
                        <button
                            key={r.slug}
                            type="button"
                            className="block w-full py-3 px-4 rounded-sm bg-white font-semibold transition-opacity hover:opacity-90 cursor-pointer"
                            style={{ color: THEME_COLOR }}
                            onClick={() => start(r.slug)}
                        >
                            {BUTTON_LABEL[r.slug]}
                        </button>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
}
