import SectionHeading from "../components/SectionHeading";
import ArticleGrid from "../components/ArticleGrid";
// import SubscriptionSection from "../components/SubscriptionSection";
import { Handshake, Video } from "lucide-react";
import VideoSection from "../components/VideoSection";

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section 1: Articles */}
            <section className="py-16 sm:py-24 border-b border-prochure-100/50">
                <SectionHeading
                    icon={Handshake}
                    title="What is PROchure and Why should you be a member?"
                />
                <ArticleGrid />
            </section>
            {/* Section 2: Video Section */}
            <section className="py-16 sm:py-24 pb-32">
                <SectionHeading icon={Video} title="What the PROchure mascot Bino-bird has to say ?" />
                <VideoSection />
            </section>
            {/* Section 3: Subscription */}
            {/* <section className="py-16 sm:py-24 pb-32">
                <SectionHeading icon={Sparkles} title="Subscription Process" />
                <SubscriptionSection />
            </section> */}
        </div>
    );
}
