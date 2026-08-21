/**
 * Shared inline helpers for hand-authored document components.
 * Keeps brand styling (fonts / colours) consistent across all popups.
 */
import { useState } from "react";
import type { ReactNode, MouseEvent } from "react";
import BeAProPopup from "../BeAProPopup";

/** App theme colour. */
const THEME_COLOR = "#55374a";

/** Brand wordmark — Maiandra GD, matching the source documents. */
export function Brand() {
    return <span className="font-['Maiandra_GD']">PROchure</span>;
}

/** "Be a PRO" call-to-action wordmark — Maiandra GD (inline text reference). */
export function BeAPro() {
    return <span className="font-['Maiandra_GD']">Be a PRO</span>;
}

/**
 * "Be a PRO !" call-to-action button — white background, theme-colour text.
 * Opens a popup to choose between Professional Consultants and Business Brands forms.
 */
export function BeAProButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <a
                href="#"
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setIsOpen(true);
                }}
                className="inline-block px-4 py-1 bg-white font-semibold rounded-sm cursor-pointer hover:opacity-90 transition-opacity align-middle font-['Maiandra_GD'] no-underline"
                style={{ color: THEME_COLOR }}
            >
                Be a PRO !
            </a>
            <BeAProPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

/** "Vipar" — Monotype Corsiva in green, exactly as in the documents. */
export function Vipar() {
    return <span className="font-['Monotype_Corsiva'] text-[#99D050]">Vipar</span>;
}

/** Registered-trademark superscript. */
export function Reg() {
    return <sup className="text-[0.6em] align-super">®</sup>;
}

/** Responsive horizontal rule replacing the documents' literal dash lines. */
export function LobbyDivider() {
    return <hr className="border-white/30 my-1" />;
}

/** Standard right-aligned founder attribution used across the lobby documents. */
export function WordedBy() {
    return (
        <>
            <LobbyDivider />
            <p className="text-right text-xs sm:text-sm">
                WORDED by&nbsp;&nbsp;|&nbsp;&nbsp;Arch. Vinod Venugopal, the founder of{" "}
                <Vipar />
                <Reg />
            </p>
        </>
    );
}

/** Wrapper for the centred, verse-style lobby / info documents. */
export function LobbyDoc({ children }: { children: ReactNode }) {
    return (
        <div className="text-white text-center leading-relaxed space-y-6">{children}</div>
    );
}

/* ---------- Legal / policy document helpers ---------- */

/** Wrapper for justified legal documents. */
export function LegalDoc({ children }: { children: ReactNode }) {
    return (
        <div className="text-white text-left leading-relaxed space-y-4 text-sm sm:text-base">
            {children}
        </div>
    );
}

/** Centred, bold, underlined legal document title. */
export function LegalTitle({ children }: { children: ReactNode }) {
    return (
        <h3 className="text-center font-bold underline text-base sm:text-lg mb-4 uppercase tracking-wide">
            {children}
        </h3>
    );
}

/** Bold section heading within a legal document. */
export function LegalHeading({ children }: { children: ReactNode }) {
    return <h4 className="font-bold mt-4">{children}</h4>;
}

/** Justified body paragraph within a legal document. */
export function LegalP({ children }: { children: ReactNode }) {
    return <p className="text-justify">{children}</p>;
}
