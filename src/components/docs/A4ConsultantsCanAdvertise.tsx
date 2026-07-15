/**
 * A4 — "Consultants CAN Advertise ! – The Laws"
 * Hand-authored from `src/assets/lobby_texts/A4. Consultants CAN Advertise - The Laws.docx`.
 */
import { Brand, BeAProButton, LobbyDoc, LobbyDivider, WordedBy } from "./shared";

export default function A4ConsultantsCanAdvertise() {
    return (
        <LobbyDoc>
            <p className="text-base sm:text-lg font-medium">
                CAN PROFESSIONAL CONSULTANTS ADVERTISE ?
            </p>

            <p className="text-sm sm:text-base">
                YES YOU CAN. It is your fundamental right to exercise.
                <br />
                Provided, about your skill, you don't brag and spread lies.
                <br />
                The law also says the same to be precise.
            </p>

            <p className="text-sm sm:text-base">
                For centuries now, aren't 'paper' business cards prevalent ?
                <br />
                <Brand /> is only it's Digital equivalent !
            </p>

            <p className="text-sm sm:text-base">
                Creating profiles on a professional app,
                <br />
                helps bridge the consultant-client gap.
            </p>

            <p className="text-sm sm:text-base">
                Displaying your contact details and working hours,
                <br />
                saves not just your time but also ours.
            </p>

            <p className="text-sm sm:text-base">
                Mentioning your specific fields of specialization,
                <br />
                would help us reach-out with preferred selection.
            </p>

            <p className="text-sm sm:text-base">
                Professionals are expanding their levels of proficiency, endlessly.
                <br />
                Citing this on their profiles would help all, immensely.
            </p>

            <p className="text-sm sm:text-base">
                A Digital Business card is any day better.
                <br />
                Updating information can be done faster.
            </p>

            <p className="text-sm sm:text-base">
                But, to begin with, all must know your services exist.
                <br />
                And for that at least your business card will assist.
            </p>

            <p className="text-sm sm:text-base">
                <Brand /> : a Digital Business Card that professionals cannot resist !
            </p>

            <p className="text-base sm:text-lg font-medium">
                Doctors, Lawyers, Chartered Accountants and Architects.
                <br />
                Regarding endorsing yourselves, here's What the Law Reflects.
            </p>

            <p className="text-sm sm:text-base">
                Regardless of the experience you hold in years,
                <br />
                you're prohibited to claim you are the best amongst your peers.
            </p>

            <p className="text-sm sm:text-base">
                No false assertions of industry achievements and success.
                <br />
                Not even boasting about your skills and talent in excess.
            </p>

            <p className="text-sm sm:text-base">
                The qualifications that you rightfully possess,
                <br />
                and the services that you render, you may express.
            </p>

            <p className="text-sm sm:text-base">
                Affirming only you can and none else
                <br />
                is sternly forbidden, the law tells.
            </p>

            <p className="text-sm sm:text-base">
                Solicitation of work is strictly unlawful.
                <br />
                Even if you have clients, merely a handful.
            </p>

            <p className="text-sm sm:text-base">
                However, just your Name, Address and Availability
                <br />
                shall ensure that you are in No Legal Accountability !
            </p>

            <p className="text-sm sm:text-base">
                The above is a gist of what the laws states fundamentally.
                <br />
                If you don't believe us, kindly cross-verify absolutely.
            </p>

            <p className="text-sm sm:text-base">
                Hoping we obliterated the ambiguity,
                <br />
                by conveying this with conviction and clarity.
            </p>

            <p className="text-sm sm:text-base">
                We did our best to explain to you why you should and whether you can.
                <br />
                Rolling out the purple carpet and welcoming you to the <Brand /> clan !
            </p>

            <p className="text-sm sm:text-base">
                In the pretext of professional nobility,
                <br />
                should you be deprived of a flourishing opportunity ?
            </p>

            <p className="text-sm sm:text-base">
                'An Individual cannot be a Brand' is a myth.
                <br />
                At <Brand />, we assure this happens swith.
            </p>

            <p className="text-sm sm:text-base">
                Popularity is what every professional aspires for.
                <br />
                Exceptional skill would attract clients galore.
            </p>

            <p className="text-sm sm:text-base">
                Higher prospects are what each one is entitled to.
                <br />
                Like those in other professions, so do you.
            </p>

            <p className="text-sm sm:text-base">
                As long as professional ethics and etiquettes, you maintain.
                <br />
                From solely showcasing your consultation services, should you refrain ?
            </p>

            <p className="text-sm sm:text-base">
                In the end, Profile creation is at your discretion entirely.
                <br />
                Urging professionals to abide by your SRA* mandatorily.
            </p>

            <p className="text-sm sm:text-base">
                To publish your Professional Consultant profile, click here on <BeAProButton />
            </p>

            <LobbyDivider />

            {/* Disclaimer + regulatory authorities */}
            <p className="text-left text-xs sm:text-sm">
                <span className="font-semibold">Disclaimer :</span> Reiterating that only a few of the
                clauses in various statutory regulatory bodies have been highlighted here, poetically,
                without manipulating the spirit of the law. Professional Consultants shall duly follow the
                guidelines of their respective *Statutory Regulatory Authority / Body before creating their
                Profile at <Brand />.
            </p>

            <p className="text-xs sm:text-sm">
                A few of the Statutory Regulatory Authorities for Professional Consultants :
                <br />
                NMC (for Doctors) | ICAI (for Chartered Accountants) | BCI (for Lawyers)
                <br />
                CoA (for Architects) | ICE (for Civil Engineers) | CE (for Structural Engineers)
            </p>

            <WordedBy />
        </LobbyDoc>
    );
}
