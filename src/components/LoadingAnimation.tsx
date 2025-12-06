import { getAssetPath } from "../helper/helper";
import { motion } from "framer-motion";

export default function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="loading-screen"
    >
      <div className="loading-container">
        {/* Icon/Logo */}
        {/* use the "proicon.png" */}
        <img
          src={getAssetPath("/proicon.png")}
          alt="PROchure"
          width={100}
          className="loading-logo"
        />

        {/* Title with ® symbol */}
        <span className="loading-title relative">
          PROchure
          <span
            style={{
              fontSize: "0.4em",
              position: "absolute",
              top: "20px",
              right: "-35px",
            }}
          >
            ®
          </span>
        </span>

        {/* Strike-through animation */}
        {/* <div className="strike-animation"></div> */}

        {/* Subtitle 1 */}
        <span className="loading-subtitle1">an E-Brochure of</span>

        {/* Subtitle 2 */}
        <span className="loading-subtitle2">
          Professional Services and Products
        </span>

        {/* Subtitle 3 */}
        <span className="loading-subtitle3">a global app from INDIA</span>

        {/* Subtitle 4 with Monotype */}
        <span className="loading-subtitle4">
          a <span className="monotype-text">Vipar</span> product
        </span>
      </div>

      {/* Footer */}
      <div className="loading-footer">
        Designed and Powered by
        <br />
        <span className="monotype-text">Vipar</span>&nbsp;CONNECT
      </div>
    </motion.div>
  );
}
