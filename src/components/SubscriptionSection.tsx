import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GOOGLE_FORM_URL } from "../config/constants";

export default function SubscriptionSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-purple-400/20 to-purple-500/10 rounded-3xl blur-3xl" />

        <div className="relative bg-white rounded-3xl shadow-xl shadow-purple-900/5 overflow-hidden border border-purple-100">
          <div className="p-8 text-center bg-gray-50 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800">
              Join the PROchure Community
            </h3>
            <p className="text-gray-500 mt-2">
              Fill out the form below to activate your membership instantly.
            </p>
          </div>

          <div className="w-full h-[600px] sm:h-[700px] bg-white relative">
            <iframe
              src={GOOGLE_FORM_URL}
              className="w-full h-full border-0"
              title="Subscription Form"
            >
              Loading...
            </iframe>
          </div>

          <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              Having trouble loading? Open form in new tab{" "}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
