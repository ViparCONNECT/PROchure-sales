/**
 * A2 — "What is PROchure ?"
 * Hand-authored from `src/assets/lobby_texts/A2. What is PROchure.docx`.
 * Fully responsive replacement for the runtime docx render.
 */
import { Brand, Vipar, BeAProButton, LobbyDoc, LobbyDivider } from "./shared";

export default function A2WhatIsProchure() {
    return (
        <LobbyDoc>
            {/* Heading */}
            <p className="text-base sm:text-lg font-medium">
                <Brand /> explained precisely.
                <br />
                Very bluntly, hopefully interestingly !
            </p>

            <p className="text-sm sm:text-base">
                A platform for all Brands and not just a few.
                <br />
                To showcase the established and promote the new.
                <br />
                A simple concept with a revolutionary point of view !
            </p>

            <p className="text-sm sm:text-base">
                Not mere businesses, we only endorse BRANDS.
                <br />
                It's inception transpired considering consumer demands.
            </p>

            <p className="text-sm sm:text-base font-medium">
                CONSULTANT Brands&nbsp;&nbsp;|&nbsp;&nbsp;SERVICE Brands
                <br />
                RETAIL Brands&nbsp;&nbsp;|&nbsp;&nbsp;PRODUCT Brands
            </p>

            <p className="text-sm sm:text-base">
                Showcasing Brands from everywhere.
                <br />
                On a platform, in a manner fair and square.
                <br />
                Not promising deceiving false leads.
                <br />
                Instead facilitating advertising needs.
                <br />
                Ensuring verification and authentication,
                <br />
                prior to approving a Brand publication.
            </p>

            <p className="text-sm sm:text-base">
                Our goal is to create a platform for constructive collaborations.
                <br />
                Successful career growth is integral to all professions.
            </p>

            <p className="text-sm sm:text-base">
                It's an idea that is not half-baked but coherent,
                <br />
                which took research and rationale to implement.
            </p>

            <p className="text-sm sm:text-base">
                In addition to the BRANDS EXPLORATION,
                <br />
                there is inclusion of PROFESSIONAL &amp; EDUCATIONAL INFORMATION !
            </p>

            <p className="text-base sm:text-lg font-medium">
                <Brand /> is extremely purposeful,
                <br />
                conceptualised simple and thoughtful.
            </p>

            <p className="text-sm sm:text-base">
                Services and Products categorised elaborately.
                <br />
                Search criteria structured diligently.
                <br />
                Because when options become infinite,
                <br />
                results must be definite.
            </p>

            <p className="text-sm sm:text-base">
                Results as accurate as achievable.
                <br />
                Also, as quickly as possible.
            </p>

            <p className="text-sm sm:text-base">
                Our priority itself being :
                <br />
                Stop Searching, Start Finding !
            </p>

            <p className="text-sm sm:text-base">
                With membership meticulously filtered
                <br />
                and functionality smooth and uncluttered,
                <br />
                we ensure impeccability sustained
                <br />
                and platform integrity maintained.
            </p>

            <p className="text-sm sm:text-base">
                No third-party pop-ups.
                <br />
                No navigation goof-ups.
            </p>

            <p className="text-sm sm:text-base">
                Every Brand shall get the exact same preferred display name.
                <br />
                Helping the Brand to uphold its identity is our primary aim.
            </p>

            <p className="text-sm sm:text-base">
                <Brand /> is your professional placard.
                <br />
                To stand-out in the business boulevard.
            </p>


            <p className="text-sm sm:text-base">
                Trusting you find our concept noteworthy.
                <br />
                Assuming that we also narrated it flawlessly.
            </p>

            <p className="text-sm sm:text-base">
                To publish your Brand, click here on <BeAProButton />
            </p>

            {/* Divider (responsive, replaces literal dashes) */}
            <LobbyDivider />

            {/* Attribution — right aligned in the source */}
            <p className="text-right text-xs sm:text-sm">
                WORDED by&nbsp;&nbsp;|&nbsp;&nbsp;Arch. Vinod Venugopal, the founder of{" "}
                <Vipar />
                <sup className="text-[0.6em] align-super">®</sup>
            </p>
        </LobbyDoc>
    );
}
