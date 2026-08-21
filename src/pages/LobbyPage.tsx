import { useState } from "react";
import type { ComponentType, ReactNode, CSSProperties, MouseEvent } from "react";
import ContentModal from "../components/ContentModal";
import BeAProPopup from "../components/BeAProPopup";
import A2WhatIsProchure from "../components/docs/A2WhatIsProchure";
import A2WhyProchure from "../components/docs/A2WhyProchure";
import A3WhyConsultantsShouldAdvertise from "../components/docs/A3WhyConsultantsShouldAdvertise";
import A4ConsultantsCanAdvertise from "../components/docs/A4ConsultantsCanAdvertise";
import A5WhyBusinessBrands from "../components/docs/A5WhyBusinessBrands";
import A6NotOnlyBusinesses from "../components/docs/A6NotOnlyBusinesses";
import A7MembershipProcess from "../components/docs/A7MembershipProcess";

import A2 from "../assets/lobby_images/A2.png";
import A22 from "../assets/lobby_images/A22.png";
import A3 from "../assets/lobby_images/A3.png";
import A4 from "../assets/lobby_images/A4.png";
import A5 from "../assets/lobby_images/A5.png";
import A6 from "../assets/lobby_images/A6.png";
import A7 from "../assets/lobby_images/A7.png";

const BRAND_COLOR = "#55374a";

interface LobbyCardData {
    title: string;
    image: string;
    Component: ComponentType;
}

const lobbyCards: LobbyCardData[] = [
    { title: "What is PROchure ?", image: A2, Component: A2WhatIsProchure },
    { title: "Why PROchure ?", image: A22, Component: A2WhyProchure },
    { title: "Why Consultants Should Advertise !", image: A3, Component: A3WhyConsultantsShouldAdvertise },
    { title: "Consultants CAN Advertise ! – The Laws", image: A4, Component: A4ConsultantsCanAdvertise },
    { title: "Why we focus Only on Business Brands ?", image: A5, Component: A5WhyBusinessBrands },
    { title: "Is PROchure Only for Consultant and Business Brands ?", image: A6, Component: A6NotOnlyBusinesses },
    { title: "The Membership Process", image: A7, Component: A7MembershipProcess },
];

interface BeAProButtonProps {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

function BeAProButton({
    className = "inline-block px-4 py-2 text-white font-semibold text-base rounded-sm cursor-pointer transition-opacity hover:opacity-90 active:scale-95 no-underline",
    style = { backgroundColor: BRAND_COLOR },
    children = "Be a PRO !",
}: BeAProButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <a
                href="#"
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setIsOpen(true);
                }}
                className={className}
                style={style}
            >
                {children}
            </a>
            <BeAProPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

function LobbyCard({ title, image, Component }: LobbyCardData) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="w-full max-w-2xl mx-auto cursor-pointer group"
                onClick={() => setIsOpen(true)}
            >
                <p
                    className="text-center font-semibold text-base sm:text-lg mb-3 group-hover:underline transition-all"
                    style={{ color: BRAND_COLOR }}
                >
                    {title}
                </p>
                <div className="w-full overflow-hidden rounded-sm shadow-md group-hover:shadow-xl transition-shadow">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    />
                </div>
            </div>

            <ContentModal isOpen={isOpen} title={title} onClose={() => setIsOpen(false)}>
                <Component />
            </ContentModal>
        </>
    );
}

