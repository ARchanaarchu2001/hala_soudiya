// src/sections/AboutSection.jsx
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import MissionVisionSimple from "../components/about/MissionVisionSimple";
import ExpertiseList from "../components/about/ExpertiseList";
import SplitHeading from "../components/about/SplitHeading";
import StatsRow from "../components/about/StatsRow";
import RichText from "../components/common/RichTextLink";
import { TEXT } from "../components/about/Theme";

const GREEN = "#000000";

/* ---- Motion variants ---- */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState({});
  const dir = i18n.dir();
  const lang = i18n.language || "en";
  const isRTL = dir === "rtl";

  const headingText1 = t("about.heading1", { defaultValue: t("about.heading", { defaultValue: "" }) });
  const headingText2 = t("about.heading2", { defaultValue: "" });
  const badge = t("about.badge", { defaultValue: isRTL ? "عن مكتبنا" : "ABOUT OUR FIRM" });

  const desc1 = t("about.description1", { defaultValue: t("about.p1", { defaultValue: "" }) });
  const desc2 = t("about.description2", { defaultValue: "" });

  const expertiseItems = t("about.expertise.items", { returnObjects: true }) || [];

  // observe once (optional; used for a tiny fade on the section group)
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setIsVisible((p) => ({ ...p, [e.target.id]: e.isIntersecting })));
      },
      { threshold: 0.25 }
    );
    document.querySelectorAll('[data-observe="true"]').forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  /* ---- Parallax / tilt for the hero image ---- */
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"], // starts when image enters, ends when it leaves
  });
  const y = useTransform(scrollYProgress, [0, 1], [26, -26]);       // vertical parallax
  const rotate = useTransform(scrollYProgress, [0, 1], [0.8, -0.8]); // subtle tilt
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.0]);  // slight shrink on scroll

  return (
    // 🔒 Lock overall layout to LTR so columns never flip
    <main
      id="about"
      dir="ltr"
      className="relative bg-[#f5f0eb]"
      style={{ scrollMarginTop: "var(--nav-safe, 8rem)", ["--text"]: TEXT }}
    >
  {/* ===== Expertise list (your component already supports animation if added) ===== */}
      <ExpertiseList items={expertiseItems} />

       {/* ===== Mission & Vision (image cards with hover reveal) ===== */}
      <MissionVisionSimple />


      {/* ===== Top: text left, image right ===== */}
      <div className="max-w-7xl mx-auto px-6 py-14 sm:py-20">
        <motion.div
          className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center"
          data-observe="true"
          id="top-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={container}
        >
          {/* Left Copy (text direction & alignment follow language) */}
          <div dir={dir} className={isRTL ? "text-right" : "text-left"}>
            <motion.div variants={fadeUp}>
              <div
                className={`inline-flex px-4 py-2 rounded-full border mb-5 ${isRTL ? "ml-auto" : "mr-auto"}`}
                style={{ borderColor: "rgba(1,108,55,.25)", color: GREEN, backgroundColor: "rgba(1,108,55,.06)" }}
              >
                <span className="text-xs sm:text-sm font-medium">{badge}</span>
              </div>
            </motion.div>

            {/* Animate the headings as one block to keep SplitHeading intact */}
            <motion.div variants={fadeUp}>
             
              <SplitHeading top={headingText1} bottom={headingText2} color={GREEN} dir={dir} align={isRTL ? "end" : "start"}  />
              
            </motion.div>

            <motion.div className="mt-5 space-y-5">
              {desc1 && (
                <motion.p variants={fadeUp} className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  <RichText text={desc1} />
                </motion.p>
              )}
              {desc2 && (
                <motion.p variants={fadeUp} className="text-gray-600 text-base leading-relaxed">
                  {desc2}
                </motion.p>
              )}
            </motion.div>

            {/* Stats under copy */}
            <motion.div className="mt-8" variants={fadeUp}>
              <StatsRow t={t} lang={lang} />
            </motion.div>
          </div>

          {/* Right Image (always on the right) */}
          <motion.div
            ref={imgRef}
            style={{ y, rotateZ: rotate, scale }}
            variants={fade}
            className="relative"
          >
            <div className="relative overflow-hidden shadow-xl ring-1 ring-black/5">
              {/* the actual image, with the clipped corner */}
              <img
                src="/assets/about-2.jpg"
                alt={isRTL ? "الرياض" : "Riyadh skyline"}
                className="w-full h-[30rem] object-cover will-change-transform"
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 88%, 0% 0%)",
                  WebkitClipPath:
                    "polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 88%, 0% 0%)",
                }}
              />

              {/* breathing vignette for depth */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0.18 }}
                animate={{ opacity: [0.18, 0.28, 0.18] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                style={{
                  background:
                    "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.25) 100%)",
                }}
              />

              {/* soft diagonal shine that sweeps once on reveal */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ x: "-120%" }}
                whileInView={{ x: "120%" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{
                  background:
                    "linear-gradient(75deg, transparent 0%, rgba(255,255,255,.35) 50%, transparent 100%)",
                  mixBlendMode: "soft-light",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

     
      

     
    </main>
  );
};

export default AboutSection;
