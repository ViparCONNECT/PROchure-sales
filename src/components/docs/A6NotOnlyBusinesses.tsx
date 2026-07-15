/**
 * A6 — "Is PROchure Only for Consultant and Business Brands ?"
 * Hand-authored from `src/assets/lobby_texts/A6. Is PROchure only about Consultant and Business Brands.docx`.
 */
import { Brand, BeAProButton, LobbyDoc, WordedBy } from "./shared";

export default function A6NotOnlyBusinesses() {
    return (
        <LobbyDoc>
            <p className="text-base sm:text-lg font-medium">
                Is <Brand /> only for Professionals and Businesses ?
            </p>

            <p className="text-sm sm:text-base">
                Though it is a platform for Professionals and Businesses primarily,
                <br />
                there is prolific information for one-and-all, students especially.
            </p>

            <p className="text-sm sm:text-base">
                <Brand /> is not limited to Businesses Professional.
                <br />
                It is very Informative and also Educational.
            </p>

            <p className="text-sm sm:text-base">
                Content that is ethical and moral handled responsibly,
                <br />
                which anyone above the age of 12 can access securely.
            </p>

            <p className="text-sm sm:text-base">
                To publish your Brand, click here on <BeAProButton />
            </p>

            <WordedBy />
        </LobbyDoc>
    );
}
