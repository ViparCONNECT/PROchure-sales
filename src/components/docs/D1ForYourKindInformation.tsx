/**
 * D1 — "For Your Kind Information"
 * Hand-authored from `public/Side-Navbar-and-its-content/D1. For Your Kind Information.docx`.
 */
import { Brand, BeAProButton, LobbyDoc } from "./shared";

export default function D1ForYourKindInformation() {
    return (
        <LobbyDoc>
            <p className="text-sm sm:text-base">
                The ONLY platform URL for <Brand /> :
            </p>
            <p className="text-sm sm:text-base font-medium">
                <a
                    href="https://www.prochure.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#99D050] underline"
                >
                    www.prochure.app
                </a>
            </p>

            <p className="text-sm sm:text-base pt-2">
                The platform communication EMAIL ID for <Brand /> :
            </p>
            <p className="text-sm sm:text-base font-medium">
                <a href="mailto:prochure.app@gmail.com" className="text-[#99D050] underline">
                    prochure.app@gmail.com
                </a>
            </p>

            <p className="text-sm sm:text-base pt-2">Our Trademarked Logo is :</p>
            <div className="flex justify-center py-2">
                <img
                    src="/proicon.png"
                    alt="PROchure logo"
                    className="h-20 sm:h-24 w-auto object-contain"
                />
            </div>

            <p className="text-sm sm:text-base pt-2">
                Our Brand Name is mentioned only in this manner in this font :
            </p>
            <p className="font-['Maiandra_GD'] text-2xl sm:text-3xl">PROchure</p>

            <p className="text-sm sm:text-base pt-2">
                PLEASE READ ' POLICIES &amp; REGULATION ' clearly on the navigation bar.
            </p>

            <p className="text-sm sm:text-base pt-2">
                We are NOT on Instagram and FB.
                <br />
                Ours is the platform where they should be !
            </p>

            <p className="text-sm sm:text-base pt-2">
                To publish your Brand, click here on <BeAProButton />
            </p>
        </LobbyDoc>
    );
}
