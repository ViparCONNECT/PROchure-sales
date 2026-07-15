/**
 * A7 — "The Membership Process"
 * Hand-authored from `src/assets/lobby_texts/A7. The Membership Process.docx`.
 */
import { BeAPro, BeAProButton, LobbyDoc, WordedBy } from "./shared";

export default function A7MembershipProcess() {
    return (
        <LobbyDoc>
            <p className="text-base sm:text-lg font-medium">
                HOW TO ' <BeAPro /> ' !
            </p>

            <p className="text-sm sm:text-base">
                In order to maintain the platform's sanctity,
                <br />
                we are restricting certain user activity.
            </p>

            <p className="text-sm sm:text-base">
                For instance, be it a Brand publication or a Profile creation,
                <br />
                membership cannot be achieved via self-registration.
                <br />
                Instead, only by the platform administration
                <br />
                after sending us a formal requisition.
            </p>

            <p className="text-sm sm:text-base">
                Even though self-registration isn't permitted,
                <br />
                access to your profile shall be granted
                <br />
                for editing and keeping relevant info updated.
            </p>

            <p className="text-sm sm:text-base">
                To publish your Brand / Profile, click here on <BeAProButton />
            </p>

            <WordedBy />
        </LobbyDoc>
    );
}
