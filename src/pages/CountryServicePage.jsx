import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import RichText from "../common/RichTextLink";

/* ---------- helpers ---------- */
const A = (v) => (Array.isArray(v) ? v : []);
const O = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : {});
const T = (v) => (typeof v === "string" ? v : v?.title ?? "");
const nonEmpty = (s) => typeof s === "string" && s.trim().length > 0;

/* ---------- flag/hero per country (adjust paths) ---------- */
const META = {
  saudi:   { flag: "/icons/saudi.png",   hero: "/assets/saudi.jpg"   },
  bahrain: { flag: "/icons/bahran.png",  hero: "/assets/bahrain.jpg" },
  uae:     { flag: "/icons/uae3.png",    hero: "/assets/uae.jpg"     },
};

/* ---------- small card used in “Sub-Sectors” ---------- */
function SubCard({ title, k, onClick }) {
  const { i18n } = useTranslation();
  const dir = i18n.dir();

  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={() => onClick(k)}
      dir={dir}
      className="w-full text-start rounded-2xl overflow-hidden shadow-md bg-white/90 border"
      style={{ borderColor: "rgba(0,0,0,.08)" }}
    >
      <div className="p-4 sm:p-5">
        <div className="text-xl font-extrabold text-slate-900">{title}</div>
        <div className="mt-1 text-slate-600 text-sm text-start">{i18n.dir() === "rtl" ? "اقرأ المزيد ←" : "Read more →"}</div>
      </div>
    </motion.button>
  );
}

/* ---------- map your i18n into sector sections/opportunities ---------- */
function useCountryContent(country, t) {
  const S = O(t("services.saudi",   { returnObjects: true, defaultValue: {} }));
  const B = O(t("services.bahrain", { returnObjects: true, defaultValue: {} }));
  const U = O(t("services.uae",     { returnObjects: true, defaultValue: {} }));

  return useMemo(() => {
    const src = country === "saudi" ? S : country === "bahrain" ? B : U;

    // Title/intro
    const title = T(src.heading) || T(t(`services.country.${country}`));
    const introTitle = T(src?.sector?.introTitle) ||
      (country === "saudi"
        ? "The investment landscape in Saudi Arabia"
        : country === "bahrain"
        ? "Why Bahrain?"
        : "Why the UAE?");
    const introText =
      T(src?.sector?.introText) ||
      T(src?.intro) ||
      t("services.defaultIntro", {
        defaultValue:
          "A dynamic market with robust infrastructure, competitive incentives, and clear regulation.",
      });

    /* ---- Sub-sections
       Prefer services.<country>.sector.sections: [{id,title,desc,bullets?}]
       Fallbacks for your current structures are provided.
    ---- */
    let sections = A(src?.sector?.sections);

    if (!sections.length) {
      if (country === "saudi") {
        // Use your existing SA keys as “sections”
        sections = [
          { id: "foreign",       title: T(S?.foreign?.title),       bullets: A(S?.foreign?.points) },
          { id: "withPartner",   title: T(S?.withPartner?.title),   bullets: A(S?.withPartner?.requirements) },
          { id: "premium",       title: T(S?.premium?.title),       desc: T(S?.premium?.text) },
          { id: "localGCC",      title: T(S?.localGCC?.title),      bullets: A(S?.localGCC?.items) },
          { id: "companyTypes",  title: T(S?.companyTypes?.heading) },
          { id: "licenses",      title: T(S?.licenses?.heading) },
        ].filter(s => nonEmpty(s.title));
      } else if (country === "bahrain") {
        // Map the Bahrain long sections you provided
        const BH = B;
        sections = [
          { id:"howTo",        title: T(BH?.howToTitle || "How to Establish a Company in Bahrain for Foreigners"), bullets: A(BH?.howToSteps) },
          { id:"requirements", title: T(BH?.requirementsTitle || "Requirements Based on Investor Type"), sub: A(BH?.requirementsByType) },
          { id:"incentives",   title: T(BH?.incentivesTitle  || "Government Incentives and Support"),    bullets: A(BH?.incentives) },
          { id:"advantages",   title: T(BH?.advantagesTitle  || "Advantages of Establishing a Company in Bahrain for Foreigners"), bullets: A(BH?.advantages) },
          { id:"challenges",   title: T(BH?.challengesTitle  || "Challenges Foreigners May Face"),       bullets: A(BH?.challenges) },
          { id:"investorVisa", title: T(BH?.visaTitle        || "Investor Visa in Bahrain"),             bullets: A(BH?.visaRequirements) },
          { id:"platforms",    title: T(BH?.platformsTitle   || "Key Platforms and Support Services"),   bullets: A(BH?.platforms) },
        ].filter(s => nonEmpty(s.title));
      } else {
        // UAE simple items
        sections = A(U?.items).map((it, i) => ({
          id: `uae-${i}`,
          title: T(it?.title ?? it),
          desc:  T(it?.desc ?? ""),
          bullets: A(it?.bullets),
        })).filter(s => nonEmpty(s.title));
      }
    }

    /* ---- Opportunities (sidebar) ----
       Prefer services.<country>.sector.opportunities: [{title,desc?}]
       Fallback: first N section titles become quick links.
    ---- */
    let opportunities = A(src?.sector?.opportunities);
    if (!opportunities.length) {
      opportunities = sections.slice(0, 6).map(s => ({ title: T(s.title), anchor: s.id }));
    }

    return { title, introTitle, introText, sections, opportunities };
  }, [country, S, B, U, t]);
}

