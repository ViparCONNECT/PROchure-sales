import Navbar from "./components/Navbar";
import SectionHeading from "./components/SectionHeading";
import ArticleGrid from "./components/ArticleGrid";
import VideoSection from "./components/VideoSection";
import SubscriptionSection from "./components/SubscriptionSection";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-purple-200 text-slate-900">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section 1: Articles */}
        <section className="py-16 sm:py-24 border-b border-purple-100/50">
          <SectionHeading
            number="1"
            title="What is PROchure and Why should you be a member?"
          />
          <ArticleGrid />
        </section>

        {/* Section 2: Video */}
        <section className="py-16 sm:py-24 border-b border-purple-100/50">
          <SectionHeading
            number="2"
            title="What does our mascot Bino-bird have to say?"
          />
          <VideoSection />
        </section>

        {/* Section 3: Subscription */}
        <section className="py-16 sm:py-24 pb-32">
          <SectionHeading number="3" title="Subscription Process" />
          <SubscriptionSection />
        </section>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm bg-white border-t border-gray-100">
        &copy; {new Date().getFullYear()} PROchure. All rights reserved.
      </footer>
    </div>
  );
}
