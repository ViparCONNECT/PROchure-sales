import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 shadow-lg shadow-purple-900/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center h-16 sm:h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-purple-700 font-bold text-lg sm:text-xl">
                P
              </span>
            </div>
            <span className="text-white font-semibold text-lg sm:text-xl tracking-wide">
              PROchure
            </span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