/* ---------- main component ---------- */
export default function CountrySectorPage({ country = "saudi" }) {
  const { i18n, t } = useTranslation();
  const dir = i18n.dir();
  const nav = useNavigate();
  const meta = META[country] || {};
  const { title, introTitle, introText, sections, opportunities } = useCountryContent(country, t);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative" dir="ltr">
      {/* HERO */}
      <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${meta.hero || "/assets/hero.jpg"}")` }}
        />
        <div className="absolute inset-0 bg-[#0b4336]/65 mix-blend-multiply" />
        <div className="absolute inset-0"
             style={{ background: "linear-gradient(to bottom right, rgba(0,0,0,.15), rgba(0,0,0,.35))" }} />
        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-end justify-between pb-6">
          <div>
            {/* Breadcrumbs */}
            <nav className="text-white/80 text-xs sm:text-sm mb-1">
              <Link to="/" className="hover:underline">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/services" className="hover:underline">{t("nav.services", {defaultValue:"Services"})}</Link>
              <span className="mx-2">›</span>
              <span className="font-medium">{title}</span>
            </nav>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black">{title}</h1>
            <div className="mt-1 text-white/80">{t("services.sectorTag", { defaultValue: "Investment Sector" })}</div>
          </div>
          {meta.flag && (
            <img src={meta.flag} alt="" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg" />
          )}
        </div>
      </div>

      {/* INTRO */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
            {introTitle}
          </h2>
          <p className="text-slate-700 leading-relaxed" dir={dir}>
            <RichText text={introText} />
          </p>
        </div>
      </div>

      {/* BODY: left sub-sectors / right opportunities */}
      <div className="max-w-7xl mx-auto px-6 pb-12 grid lg:grid-cols-[1fr_360px] gap-10">
        {/* LEFT */}
        <div>
          <h3 className="text-2xl font-black text-slate-900 mb-4">
            {t("services.subSectors", { defaultValue: "Sub-Sectors" })}
          </h3>

          {/* Sub-sector cards */}
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {sections.map((s) => (
              <SubCard key={s.id} title={T(s.title)} k={s.id} onClick={scrollTo} />
            ))}
          </div>

          {/* Section detail blocks */}
          <div className="space-y-10" dir={dir}>
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  <RichText text={T(s.title)} />
                </h4>

                {nonEmpty(s.desc) && (
                  <p className="mt-3 text-slate-700">
                    <RichText text={T(s.desc)} />
                  </p>
                )}

                {/* bullets */}
                {A(s.bullets).length > 0 && (
                  <ul className="mt-4 space-y-2 list-disc ps-5">
                    {s.bullets.map((b, i) => (
                      <li key={i}><RichText text={T(b)} /></li>
                    ))}
                  </ul>
                )}

                {/* nested groups (for “Requirements by type” style) */}
                {A(s.sub).length > 0 && (
                  <div className="mt-5 space-y-5">
                    {s.sub.map((grp, i) => (
                      <div key={i} className="rounded-xl border bg-white p-4"
                           style={{ borderColor: "rgba(0,0,0,.08)" }}>
                        <div className="font-semibold mb-2">{T(grp.title || grp.type)}</div>
                        {nonEmpty(grp.desc) && <p className="text-slate-700 mb-2"><RichText text={T(grp.desc)} /></p>}
                        {A(grp.bullets).length > 0 && (
                          <ul className="list-disc ps-5 space-y-1">
                            {grp.bullets.map((b, j) => <li key={j}><RichText text={T(b)} /></li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* RIGHT: Opportunities */}
        <aside className="lg:sticky lg:top-20 h-max">
          <h3 className="text-2xl font-black text-slate-900 mb-4">
            {t("services.opportunities", { defaultValue: "Investment Opportunities" })}
          </h3>
          <div className="space-y-3">
            {A(opportunities).map((o, i) => (
              <div key={i} className="rounded-xl border bg-white p-4"
                   style={{ borderColor: "rgba(0,0,0,.08)" }}>
                <div className="font-semibold text-slate-900">
                  <RichText text={T(o.title)} />
                </div>
                {nonEmpty(o.desc) && (
                  <div className="text-slate-700 text-sm mt-1">
                    <RichText text={T(o.desc)} />
                  </div>
                )}
                {/* If “anchor” provided, scroll to that section */}
                {o.anchor ? (
                  <button
                    className="mt-3 text-[#016c37] font-semibold"
                    onClick={() => {
                      const el = document.getElementById(o.anchor);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    Explore →
                  </button>
                ) : (
                  <Link to="/#contact" className="mt-3 inline-block text-[#016c37] font-semibold">
                    Talk to us →
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 rounded-2xl border bg-white p-5 text-center"
               style={{ borderColor: "rgba(0,0,0,.08)" }}>
            <div className="font-semibold mb-2">{t("services.ctaTitle", { defaultValue: "Need guidance?" })}</div>
            <p className="text-slate-700 text-sm mb-3">
              {t("services.ctaText", {
                defaultValue: "Our team can help you choose the right structure and get licensed fast.",
              })}
            </p>
            <button
              onClick={() => nav("/#contact")}
              className="px-5 py-2.5 rounded-xl text-white font-semibold"
              style={{ backgroundColor: "#016c37" }}
            >
              {t("services.ctaBtn", { defaultValue: "Contact Us" })}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
