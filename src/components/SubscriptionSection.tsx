import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
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
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-prochure-bg/20 via-prochure-bg/30 to-prochure-bg/20 rounded-3xl blur-3xl animate-pulse" />

        <div className="relative bg-white rounded-3xl shadow-2xl shadow-prochure-bg/10 overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-prochure-bg via-prochure-bg to-[#3d2835] opacity-95" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative p-8 sm:p-12 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6"
              >
                <img src="/PROchure-sales/proicon.png" alt="PRO Icon" className="max-w-full h-7" />
              </motion.div>

              <h3 className="text-3xl sm:text-4xl font-bold mb-3">
                Join the PROchure Community
              </h3>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                and “Be a PRO !”<br />to showcase your talent, your services portfolio, your product catalogues” on an exclusive and dedicated business-oriented professional-networking platform
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="p-8 sm:p-12 bg-gradient-to-b from-gray-50 to-white">
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Global Exposure", desc: "Showcase your business to a worldwide audience" },
                { title: "Industry Group Creation", desc: "Form and join industry-specific groups" },
                { title: "Manage up to 20 business profiles", desc: "Handle multiple businesses from one account." },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-prochure-bg hover:bg-[#3d2835] text-white font-semibold text-lg rounded-2xl shadow-lg shadow-prochure-bg/30 hover:shadow-xl hover:shadow-prochure-bg/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Complete Subscription Form</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              <p className="text-sm text-gray-500 mt-4">
                Opens in a new tab • Takes less than 2 minutes
              </p>
            </motion.div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>
                Secure form powered by Google • Your data is protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
