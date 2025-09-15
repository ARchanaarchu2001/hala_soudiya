// src/pages/ServicesPage.jsx
import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Link } from "react-router-dom";

import CountryTitle from "../components/services/CountryTitle";
import PageHeading from "../components/services/PageHeading";
import ServiceTitle from "../components/services/ServiceTitle";

import { SERVICE_IMAGES, FIRST_TILE_OVERRIDE, SERVICE_ICONS } from "../utils/serviceImages";

const A = (v) => (Array.isArray(v) ? v : []);
const O = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : {});
const S = (v) => (typeof v === "string" ? v : v?.title ?? v?.name ?? "");

const BG = "#f5f0eb";

// Fixed country tiles
function buildCountryCards(t) {
  return [
    {
      key: "saudi",
      label: t("services.country.saudi", { defaultValue: "Saudi Arabia" }),
      bgSrc: "/assets/saudi-arabia.jpeg",
      flagSrc: "/icons/saudi.png",
      overlay: "#0c6b64",
    },
    {
      key: "bahrain",
      label: t("services.country.bahrain", { defaultValue: "Bahrain" }),
      bgSrc: "/assets/bahrain.jpg",
      flagSrc: "/icons/bahran.png",
      overlay: "#75516b",
    },
    {
      key: "uae",
      label: t("services.country.uae", { defaultValue: "United Arab Emirates" }),
      bgSrc: "/assets/uae1.jpg",
      flagSrc: "/icons/uae3.png",
      overlay: "#0e3a5a",
    },
  ];
}



// Guarantees 6 Saudi sections, with safe fallbacks if a translation key is empty
// const SAUDI_SECTIONS = [
//   { id: "foreign",        pick: (C) => O(C.foreign).title,        fallback: "For Foreign Investors" },
//   { id: "with-partner",   pick: (C) => O(C.withPartner).title,    fallback: "For Saudi/GCC with Foreign Partner" },
//   { id: "premium",        pick: (C) => O(C.premium).title,        fallback: "Saudi Premium Residency Program" },
//   { id: "local-gcc",      pick: (C) => O(C.localGCC).title,       fallback: "For Saudi and GCC Investors" },
//   { id: "company-types",  pick: (C) => O(C.companyTypes).heading, fallback: "Types of Companies" },
//   { id: "licenses",       pick: (C) => O(C.licenses).heading,     fallback: "Types of Investment Licenses" },
// ];

// function mapSaudiCards(C) {
//   return SAUDI_SECTIONS.map(({ id, pick, fallback }) => {
//     const raw = pick(C);
//     return { id, title: S(raw) || fallback };
//   });
// }



function mapSaudiCards(C) {
  const out = [];
  const F = O(C.foreign);
  if (F.title) out.push({ id: "foreign", title: S(F.title) });
  const WP = O(C.withPartner);
  if (WP.title) out.push({ id: "with-partner", title: S(WP.title) });
  const PR = O(C.premium);
  if (PR.title) out.push({ id: "premium", title: S(PR.title) });
  const LG = O(C.localGCC);
  if (LG.title) out.push({ id: "local-gcc", title: S(LG.title) });
  const CT = O(C.companyTypes);
  if (CT.heading) out.push({ id: "company-types", title: S(CT.heading) });
  const LIC = O(C.licenses);
  if (LIC.heading) out.push({ id: "licenses", title: S(LIC.heading) });
  return out;
}

