import {
  useState,
  useEffect,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ARTICLES } from "../config/constants";

export default function ArticleGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const collageConfig = [
    { gridArea: "1 / 1 / 2 / 3" }, // Image 1: Wide (2 cols × 1 row)
    { gridArea: "1 / 3 / 2 / 4" }, // Image 2: Square (1 col × 1 row)
    { gridArea: "2 / 1 / 3 / 2" }, // Image 3: Square (1 col × 1 row)
    { gridArea: "2 / 2 / 3 / 4" }, // Image 4: Wide (2 cols × 1 row)
    { gridArea: "3 / 1 / 4 / 2" }, // Image 5: Square (1 col × 1 row)
    { gridArea: "3 / 2 / 4 / 4" }, // Image 6: Wide (2 cols × 1 row)
  ];

  return (
    <>
      {/* Collage Grid - Reduced size on desktop, optimized for horizontal images */}
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <div
          className="grid gap-2 sm:gap-3 md:gap-4"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, auto)",
          }}
        >
          {ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => {
                setSelectedIndex(index);
                setDirection(0);
              }}
              className="group cursor-pointer relative"
              style={{ gridArea: collageConfig[index].gridArea }}
            >
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:shadow-prochure-bg/20 bg-gray-50 transition-all duration-300 h-full">
                {/* Image with object-contain to show full image without cropping */}
                <img
                  src={article.src}
                  alt={article.alt}
                  className="w-full h-full object-contain p-1 sm:p-2 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-prochure-bg/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="bg-prochure-bg backdrop-blur-sm text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full font-medium text-xs sm:text-sm shadow-sm">
                      Preview
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedIndex !== null && (
        <ImagePreview
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          direction={direction}
          setDirection={setDirection}
        />
      )}
    </>
  );
}
/**
 * Image Preview component with sliding animation
 */
function ImagePreview({
  selectedIndex,
  setSelectedIndex,
  direction,
  setDirection,
}: {
  selectedIndex: number | null;
  setSelectedIndex: Dispatch<SetStateAction<number | null>>;
  direction: number;
  setDirection: Dispatch<SetStateAction<number>>;
}) {
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
    <AnimatePresence custom={direction}>
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center will-change-transform"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button  */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 bg-prochure-bg/50 hover:bg-prochure-bg/70 backdrop-blur-sm rounded-full text-white transition-all duration-200 shadow-lg border border-white/10 hover:scale-110 active:scale-95 hover:rotate-90"
          >
            <X size={24} className="sm:w-8 sm:h-8" />
          </button>

          {/* Navigation Buttons - Always visible, dark background for contrast */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="cursor-pointer absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 bg-prochure-bg/50 hover:bg-prochure-bg/70 backdrop-blur-sm rounded-full text-white transition-all duration-200 shadow-lg border border-white/50 hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="cursor-pointer absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 bg-prochure-bg/50 hover:bg-prochure-bg/70 backdrop-blur-sm rounded-full text-white transition-all duration-200 shadow-lg border border-white/50 hover:scale-110 active:scale-95"
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-prochure-bg/50 backdrop-blur-md px-4 py-1.5 rounded-full text-white/90 text-sm font-medium border border-white/10 shadow-lg">
            {selectedIndex + 1} / {ARTICLES.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
