import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import RichText from "../common/RichTextLink";

const GREEN = "#000000";
const GOLD  = "#000000";

const hexToRgba = (hex, a = 1) => {
  const h = hex.replace("#", "");
  const f = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const n = parseInt(f, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// framer-motion variants
const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.6 },
  },
};

export default function ExpertiseList({ items = [], accentColors = [GREEN, GOLD] }) {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const heading = t("about.expertise.heading", {
    defaultValue: dir === "rtl" ? "الخبرات" : "Expertise",
  });

  const rows = (items || []).map((it) => (typeof it === "string" ? { title: it } : it));

  return (
    // 🔒 Lock layout LTR so order never flips; text inside still uses `dir`
    <section className="" dir="ltr">
      <div className="max-w-7xl mx-auto px-6 pb-10 sm:pb-14 py-5">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
          className={`text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 ${
            dir === "rtl" ? "text-right" : "text-left"
          }`}
          style={{ color: "#000000"}}
          dir={dir}
        >
          {heading}
        </motion.h2>

        <motion.div
          className="grid gap-6 lg:grid-cols-2"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {rows.map((row, idx) => {
            const accent = row.accent || accentColors[idx % accentColors.length];
            const border = hexToRgba(accent, 0.18);

            return (
              <motion.article
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="group relative rounded-xl border bg-white p-5 sm:p-6 shadow-sm"
                style={{ borderColor: border }}
                dir={dir} // text direction only
              >
                {/* Accent bar (stays on the right; widens on hover) */}
                <div
                  className="absolute right-0 top-0 h-full w-2 rounded-r-xl transition-all duration-300 group-hover:w-3"
                  style={{ backgroundColor: accent }}
                />

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 leading-snug">
                    <RichText text={row.title} />
                  </h3>

                  {row.href && (
                    <a
                      href={row.href}
                      className="px-3 py-1.5 rounded-full border text-sm transition-colors hover:bg-gray-50"
                      style={{ borderColor: hexToRgba(accent, 0.25), color: accent }}
                    >
                      {t("about.expertise.cta", {
                        defaultValue: dir === "rtl" ? "صفحة الفرصة" : "Opportunity Page",
                      })}
                    </a>
                  )}
                </div>

                {!!row.meta && (
                  <div className="mt-2 text-sm text-gray-500">
                    <RichText text={row.meta} />
                  </div>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
