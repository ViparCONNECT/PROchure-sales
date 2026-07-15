import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionHeading from "../components/SectionHeading";
import { Shield, FileText, AlertTriangle, RefreshCw } from "lucide-react";

const policyContent: Record<string, { title: string; icon: any; sections: { heading: string; body: string }[] }> = {
    "privacy-policy": {
        title: "Privacy Policy",
        icon: Shield,
        sections: [
            {
                heading: "Information We Collect",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            },
            {
                heading: "How We Use Your Information",
                body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            },
            {
                heading: "Data Security",
                body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
            },
            {
                heading: "Third-Party Sharing",
                body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
            },
        ],
    },
    "terms-and-conditions": {
        title: "Terms & Conditions",
        icon: FileText,
        sections: [
            {
                heading: "Acceptance of Terms",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum.",
            },
            {
                heading: "User Responsibilities",
                body: "Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
            },
            {
                heading: "Intellectual Property",
                body: "Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
            },
            {
                heading: "Limitation of Liability",
                body: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam.",
            },
        ],
    },
    disclaimer: {
        title: "Disclaimer",
        icon: AlertTriangle,
        sections: [
            {
                heading: "General Disclaimer",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ut facilisis in, egestas eget quam.",
            },
            {
                heading: "No Professional Advice",
                body: "Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
            },
            {
                heading: "External Links",
                body: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue. Donec ullamcorper nulla non metus auctor fringilla.",
            },
        ],
    },
    "refund-policy": {
        title: "Refund Policy",
        icon: RefreshCw,
        sections: [
            {
                heading: "Eligibility for Refunds",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Donec sed odio dui.",
            },
            {
                heading: "Refund Process",
                body: "Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis.",
            },
            {
                heading: "Non-Refundable Items",
                body: "Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
            },
            {
                heading: "Contact for Refunds",
                body: "Donec id elit non mi porta gravida at eget metus. Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod.",
            },
        ],
    },
};

export default function PolicyPage() {
    const { policySlug } = useParams();
    const policy = policySlug ? policyContent[policySlug] : null;

    if (!policy) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-slate-500">
                <h2 className="text-2xl font-bold mb-2">Policy Not Found</h2>
                <Link to="/" className="mt-4 prochure-text hover:underline">Go Home</Link>
            </div>
        );
    }

    const Icon = policy.icon;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8">
            <Breadcrumbs
                items={[
                    { label: "Policies" },
                    { label: policy.title },
                ]}
            />

            <SectionHeading icon={Icon} title={policy.title} />

            <div className="mt-8 space-y-8">
                {policy.sections.map((section, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">
                            {index + 1}. {section.heading}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            {section.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
