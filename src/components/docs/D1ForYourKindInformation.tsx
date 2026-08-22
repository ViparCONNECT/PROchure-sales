/**
 * D1 — "For Your Kind Information"
 * Hand-authored from `public/Side-Navbar-and-its-content/D1. For Your Kind Information.docx`.
 */
import { LobbyDoc } from "./shared";
// import { Brand, BeAProButton } from "./shared";


export default function D1ForYourKindInformation() {
    return (
        <LobbyDoc>
            {/*
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
                <a href="mailto:prochure@vipar.company" className="text-[#99D050] underline">
                    prochure@vipar.company
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
            */}

            <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between gap-4">
                    <span>The Only web APP URL :</span>
                    <span className="font-medium ">www.prochure.app</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span>The Only BLOG URL :</span>
                    <span className="font-medium ">www.prochure.blog</span>
                </div>
                <div className="flex justify-between items-center gap-4 text-left">
                    <span>The Only YouTube CHANNEL :</span>
                    <span className="font-medium ">www.youtube.com/@PROchure</span>
                </div>
                <div className="flex justify-between items-center gap-4 text-left">
                    <span>The Only official EMAIL ID :</span>
                    <span className="font-medium ">prochure@vipar.company</span>
                </div>
                <p className="text-center pt-4">
                    PLEASE READ ‘ POLICIES &amp; REGULATION ’ clearly on the navigation bar.
                </p>
            </div>
        </LobbyDoc>
    );
}