export default function LobbyPage() {
    return (
        <div className="w-full">
            {/* ── FIRST HALF ── white background, brand-color text ── */}
            <section className="bg-white py-12 px-4 flex flex-col items-center gap-10">

                {/* Mascot address */}
                {/* <p
                    className="text-center font-semibold text-base sm:text-lg"
                    style={{ color: BRAND_COLOR }}
                >
                    [ Our Mascot Bino-bird's ADDRESS TO THE NATION ! ]
                </p> */}

                {/* YouTube video embed */}
                {/* <div className="w-full max-w-2xl mx-auto aspect-video rounded-sm overflow-hidden shadow-md">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/KGc2CjVvp-I?autoplay=1&mute=1"
                        title="Bino-bird Address to the Nation"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div> */}

                {/* CTA */}
                <p className="text-center text-sm sm:text-base" style={{ color: BRAND_COLOR }}>
                    To publish your Brand, click here on{" "}
                    <BeAProButton />
                </p>

                <p className="text-center text-sm sm:text-base" style={{ color: BRAND_COLOR }}>
                    To view Brand Profiles, click on the navigation bar.
                </p>

                <hr className="w-full max-w-2xl border-t" style={{ borderColor: BRAND_COLOR + "40" }} />

                {/* Lobby Cards */}
                {lobbyCards.map((card) => (
                    <LobbyCard key={card.title} {...card} />
                ))}

                {/* Bottom CTA in first half */}
                <p className="text-center text-sm sm:text-base" style={{ color: BRAND_COLOR }}>
                    To publish your Brand, click here on{" "}
                    <BeAProButton />
                </p>

                <p className="text-center text-sm sm:text-base" style={{ color: BRAND_COLOR }}>
                    To view Brand Profiles, click on the navigation bar.
                </p>
            </section>

            {/* ── SECOND HALF ── brand-color background, white text ── */}
            <section
                className="py-16 px-4 flex flex-col items-center gap-8 text-white"
                style={{ backgroundColor: BRAND_COLOR }}
            >
                <p className="text-center text-base sm:text-lg max-w-2xl leading-relaxed">
                    I hope I have addressed your queries,<br />
                    as to why PROchure is crucial for professional and commercial enquiries.
                </p>

                <p className="text-center text-sm sm:text-base max-w-xl leading-relaxed">
                    Click here on{" "}
                    <BeAProButton
                        className="inline-block px-4 py-2 bg-white font-semibold rounded-sm cursor-pointer hover:opacity-90 transition-opacity no-underline"
                        style={{ color: BRAND_COLOR }}
                    >
                        Be a PRO !
                    </BeAProButton>{" "}
                    to fill-in a simple form of registration.<br />
                    And begin your journey with PROchure towards commercial satisfaction !
                </p>

                <div className="text-center text-sm leading-relaxed opacity-90">
                    <p>- Bino-bird, the 'Be a PRO' birdie</p>
                    <p>The official Mascot of PROchure ®</p>
                </div>

                <hr className="w-full max-w-2xl border-t border-white/20" />

                <div className="text-center max-w-xl">
                    <p className="text-base mb-3">The pronunciation of PROchure</p>
                    <p className="text-base mb-4">is similar to Brochure</p>

                    <p className="text-2xl tracking-widest mb-6">प्रोशर</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 text-xl">
                        <span>പ്രൊഷർ</span>
                        <span>ಪ್ರೊಶ್ ರ್</span>
                        <span>ப்ரோஷர்</span>
                        <span>ప్రోషేర్</span>
                        <span>প্রোশার</span>
                        <span>ਪ੍ਰੋਸ਼ਰ</span>
                        <span>પ્રોચૂરે</span>
                        <span>প্ৰোশাৰ</span>
                    </div>
                </div>

                <hr className="w-full max-w-2xl border-t border-white/20" />

                <div className="text-center max-w-xl leading-relaxed text-sm sm:text-base space-y-2 opacity-90">
                    <p>For now, we aren't on the "app stores" for installation.</p>
                    <p>Since ours is not an app for usage with addiction,</p>
                    <p>but a platform focussing on utility without compulsion.</p>
                    <p>Once our mobile app is ready, we shall inform you with a notification.</p>
                </div>

                <hr className="w-full max-w-2xl border-t border-white/20" />

                <div className="text-center max-w-xl leading-relaxed text-sm sm:text-base space-y-2 opacity-90">
                    <p>We have used AI moderately.</p>
                    <p>Still believe in HI exponentially.</p>
                    <p>AI used responsibly,</p>
                    <p>only to enhance search efficiently.</p>
                    <p className="text-xs opacity-70 mt-2">(HI = Human Intelligence &nbsp;|&nbsp; AI = Artificial Intelligence)</p>
                </div>

                <hr className="w-full max-w-2xl border-t border-white/20" />

                <p className="text-center text-sm sm:text-base">
                    To publish your Brand, click here on{" "}
                    <BeAProButton
                        className="inline-block px-4 py-2 bg-white font-semibold rounded-sm cursor-pointer hover:opacity-90 transition-opacity no-underline"
                        style={{ color: BRAND_COLOR }}
                    >
                        Be a PRO !
                    </BeAProButton>
                </p>

                <p className="text-center text-sm sm:text-base opacity-90">
                    To view Brand Profiles, click on the navigation bar.
                </p>
            </section>
        </div>
    );
}
