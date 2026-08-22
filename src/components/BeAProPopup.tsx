import { X } from "lucide-react";
import { createPortal } from "react-dom";
import {
    GOOGLE_FORM_CONSULTANTS_URL,
    GOOGLE_FORM_BUSINESS_URL,
} from "../config/constants";

const THEME_COLOR = "#55374a";

interface BeAProPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BeAProPopup({ isOpen, onClose }: BeAProPopupProps) {
    if (!isOpen) return null;

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
                    <a
                        href={GOOGLE_FORM_CONSULTANTS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 px-4 rounded-sm bg-white font-semibold no-underline transition-opacity hover:opacity-90"
                        style={{ color: THEME_COLOR }}
                        onClick={onClose}
                    >
                        PROFESSIONAL CONSULTANT
                    </a>
                    <a
                        href={GOOGLE_FORM_BUSINESS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 px-4 rounded-sm bg-white font-semibold no-underline transition-opacity hover:opacity-90"
                        style={{ color: THEME_COLOR }}
                        onClick={onClose}
                    >
                        BUSINESS BRAND
                    </a>
                </div>
            </div>
        </div>,
        document.body
    );
}
