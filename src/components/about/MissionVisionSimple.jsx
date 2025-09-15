import React from "react";
import { useTranslation } from "react-i18next";

const GREEN = "#000000";
const GOLD  = "#d4af37";

// beveled lower-right corner (optional)
const CLIP = "polygon(0% 0%, 100% 0%, 100% 82%, 85% 100%, 0% 100%, 0% 0%)";

function HoverCard({ img, title, text, color, alt, textDir }) {
  return (
    <article
      className="group relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5"
      style={{ borderRadius: 16 }}
    >
      {/* Image only by default */}
      <img
        src={img}
        alt={alt || title}
        className="w-full h-[260px] sm:h-[320px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ clipPath: CLIP, WebkitClipPath: CLIP }}
      />

      {/* Darken layer on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,.7) 0%, rgba(0,0,0,.35) 45%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Text (appears only on hover/focus) */}
      <div className="absolute inset-0 p-5 sm:p-6 flex items-end" dir={textDir}>
        <div
          className="
            w-full
            translate-y-4 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            group-focus-within:translate-y-0 group-focus-within:opacity-100
            transition-all duration-400 ease-out
          "
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
            {title}
          </h3>
          <div
            className="h-1 w-16 rounded-full mb-3"
            style={{ backgroundColor: color }}
          />
          <p className="text-white/90 leading-relaxed">{text}</p>
        </div>
      </div>
    </article>
  );
}

export default function MissionVisionSimple() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(); // "ltr" | "rtl"
  const isRTL = dir === "rtl";

  // Section header texts (always visible)
  const commitmentLabel = t("about.commitment", {
    defaultValue: isRTL ? "التزامنا" : "Our Commitment",
  });
  const missionWord = t("about.missionHeading", {
    defaultValue: isRTL ? "الرسالة" : "Mission",
  });
  const visionWord = t("about.visionHeading", {
    defaultValue: isRTL ? "الرؤية" : "Vision",
  });
  const sectionHeading = t("about.mvHeading", {
    defaultValue: `${missionWord} & ${visionWord}`,
  });

  // Card hover texts (visible on hover only)
  const missionText = t("about.missionText", {
    defaultValue:
      "We deliver fast, reliable legal & documentation services that help businesses set up and grow with confidence across the GCC.",
  });
  const visionText = t("about.visionText", {
    defaultValue:
      "To be the most trusted partner for company formation and expansion in the region—efficient, transparent, and client-centric.",
  });

  return (
    // 🔒 Lock layout to LTR so card order NEVER flips in Arabic
    <section className="bg-[#f8f8f8]" dir="ltr">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        {/* SECTION HEADER — always visible */}
        <div className="text-center mb-8 sm:mb-12" dir={dir}>
          <span
            className="inline-block px-4 py-2 rounded-full border text-xs sm:text-sm font-medium mb-4"
            style={{
              color: GREEN,
              borderColor: "rgba(1,108,55,.25)",
              backgroundColor: "rgba(1,108,55,.06)",
            }}
          >
            {commitmentLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: GREEN }}>
            {sectionHeading}
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid gap-8 lg:grid-cols-2 justify-items-center">
          <HoverCard
            img="/assets/mission1.jpg"
            alt={missionWord}
            title={missionWord}
            text={missionText}
            color={GOLD}
            textDir={dir}
          />
          <HoverCard
            img="/assets/vision1.jpg"
            alt={visionWord}
            title={visionWord}
            text={visionText}
            color={GOLD}
            textDir={dir}
          />
        </div>
      </div>
    </section>
  );
}
