// src/components/services/CountryTitle.jsx
import React from "react";

const hexA = (hex, a = 0.45) => {
  try {
    const [r, g, b] = hex.replace("#", "").match(/.{1,2}/g).map((x) => parseInt(x, 16));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } catch {
    return `rgba(0,0,0,${a})`;
  }
};

export default function CountryTitle({
  title,
  label,
  bgSrc,
  overlay = "#000000",
  onClick,
}) {
  return (
    <button onClick={onClick} className="group w-full text-left">
      <div className="relative w-full h-[420px] overflow-hidden ">
        <img
          src={bgSrc}
          alt={label || title}
          className="absolute inset-0 w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* overlay tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${hexA(overlay, 0.18)} 0%, ${hexA(
              overlay,
              0.55
            )} 100%)`,
          }}
        />

        {/* optional very soft inner border */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-black/5 rounded-lg" />
      </div>

      <div className="mt-4 text-center">
        <div
          className="h-px w-20 mx-auto"
          style={{ backgroundColor: hexA(overlay, 0.45) }}
        />
        <h3 className="mt-2 font-semibold">{title || label}</h3>
      </div>
    </button>
  );
}
