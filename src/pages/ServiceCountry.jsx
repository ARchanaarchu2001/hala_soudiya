// src/pages/ServiceCountry.jsx
import React, { useMemo,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { pagePatternStyle } from "../components/services/pattern";
import RichText from "../components/common/RichTextLink"; // ✅ to render <contact> / <ext>

/* --- helpers --- */
const A = (v) => (Array.isArray(v) ? v : []);
const O = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : {});
const S = (v) => (typeof v === "string" ? v : v?.title ?? v?.name ?? "");

/* Map Saudi JSON into full sections */
function mapSaudi(C) {
  const out = [];

  const F = O(C.foreign);
  if (F.title || A(F.points).length || A(F.requirements).length) {
    out.push({
      id: "foreign",
      title: S(F.title),
      summary: S(F.intro || ""),
      bullets: A(F.points),
      extraTitle: S(F.reqTitle || ""),
      extraBullets: A(F.requirements),
    });
  }

  const WP = O(C.withPartner);
  if (WP.title || A(WP.requirements).length) {
    out.push({
      id: "with-partner",
      title: S(WP.title),
      summary: S(WP.intro || ""),
      bullets: [],
      extraTitle: S(WP.reqTitle || ""),
      extraBullets: A(WP.requirements),
    });
  }

  const PR = O(C.premium);
  if (PR.title || PR.text) {
    out.push({
      id: "premium",
      title: S(PR.title),
      summary: S(PR.text || ""),
      bullets: [],
    });
  }

  const LG = O(C.localGCC);
  if (LG.title || A(LG.items).length) {
    out.push({
      id: "local-gcc",
      title: S(LG.title),
      summary: "",
      bullets: A(LG.items),
    });
  }

  // ✅ include name + desc (full content)
  const CT = O(C.companyTypes);
  if (CT.heading || A(CT.items).length) {
    out.push({
      id: "company-types",
      title: S(CT.heading),
      summary: "",
      richList: A(CT.items).map((it) => ({
        name: S(it?.name ?? it),
        desc: S(it?.desc ?? ""),
      })),
    });
  }

  // ✅ include license groups + items (full content)
  const LIC = O(C.licenses);
  if (LIC.heading || A(LIC.groups).length) {
    out.push({
      id: "licenses",
      title: S(LIC.heading),
      summary: "",
      groups: A(LIC.groups).map((g) => ({
        name: S(g?.name ?? g),
        items: A(g?.items),
      })),
    });
  }

  return out;
}

/* Map generic items (Bahrain / UAE) */
function mapItems(C) {
  return A(C.items).map((it, i) => ({
    id: `sec-${i}`,
    title: S(it?.title ?? it),
    summary: S(it?.desc ?? ""),
    bullets: A(it?.bullets),
  }));
}

/* UI bits */
const Crumb = ({ to, children }) => (
  <Link to={to} className="text-white/90 hover:text-white underline-offset-2 hover:underline">
    {children}
  </Link>
);

const BulletList = ({ items }) =>
  !A(items).length ? null : (
    <ul className="mt-3 space-y-1.5">
      {items.map((b, i) => (
        <li key={i} className="flex gap-2 text-gray-800">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
          <span>{S(b)}</span>
        </li>
      ))}
    </ul>
  );

const SectionBlock = ({ s }) => (
  <section id={s.id} className="scroll-mt-28">
    {s.title && <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{s.title}</h2>}

    {/* summary (with RichText tags supported) */}
    {s.summary && (
      <p className="mt-2 text-gray-700 leading-relaxed">
        <RichText text={s.summary} />
      </p>
    )}

    {/* basic bullets */}
    <BulletList items={s.bullets} />

    {/* extra bullets block */}
    {s.extraTitle && <div className="mt-3 font-semibold text-gray-900">{s.extraTitle}</div>}
    <BulletList items={s.extraBullets} />

    {/* ✅ company types with descriptions */}
    {A(s.richList).length > 0 && (
      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        {s.richList.map((r, i) => (
          <div
            key={i}
            className="rounded-xl border bg-white p-4"
            style={{ borderColor: "rgba(0,0,0,.08)" }}
          >
            <div className="font-semibold text-gray-900">{S(r.name)}</div>
            {r.desc && (
              <div className="mt-1 text-gray-700 leading-relaxed">
                <RichText text={S(r.desc)} />
              </div>
            )}
          </div>
        ))}
      </div>
    )}

    {/* ✅ license groups + their items */}
    {A(s.groups).length > 0 && (
      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        {s.groups.map((g, i) => (
          <div
            key={i}
            className="rounded-xl border bg-white p-4"
            style={{ borderColor: "rgba(0,0,0,.08)" }}
          >
            <div className="font-semibold text-gray-900">{S(g.name)}</div>
            <BulletList items={g.items} />
          </div>
        ))}
      </div>
    )}
  </section>
);

export default function ServiceCountry() {
  const { t, i18n } = useTranslation();
   const { country = "saudi", sectionId } = useParams();
  const dir = i18n.dir();

  const C = O(t(`services.${country}`, { returnObjects: true, defaultValue: {} }));

  const pageTitle =
    S(C.heading) ||
    (country === "saudi"
      ? t("services.country.saudi", { defaultValue: "Saudi Arabia" })
      : country === "bahrain"
      ? t("services.country.bahrain", { defaultValue: "Bahrain" })
      : t("services.country.uae", { defaultValue: "United Arab Emirates" }));

  const heroImg =
    C.heroImage ||
    (country === "saudi"
      ? "/assets/saudi.jpg"
      : country === "bahrain"
      ? "/assets/bahrain.jpg"
      : "/assets/uae.jpg");

  const sections = useMemo(() => {
    if (country === "saudi") return mapSaudi(C);
    return mapItems(C);
  }, [country, C]);

  useEffect(() => {
    if (!sectionId) return;
    // wait a tick to ensure sections are rendered
    const id = String(sectionId);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [sectionId, sections]);

  const anchors = sections.filter((s) => !!s.title).map((s) => ({ id: s.id, title: s.title }));

  return (
    <main id="services-country" className="min-h-screen relative" >
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[260px] w-full overflow-hidden">
        <img src={heroImg} alt={pageTitle} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/35" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end px-6 pb-7">
          <nav className="text-sm mb-2 text-white/90" dir={dir}>
            <Crumb to="/">{t("nav.home")}</Crumb>
            <span className="mx-2">›</span>
            <Crumb to="/services">{t("nav.services")}</Crumb>
            <span className="mx-2">›</span>
            <span className="text-white">{pageTitle}</span>
          </nav>
          <h1 className="text-white text-3xl sm:text-4xl font-black drop-shadow">{pageTitle}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-10">
          {sections.map((s, i) => (
            <React.Fragment key={s.id || i}>
              <SectionBlock s={s} />
              {i < sections.length - 1 && <hr className="my-4 border-gray-200" />}
            </React.Fragment>
          ))}
        </div>

        {/* Right rail (TOC) */}
        <aside className="lg:col-span-4">
          {anchors.length > 0 && (
            <div
              className="sticky top-24 rounded-2xl bg-white border shadow-sm p-4"
              style={{ borderColor: "rgba(0,0,0,.08)" }}
              aria-label="In-page links"
            >
              <ul className="space-y-2">
                {anchors.map((a) => (
                  <li key={a.id}>
                    <a href={`#${a.id}`} className="block px-2 py-2 rounded hover:bg-gray-50 text-gray-800">
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
