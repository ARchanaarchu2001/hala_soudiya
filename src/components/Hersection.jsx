// src/components/Hersection.jsx
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { regionKeyFrom, openServices } from "../utils/region";

// Palette
const CREAM = "#f5f0eb"; // requested color
const CREAM_12 = "rgba(245, 240, 235, 0.12)";
const CREAM_18 = "rgba(245, 240, 235, 0.18)";
const CREAM_20 = "rgba(245, 240, 235, 0.20)";
const CREAM_28 = "rgba(245, 240, 235, 0.28)";

export default function Hersection() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  // i18n content
  const badge = t("hero.badge", {
    defaultValue:
      "Certified legal & documentation service provider for Saudi Arabia and Bahrain",
  });

  const titleLines = useMemo(
    () =>
      t("hero.titleLines", {
        returnObjects: true,
        defaultValue: [
          "Certified Legal & Documentation",
          "Service Provider in Saudi Arabia & Bahrain",
        ],
      }) || [],
    [t, i18n.language]
  );

  const leadTitle = t("hero.leadTitle", {
    defaultValue: "Achieve Your Vision and Establish Your Company",
  });

  const regions =
    t("hero.regions", {
      returnObjects: true,
      defaultValue: ["Saudi Arabia", "Bahrain", "United Arab Emirates"],
    }) || [];

  const goTo = (label) => {
    const key = regionKeyFrom(label, i18n);
    openServices(key);
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", "#services");
  };

  return (
    <section
      id="home"
      dir="ltr" // keep layout steady; only text aligns per language
      className="relative w-full overflow-hidden md:pt-0 pt-[calc(var(--nav-safe)+4px)] min-h-[100svh] md:min-h-screen"
     
    >
      {/* === Background video === */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="/assets/hero-org.mp4"
      />

      {/* Readability gradient (top/bottom dark) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.25) 35%, rgba(0,0,0,.35) 100%)",
        }}
      />

      {/* Soft CREAM tint for brand feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: CREAM,
          mixBlendMode: "soft-light",
          opacity: 0.22,
        }}
      />

      {/* Very subtle vignette for focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,.22) 100%)",
        }}
      />

      {/* === Content over video === */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 ">
        <div
          className=" min-h-[calc(100vh-72px)] flex flex-col items-center justify-center   text-center "
          dir={dir}
         
        >
          {/* Badge */}
          {badge && (
            <div >
              <span
                className="inline-block px-4 py-2  rounded-full backdrop-blur-md text-xs sm:text-sm  text-center max-w-[92vw] whitespace-normal break-words"
                style={{
                  color: CREAM,
                  border: `1px solid ${CREAM_28}`,
                  backgroundColor: CREAM_12,
                }}
              >
                {badge}
              </span>
            </div>
          )}

          {/* Title (multi-line) */}
          <h1
            className="mt-5 font-extrabold leading-tight whitespace-pre-wrap"
            style={{
              color: CREAM,
              fontSize: "clamp(2.2rem, 4.2vw, 4rem)",
              textShadow: "0 8px 28px rgba(0,0,0,0.35)",
            }}
          >
            {(titleLines && titleLines.length
              ? titleLines
              : [
                  "Certified Legal & Documentation",
                  "Service Provider in Saudi Arabia & Bahrain",
                ]
            ).join("\n")}
          </h1>

          {/* Lead subheading */}
          {leadTitle && (
            <p
              className="mt-4 max-w-3xl font-semibold"
              style={{
                color: CREAM,
                fontSize: "clamp(1.05rem, 1.4vw, 1.35rem)",
                textShadow: "0 4px 18px rgba(0,0,0,0.35)",
                opacity: 0.95,
              }}
            >
              {leadTitle}
            </p>
          )}


          {/* Regions hide */}

          {/* Region buttons */}
          {/* {regions.length > 0 && (
            <div
              className={`mt-6 flex flex-wrap gap-3 ${
                isRTL ? "justify-start" : "justify-start"
              }`}
              dir="ltr"
            >
              {regions.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(r)}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full transition"
                  style={{
                    color: CREAM,
                    border: `1.2px solid ${CREAM_20}`,
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = CREAM_12;
                    e.currentTarget.style.borderColor = CREAM_28;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = CREAM_20;
                  }}
                >
                  <span className="font-semibold">{r}</span>
                </button>
              ))}
            </div>
          )} */}

        </div>
      </div>
    </section>
  );
}