function mapSimpleCards(C) {
  return A(C.items).map((it, i) => ({ id: `sec-${i}`, title: S(it?.title ?? it), desc: S(it?.desc ?? "") }));
}

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const navigate = useNavigate();
  const { country: countryParam } = useParams();

  // keep document in sync for a11y; layout stays LTR at component level
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = i18n.dir();
  }, [lang, i18n]);

  const heading = t("services.heading", { defaultValue: "Our Services" });
  const chooserSubtitle = t("services.chooser.subtitle", {
    defaultValue: "Choose your region to explore our specialized services",
  });
  const backLabel = t("services.allRegions", { defaultValue: "All Regions" });

  const SRaw = O(t("services.saudi", { returnObjects: true, defaultValue: {} }));
  const BRaw = O(t("services.bahrain", { returnObjects: true, defaultValue: {} }));
  const URaw = O(t("services.uae", { returnObjects: true, defaultValue: {} }));

  const countries = useMemo(() => buildCountryCards(t), [i18n.language]);

  const serviceCards = useMemo(() => {
    if (!countryParam) return [];
    const base =
      countryParam === "saudi" ? mapSaudiCards(SRaw)
      : countryParam === "bahrain" ? mapSimpleCards(BRaw)
      : mapSimpleCards(URaw);

      

    return base.map((s, idx) => {
      const saNodeByKey =
        countryParam === "saudi"
          ? s.id === "foreign"       ? O(SRaw.foreign)
          : s.id === "with-partner"  ? O(SRaw.withPartner)
          : s.id === "premium"       ? O(SRaw.premium)
          : s.id === "local-gcc"     ? O(SRaw.localGCC)
          : s.id === "company-types" ? O(SRaw.companyTypes)
          : s.id === "licenses"      ? O(SRaw.licenses)
          : null
          : null;

      const simpleItem =
        countryParam === "bahrain" ? A(BRaw.items)[idx]
        : countryParam === "uae"   ? A(URaw.items)[idx]
        : null;

      const imgFromI18n = saNodeByKey?.image || simpleItem?.image;
      let image =
        imgFromI18n ||
        SERVICE_IMAGES[countryParam]?.[s.id] ||
        SERVICE_IMAGES[countryParam]?.[`sec-${idx}`];

      if (idx === 0 && FIRST_TILE_OVERRIDE[countryParam]) {
        image = FIRST_TILE_OVERRIDE[countryParam];
      }

      const icon =
        (SERVICE_ICONS[countryParam]?.[s.id]) ||
        (SERVICE_ICONS[countryParam]?.[`sec-${idx}`]) ||
        null;

      return {
        key: s.id,
        title: s.title,
        excerpt: S(simpleItem?.desc || ""),
        image,
        icon,
      };
    });
  }, [countryParam, SRaw, BRaw, URaw, i18n.language]);

  const selected = countryParam || null;

  // Decide grid layout based on how many cards we have
const count = serviceCards.length;
const gridClass =
  count <= 1
    ? "grid-cols-1 max-w-xl mx-auto"                     // 1 card → centered narrow column
    : count === 2
    ? "grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto"     // 2 cards → centered two columns
    : "md:grid-cols-2 lg:grid-cols-3";                   // 3+ cards → your normal layout


  return (
    // 🔒 Lock layout LTR here
    <section id="services" dir="ltr" className="min-h-screen overflow-hidden relative py-12" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {!selected && (
            <motion.div
              key="chooser"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
            >
              {/* Text blocks can still use bidi direction for proper shaping */}
              <PageHeading title={heading} subtitle={chooserSubtitle} titleDir={i18n.dir()} align="center"/>
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-8">
                {countries.map((c) => (
                  <CountryTitle
                    key={c.key}
                    label={c.label}
                    bgSrc={c.bgSrc}
                    flagSrc={c.flagSrc}
                    overlay={c.overlay}
                    title={c.label}
                    // Keep tiles visually the same regardless of language
                    titleDir={i18n.dir()}
                    onClick={() => navigate(`/services/${c.key}`)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {selected && (
            <motion.div
              key={`country-${selected}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50"
                  style={{ borderColor: "rgba(0,0,0,0.12)" }}
                >
                  <span>←</span>
                  <span className="font-medium">{backLabel}</span>
                </Link>
                {/* <div className="text-gray-500 text-sm uppercase">{selected}</div> */}

               {(() => {
                const AR = {
                  saudi: "المملكة العربية السعودية",
                  bahrain: "مملكة البحرين",
                  uae: "الإمارات العربية المتحدة",
                };
                const EN = {
                  saudi: "Saudi Arabia",
                  bahrain: "Bahrain",
                  uae: "United Arab Emirates",
                };

                const isAr = i18n.language?.startsWith("ar");
                const label = (isAr ? AR : EN)[selected] ?? selected;

                return (
                  <div dir={i18n.dir()} className="text-gray-500 text-sm">
                    {label}
                  </div>
                );
              })()}

              </div>

              <PageHeading
                title={
                  selected === "saudi"
                    ? S(SRaw.heading) || t("services.country.saudi")
                    : selected === "bahrain"
                    ? S(BRaw.heading) || t("services.country.bahrain")
                    : S(URaw.heading) || t("services.country.uae")
                }
                subtitle={t("services.viewServices", { defaultValue: "View All Services" })}
                titleDir={i18n.dir()}
              />

              {serviceCards.length ? (
                <div className={`grid gap-10 mt-8 whitespace-wrap ${gridClass}`}>
                  {serviceCards.map((s) => (
                    <ServiceTitle
                      key={s.key}
                      // Card layout stays the same; only text uses bidi
                      dir={i18n.dir()}
                      image={s.image}
                      title={s.title}
                      icon={s.icon}
                      onClick={() => navigate(`/services/${selected}/section/${s.key}`)}
                      
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">No data.</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
