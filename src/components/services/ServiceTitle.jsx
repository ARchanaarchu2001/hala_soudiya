// ServiceTitle.jsx
import React from "react";

/**
 * Props:
 * - title: string
 * - image: string
 * - icon?: string
 * - dir?: "ltr" | "rtl"
 * - onClick?: () => void
 */
export default function ServiceTitle({ title, image, icon, dir = "ltr", onClick }) {
  const titleSide = dir === "rtl" ? "right-6" : "left-6";
  const iconSide  = dir === "rtl" ? "left-6"  : "right-6";

  return (
    <button
      type="button"
      onClick={onClick}
      // use logical alignment; flips automatically with dir
      className="group block w-full text-start focus:outline-none"
    >
      <div className="relative w-full overflow-hidden rounded-md">
        {/* aspect ratio */}
        <div className="aspect-[4/3]" />

        {/* image */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          onError={(e) => { e.currentTarget.src = "/assets/saudi.jpg"; }}
        />

        {/* tint */}
        <div className="absolute inset-0 bg-[#102433]/60" />

        {/* title overlay */}
        <div dir={dir} className={`absolute top-6 ${titleSide} max-w-[85%] text-start`}>
          <h3 className="text-white font-extrabold leading-snug [text-wrap:balance] text-2xl md:text-[23px]">
            {title}
          </h3>
        </div>

        {/* icon in opposite corner */}
        {icon && (
          <div className={`absolute bottom-6 ${iconSide}`}>
            <img src={icon} alt="" className="w-8 h-8 object-contain filter invert drop-shadow" />
          </div>
        )}
      </div>

      {/* caption under tile */}
      <div dir={dir} className="mt-3">
        <div className="h-px w-24 mx-auto bg-black/15" />
        <div className="mt-2 font-semibold text-gray-900 text-start">{title}</div>
      </div>
    </button>
  );
}
