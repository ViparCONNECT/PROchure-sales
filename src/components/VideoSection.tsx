import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20 bg-black border-4 border-white/50">
        <div className="relative aspect-video">
          {/* Replace src with your actual video */}
          <video
            controls
            className="w-full h-full object-cover"
            // poster="/articles/article-1.webp"
          >
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </motion.div>
  );
}
