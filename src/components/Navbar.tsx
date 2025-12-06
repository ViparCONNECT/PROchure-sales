import { motion } from "framer-motion";
import { useState } from "react";
import { Volume2 } from "lucide-react";
import { getAssetPath } from "../helper/helper";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-prochure-bg shadow-lg shadow-black/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-3 w-fit h-16 sm:h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 w-fit cursor-pointer"
          >
            {/* SVG Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              height="48"
              viewBox="0 0 906 258"
              // INCREASED: w-32 -> w-36 (mobile), sm:w-40 -> sm:w-48 (desktop)
              className="w-36 h-9 sm:w-48 sm:h-12"
            >
              <text
                className="fill-white font-bold"
                // Adjusted translate Y slightly to keep it centered with new size if needed,
                // but keeping your original coordinates usually works fine for small bumps.
                transform="translate(37 165) scale(1.172 1.069)"
                style={{
                  // INCREASED: 140px -> 160px
                  fontSize: "160px",
                }}
              >
                PROchure
                <tspan fontSize="0.5em" baselineShift="0.8em">
                  ®
                </tspan>
              </text>
            </svg>
          </motion.div>

          {/* Speaker Icon */}
          <div className="relative -left-1">
            <Speaker />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

/* Speaker Icon */
function Speaker() {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    try {
      if (!speaking) {
        setSpeaking(true);
        const audio = new Audio(getAssetPath("/audio/prochureNewVoice.mp3"));
        audio.play();
        audio.onended = () => setSpeaking(false);
      }
    } catch (error) {
      console.error("Audio playback error:", error);
      setSpeaking(false);
    }
  };

  return (
    <button
      onClick={handleSpeak}
      disabled={speaking}
      className="w-fit cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 disabled:opacity-50"
      aria-label="Play PROchure pronunciation"
    >
      <Volume2
        size={20}
        className="text-white w-6 h-6"
        style={{ filter: speaking ? "brightness(0.7)" : "brightness(1)" }}
      />
    </button>
  );
}
