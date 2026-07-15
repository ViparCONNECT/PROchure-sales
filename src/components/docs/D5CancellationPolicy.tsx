/**
 * D5 — "Cancellation / Refund Policy"
 * Hand-authored from `public/Side-Navbar-and-its-content/D5. Cancellation Policy.docx`.
 */
import { LegalDoc, LegalTitle, LegalP } from "./shared";

export default function D5CancellationPolicy() {
    return (
        <LegalDoc>
            <LegalTitle>Cancellation / Refund Policy</LegalTitle>

            <LegalP>
                We strictly DO NOT have a Refund Policy on Cancellation or Deletion of Subscription.
            </LegalP>
            <LegalP>
                For any grievances related to the subscription, please go to 'ASK US' (on the navigation
                bar) and send us a message by selecting the Subject of the message as GRIEVANCES.
            </LegalP>
        </LegalDoc>
    );
}
