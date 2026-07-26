/**
 * D2 — "Be Aware"
 * Hand-authored from `public/Side-Navbar-and-its-content/D2. Be Aware.docx`.
 */
import { Brand, Vipar, LegalDoc } from "./shared";

export default function D2BeAware() {
    return (
        <LegalDoc>
            <h3 className="text-center font-bold text-lg sm:text-xl mb-4">PLEASE BE INFORMED</h3>

            <p>
                <Brand /> is primarily only an online advertising platform where Professional Consultants
                and Business Brands across industries can showcase their Business Profiles to the world.
            </p>
            <p>
                We are Only a digital medium creating a common platform for connecting consultants and
                business brands with their prospective clients and customers.
            </p>
            <p>
                <Brand /> will neither give business leads nor give assurances on business conversions and
                return on investment (investment = subscription fees).
            </p>
            <p>
                <Brand /> is neither an active or passive participant nor has any role directly or
                indirectly in the communication, business deals and business transactions between the
                members and non-members of this platform.
            </p>
            <p>
                <Brand /> does a comprehensive check only on certain service-oriented and business-related
                aspects of Professional Consultants and Business Brands based on the information provided by
                them during their profile creation.
            </p>
            <p>
                <Brand /> has not done any personal background verification of any member and hence cannot
                and will not take responsibility for the behavior / conduct / decorum of any member of the
                platform during the course of interaction and business transactions outside the realm of
                this platform.
            </p>
            <p>
                The choice of interaction and business transactions between individuals (members and
                non-members of the platform) is at the sole discretion of each person involved in it and{" "}
                <Brand /> is not liable for the same.
            </p>
            <p>
                <Brand /> DOES NOT ACCEPT CASH payments from anyone who wishes to subscribe to be a member on
                our platform.
            </p>
            <p>
                <Brand /> is NOT responsible / liable to anyone who makes a cash payment to those who
                impersonate as a marketing executive of <Vipar /> or <Brand />.
            </p>
            <p>
                Payment towards Subscription Fees must be made ONLY to the company bank (current) account of{" "}
                <Vipar />, the details of which we shall share ONLY from our official mail id of <Brand />{" "}
                which is prochure@vipar.company.
            </p>
            <p>
                <Brand /> DOES NOT SAVE your Card Details for future payments.
            </p>
            <p>
                <Brand /> DOES NOT HAVE Auto-Renewal feature for annual subscriptions.
            </p>
            <p>
                Certain fields in Profile Creation are mandatory only to prove your genuineness and
                authenticity as a Professional Consultant or Business Brand.
            </p>
            <p>
                <span className="font-bold">
                    <Brand /> DOES NOT SELL Your Data :
                </span>
                <br />
                We do not share any information collected from you during the process of registration and
                profile creation with a third-party for monetization or otherwise.
            </p>
            <p>
                What is seen by a third party on this platform is ONLY the information that you have chosen
                to display / showcase / mention as a part of your professional services / business.
            </p>
        </LegalDoc>
    );
}
