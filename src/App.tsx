import Navbar from "./components/Navbar";
import SectionHeading from "./components/SectionHeading";
import ArticleGrid from "./components/ArticleGrid";
// import VideoSection from "./components/VideoSection";
import SubscriptionSection from "./components/SubscriptionSection";
import LoadingAnimation from "./components/LoadingAnimation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Video, Sparkles, Handshake } from "lucide-react";
import Footer from "./components/Footer";

export default function App() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after 5 seconds (adjust as needed)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible ? (
        <AnimatePresence>
          <LoadingAnimation />
        </AnimatePresence>
      ) : (
        <div className="min-h-screen bg-[#FDFBF7] selection:bg-purple-200 text-slate-900">
          <Navbar />

          <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section 1: Articles */}
            <section className="py-16 sm:py-24 border-b border-prochure-100/50">
              <SectionHeading
                icon={Handshake}
                title="What is PROchure and Why should you be a member?"
              />
              <ArticleGrid />
            </section>

            {/* Section 2: Video */}
            {/* <section className="py-16 sm:py-24 border-b border-prochure-100/50">
              <SectionHeading
                icon={Video}
                title="What does our mascot Bino-bird have to say?"
              />
              <VideoSection />
            </section> */}

            {/* Section 3: Subscription */}
            <section className="py-16 sm:py-24 pb-32">
              <SectionHeading icon={Sparkles} title="Subscription Process" />
              <SubscriptionSection />
            </section>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
