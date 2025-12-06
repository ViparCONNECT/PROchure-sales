import { motion } from "framer-motion";

interface SectionHeadingProps {
  number: string;
  title: string;
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 sm:mb-16"
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-500/30"
        >
          <span className="text-white font-bold text-xl sm:text-2xl">
            {number}
          </span>
        </motion.div>

        <div className="flex-1 pt-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            {title}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-1.5 bg-gradient-to-r from-purple-500/50 to-transparent mt-4 rounded-full max-w-md"
          />
        </div>
      </div>
    </motion.div>
  );
}
