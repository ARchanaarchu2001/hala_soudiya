import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
// import { pagePatternStyle } from "./pattern";

/* helpers (pure) */
const asArray = (v) => (Array.isArray(v) ? v : []);
const ensureObject = (v) =>
  v && typeof v === "object" && !Array.isArray(v) ? v : {};
const toStr = (v) =>
  typeof v === "string" ? v : v?.title ?? v?.name ?? "";

/* map SA content from your JSON (no extra) */
function mapSaudi(C) {
  const out = [];

  const F = ensureObject(C.foreign);
  if (F.title || asArray(F.points).length || asArray(F.requirements).length) {
    out.push({
      title: toStr(F.title),
      summary: toStr(F.intro || ""),
      bullets: asArray(F.points),
      extraTitle: toStr(F.reqTitle || ""),
      extraBullets: asArray(F.requirements),
    });
  }

  const WP = ensureObject(C.withPartner);
  if (WP.title || asArray(WP.requirements).length) {
    out.push({
      title: toStr(WP.title),
      summary: toStr(WP.intro || ""),
      bullets: [],
      extraTitle: toStr(WP.reqTitle || ""),
      extraBullets: asArray(WP.requirements),
    });
  }

  const PR = ensureObject(C.premium);
  if (PR.title || PR.text) {
    out.push({
      title: toStr(PR.title),
      summary: toStr(PR.text || ""),
      bullets: [],
    });
  }

  const LG = ensureObject(C.localGCC);
  if (LG.title || asArray(LG.items).length) {
    out.push({
      title: toStr(LG.title),
      summary: "",
      bullets: asArray(LG.items),
    });
  }

  const CT = ensureObject(C.companyTypes);
  if (CT.heading || asArray(CT.items).length) {
    out.push({
      title: toStr(CT.heading),
      summary: "",
      bullets: asArray(CT.items).map((it) => toStr(it?.name ?? it)),
    });
  }

  const LIC = ensureObject(C.licenses);
  if (LIC.heading || asArray(LIC.groups).length) {
    out.push({
      title: toStr(LIC.heading),
      summary: "",
      bullets: asArray(LIC.groups).map((g) => toStr(g?.name ?? g)),
    });
  }

  return out;
}

/* map Bahrain content from your JSON (items[] only) */
function mapBahrain(C) {
  return asArray(C.items).map((it) => ({
    title: toStr(it?.title ?? it),
    summary: toStr(it?.desc ?? ""),
    bullets: asArray(it?.bullets),
  }));
}

/* section card (no extra copy) */
function SectionCard({ s }) {
  return (
    <article
      className="rounded-2xl bg-white border shadow-sm p-5"
      style={{ borderColor: "rgba(0,0,0,.08)" }}
    >
      {s.title && (
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{s.title}</h3>
      )}
      {s.summary && (
        <p className="mt-2 text-gray-700 leading-relaxed">{s.summary}</p>
      )}
      {asArray(s.bullets).length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {s.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-gray-800">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span>{toStr(b)}</span>
            </li>
          ))}
        </ul>
      )}
      {s.extraTitle && <div className="mt-3 font-semibold">{s.extraTitle}</div>}
      {asArray(s.extraBullets).length > 0 && (
        <ul className="mt-1.5 space-y-1.5">
          {s.extraBullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-gray-800">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span>{toStr(b)}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/* main page */
export default function CountrySectorPage({ country }) {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  const C = ensureObject(
    t(`services.${country}`, { returnObjects: true, defaultValue: {} })
  );

  const title =
    toStr(C.heading) ||
    (country === "saudi"
      ? t("services.country.saudi", { defaultValue: "Saudi Arabia" })
      : country === "bahrain"
      ? t("services.country.bahrain", { defaultValue: "Bahrain" })
      : t("services.country.uae", { defaultValue: "United Arab Emirates" }));

  // hero image fallback; no extra text injected
  const heroImg =
    C.heroImage ||
    (country === "saudi"
      ? "/assets/saudi-arabia.jpeg"
      : country === "bahrain"
      ? "/assets/bahrain.jpg"
      : "/assets/uae.jpg");

  // sections strictly from JSON
  const sections = useMemo(() => {
    if (country === "bahrain") return mapBahrain(C);
    if (country === "saudi") return mapSaudi(C);
    // uae currently has items with title/desc in your file
    return asArray(C.items).map((it) => ({
      title: toStr(it?.title ?? it),
      summary: toStr(it?.desc ?? ""),
      bullets: asArray(it?.bullets),
    }));
  }, [country, C]);

  return (
    <section
      id="services-country"
      className="min-h-screen overflow-hidden relative"
      
    >
      {/* hero */}
      <div className="relative h-[36vh] min-h-[260px] w-full overflow-hidden">
        <img src={heroImg} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-end px-6 pb-8">
          <h1 className="text-white text-3xl sm:text-4xl font-black drop-shadow">{title}</h1>
        </div>
      </div>

      {/* body */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* “Sub-Sectors” header only if we actually have sections */}
        {sections.length > 0 && (
          <h2 className="text-2xl font-bold text-gray-900">
            {isRTL ? "القطاعات الفرعية" : "Sub-Sectors"}
          </h2>
        )}

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {sections.map((s, i) => (
            <SectionCard key={s.title || i} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
