/**
 * C1 — "Whose Idea is it ?"
 * Hand-authored from `public/Side-Navbar-and-its-content/C1. Whose Idea is it.docx`.
 */
import { Brand, Vipar, Reg, LobbyDoc } from "./shared";

export default function C1WhoseIdea() {
    return (
        <LobbyDoc>
            <p className="text-sm sm:text-base">
                This is an Architect's Innovation.
                <br />
                Driven by Perseverance and Passion.
            </p>

            <p className="text-sm sm:text-base">
                <Brand />
                <Reg /> is a product of <Vipar />
                <Reg />,{" "}
                <span className="font-['Monotype_Corsiva'] text-base sm:text-lg">
                    <strong>vi</strong>sionary <strong>par</strong> extremity
                </span>
                .
                <br />
                Envisioned by an Architect, with insight and creativity.
            </p>

            <p className="text-sm sm:text-base">
                A '96 batch graduate from M S Ramaiah Institute of Technology,
                <br />
                he is enrolled with the Council of Architecture Registry.
            </p>

            <p className="text-sm sm:text-base">
                After two decades of practicing architecture,
                <br />
                he's exploring new avenues, <Brand /> being his latest venture.
            </p>

            <p className="text-sm sm:text-base">
                To know more about the entity, log on to{" "}
                <a
                    href="https://www.vipar.company"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#99D050] underline"
                >
                    www.vipar.company
                </a>
                <br />
                And you'll find other interesting products unique and many !
            </p>
        </LobbyDoc>
    );
}
