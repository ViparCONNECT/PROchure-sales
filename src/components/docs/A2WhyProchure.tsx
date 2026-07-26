/**
 * A2 — "Why PROchure ?"
 * Hand-authored from `src/assets/lobby_texts/A2. Why PROchure.docx`.
 * Fully responsive replacement for the runtime docx render.
 */
import { Brand, Vipar, BeAProButton, LobbyDoc, LobbyDivider } from "./shared";

export default function A2WhyProchure() {
    return (
        <LobbyDoc>
            <p className="text-base sm:text-lg font-medium">
                Business Brands need a niche platform for advertising.
                <br />
                NOT search engines and apps extremely depressing !
            </p>

            <p className="text-sm sm:text-base">
                Search engines are dump yards of right and wrong information,
                <br />
                leading to confusion resulting in futile communication.
            </p>

            <p className="text-sm sm:text-base">
                Search engines show businesses discontinued,
                <br />
                cos such dump yards aren't periodically renewed.
                <br />
                If you want something from Kashmir, it'll display results in Kanyakumari.
                <br />
                That is the absurd levels of farcical inaccuracy.
            </p>

            <p className="text-sm sm:text-base">
                A misconception that "ALL" solutions are on the web space.
                <br />
                Most results from the "universal search engine" are an utter disgrace.
            </p>

            <p className="text-sm sm:text-base">
                When you Just "Search" &amp; Dial,
                <br />
                it could be Error &amp; Trial !
            </p>

            <p className="text-sm sm:text-base">
                Wrong Numbers are a constant headache.
                <br />
                You need an earnest platform, make no mistake.
            </p>

            <p className="text-sm sm:text-base">
                All have lost faith in the old websites too.
                <br />
                There weren't many by the way, except for two.
                <br />
                Do yourself a reality check.
                <br />
                Both these websites are an absolute wreck,
                <br />
                with algorithms being used of archaic tech.
            </p>

            <p className="text-sm sm:text-base">
                Not demeaning others by proclaiming we are supreme.
                <br />
                Instead highlighting the state of affairs that motivated us to this extreme.
            </p>

            <p className="text-base sm:text-lg font-medium">
                Brands no longer need to create profiles on Social Media.
                <br />
                You now have a dedicated Professional platform from India.
                <br />
                <Brand /> is your Brand encyclopedia !
            </p>

            <p className="text-sm sm:text-base">
                Every app is developed Conceptual.
                <br />
                The popular ones are either Social or Political.
                <br />
                This is not where Consultants and Retailers should be.
                <br />
                But on a platform that is dedicated to them….. Left, Right &amp; C !
            </p>

            <p className="text-sm sm:text-base">
                Displaying your services and products as ChatApp Status daily
                <br />
                will only be visible to the same hundred phone contacts, sadly.
            </p>

            <p className="text-sm sm:text-base">
                Word-of-mouth could be uncertain and time consuming.
                <br />
                To gain traction, the key strategy is effective marketing.
            </p>

            <p className="text-sm sm:text-base">
                For a multitude of reasons, consequently
                <br />
                join the platform with accurate data, generated responsibly.
                <br />
                A need-of-the-hour, most certainly.
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

            <LobbyDivider />

            {/* Fine-print disclaimer */}
            <p className="text-[11px] sm:text-xs text-white/80">
                Any resemblance to anything you think we have alluded could only be a coincidence.
                <br />
                We assure you that this is purely unintentional and only a part of the poetic utterance.
            </p>
        </LobbyDoc>
    );
}
