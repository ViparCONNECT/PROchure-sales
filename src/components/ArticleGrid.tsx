import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ARTICLES } from "../config/constants";

export default function ArticleGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  // Navigate functions
  const showPrev = useCallback(() => {
    setDirection(-1);
    setSelectedIndex((curr) =>
      curr === null || curr === 0 ? ARTICLES.length - 1 : curr - 1
    );
  }, []);

  const showNext = useCallback(() => {
    setDirection(1);
    setSelectedIndex((curr) =>
      curr === null || curr === ARTICLES.length - 1 ? 0 : curr + 1
    );
  }, []);

  // Preload adjacent images for instant navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const preloadImage = (index: number) => {
      if (index >= 0 && index < ARTICLES.length) {
        const img = new Image();
        img.src = ARTICLES[index].src;
      }
    };

    // Preload previous and next images
    preloadImage(selectedIndex - 1);
    preloadImage(selectedIndex + 1);
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  // Framer Motion Variants for ultra-smooth sliding
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {ARTICLES.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => {
              setSelectedIndex(index);
              setDirection(0);
            }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:shadow-purple-900/10 bg-gray-50 aspect-[4/3] transition-all duration-300">
              <img
                src={article.src}
                alt={article.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-purple-900/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <span className="bg-white/90 backdrop-blur-sm text-purple-900 px-4 py-2 rounded-full font-medium text-sm shadow-sm">
                    Preview
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modern Lightbox with Sliding Animation */}
      <AnimatePresence custom={direction}>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center will-change-transform"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button - Dark background for visibility */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all duration-200 shadow-lg border border-white/10 hover:scale-110 active:scale-95 hover:rotate-90"
            >
              <X size={24} className="sm:w-8 sm:h-8" />
            </button>

            {/* Navigation Buttons - Always visible, dark background for contrast */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all duration-200 shadow-lg border border-white/10 hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all duration-200 shadow-lg border border-white/10 hover:scale-110 active:scale-95"
            >
              <ChevronRight size={24} className="sm:w-8 sm:h-8" />
            </button>

            {/* Image Container - Constrained height to avoid touching edges */}
            <div
              className="relative w-full max-w-5xl h-full max-h-[85vh] p-4 flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={ARTICLES[selectedIndex].id}
                  src={ARTICLES[selectedIndex].src}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: {
                      type: "tween",
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                    opacity: { duration: 0.3, ease: "easeInOut" },
                  }}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl will-change-transform"
                  alt="Full preview"
                  loading="eager"
                />
              </AnimatePresence>
            </div>

            {/* Counter - Dark background with backdrop blur */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-white/90 text-sm font-medium border border-white/10 shadow-lg">
              {selectedIndex + 1} / {ARTICLES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
