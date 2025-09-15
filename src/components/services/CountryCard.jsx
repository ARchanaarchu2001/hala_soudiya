import React from "react";
import { motion } from "framer-motion";

/**
 * Country card tile (image bg + tint + black hover + round flag)
 */
export default function CountryCard({
  label,
  bgSrc,
  flagSrc,
  overlay = "#0E4D41",
  onClick,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden shadow-xl text-left"
    >
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: bgSrc
            ? `url("${bgSrc}")`
            : "linear-gradient(135deg,#0f3d35,#0b332c)",
        }}
      />
      {/* tinted color wash */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ backgroundColor: overlay, opacity: 0.55 }}
      />
      {/* dark hover */}
      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col">
        <h3 className="text-white text-xl sm:text-2xl font-extrabold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {label}
        </h3>

        {flagSrc && (
          <img
            src={flagSrc}
            alt={`${label} flag`}
            className="absolute bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14  object-cover "
            style={{ border: "none", outline: "none" }}
          />
        )}
      </div>
    </motion.button>
  );
}
