/**
 * C2 — "Founder's Message"
 * Hand-authored from `public/Side-Navbar-and-its-content/C2. Founder's Message.docx`.
 */
import { Brand, Vipar, Reg, LobbyDoc } from "./shared";

export default function C2FoundersMessage() {
    return (
        <LobbyDoc>
            <p className="text-sm sm:text-base">
                <span className="text-xl sm:text-2xl align-middle">"</span>In this day and age of online
                scams and digital arrest,
                <br />
                even a genuine platform's authenticity is put to test.
            </p>

            <p className="text-sm sm:text-base">
                Field marketing since long is unavailing.
                <br />
                Tele-marketing too is a strategy failing.
            </p>

            <p className="text-sm sm:text-base">
                We really wish we could meet each one of you individually.
                <br />
                Since that's a Herculean task, please consider this an invitation personally.
            </p>

            <p className="text-sm sm:text-base">
                We shall ensure that our policies are not diluted.
                <br />
                <Vipar /> vows to keep <Brand />'s decorum uplifted.
            </p>

            <p className="text-sm sm:text-base">
                We promise to bear true faith and allegiance,
                <br />
                that we shall maintain high standards and essence
                <br />
                forever without deviating from <Brand />'s relevance.
            </p>

            <p className="text-sm sm:text-base">
                Thanks for your time, understanding and patience.
                <span className="text-xl sm:text-2xl align-middle">"</span>
            </p>

            {/* Signature */}
            <p className="text-right text-sm sm:text-base mt-4">
                – Arch. Vinod Venugopal
                <br />
                founder of <Vipar />
                <Reg />
            </p>
        </LobbyDoc>
    );
}
