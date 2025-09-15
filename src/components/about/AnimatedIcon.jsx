// src/components/about/AnimatedIcon.jsx
import React from "react";
import { rgba, SECONDARY, PRIMARY } from "./Theme";

/**
 * Circular hero image with concentric, rotating rings.
 * - Image always fills a circle (object-cover + overflow-hidden)
 * - Rings "stick" to the circle (same inset / radius)
 * - Scales nicely from mobile to desktop
 */
const AnimatedIcon = ({ src = "/assets/about-1.jpg", alt = "About" }) => {
  return (
    <div className="relative mx-auto aspect-square w-[22rem] sm:w-[28rem] lg:w-[34rem]">
      {/* soft glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: rgba(SECONDARY, 0.2) }}
      />

      {/* outer rotating ring */}
      <div
        className="absolute inset-0 rounded-full border-2"
        style={{
          borderColor: rgba(SECONDARY, 0.35),
          borderTopColor: "transparent",
          animation: "spin 16s linear infinite",
        }}
      />

      {/* inner rotating ring (reverse) */}
      <div
        className="absolute inset-3 sm:inset-4 rounded-full border-2"
        style={{
          borderColor: rgba(SECONDARY, 0.22),
          borderRightColor: "transparent",
          animation: "spinReverse 20s linear infinite",
        }}
      />

      {/* core circle (image fills perfectly) */}
      <div
        className="absolute inset-6 sm:inset-7 rounded-full overflow-hidden shadow-2xl ring-1"
        style={{ boxShadow: `0 20px 50px -12px ${rgba(SECONDARY, 0.25)}`, borderColor: rgba(SECONDARY, 0.12) }}
      >
        {/* subtle radial wash so edges don't look harsh */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 50%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* orbiting dots that follow the circle */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: "spin 10s linear infinite" }}
      >
        <span
          className="absolute w-3 h-3 rounded-full"
          style={{ right: 0, backgroundColor: PRIMARY }}
        />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: "spinReverse 12s linear infinite" }}
      >
        <span
          className="absolute w-2.5 h-2.5 rounded-full opacity-80"
          style={{ left: 0, backgroundColor: PRIMARY }}
        />
      </div>

      {/* local keyframes */}
      <style>{`
        @keyframes spin { from { transform: rotate(0) } to { transform: rotate(360deg) } }
        @keyframes spinReverse { from { transform: rotate(360deg) } to { transform: rotate(0) } }
      `}</style>
    </div>
  );
};

export default AnimatedIcon;
