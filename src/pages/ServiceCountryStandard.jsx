// src/pages/ServiceCountryStandard.jsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* ---------- tiny helpers (pure) ---------- */
const A = (v) => (Array.isArray(v) ? v : []);
const O = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : {});
const T = (v) => (typeof v === "string" ? v : v?.title ?? v?.name ?? "");

/* Map SAUDI structure -> sections (NO extra text created) */
function mapSaudi(C) {
  const out = [];
  const F = O(C.foreign);
  if (F.title || A(F.points).length || A(F.requirements).length) {
    out.push({
      id: "foreign",
      title: T(F.title),
      summary: T(F.intro || ""),
      bullets: A(F.points),
      extraTitle: T(F.reqTitle || ""),
      extraBullets: A(F.requirements),
    });
  }
  const WP = O(C.withPartner);
  if (WP.title || A(WP.requirements).length) {
    out.push({
      id: "with-partner",
      title: T(WP.title),
      summary: T(WP.intro || ""),
      bullets: [],
      extraTitle: T(WP.reqTitle || ""),
      extraBullets: A(WP.requirements),
    });
  }
  const PR = O(C.premium);
  if (PR.title || PR.text) {
    out.push({ id: "premium", title: T(PR.title), summary: T(PR.text || "") });
  }
  const LG = O(C.localGCC);
  if (LG.title || A(LG.items).length) {
    out.push({ id: "local-gcc", title: T(LG.title), bullets: A(LG.items) });
  }
  const CT = O(C.companyTypes);
  if (CT.heading || A(CT.items).length) {
    out.push({
      id: "company-types",
      title: T(CT.heading),
      richList: A(CT.items).map((it) => ({
        name: T(it?.name ?? it),
        desc: T(it?.desc ?? ""),
      })),
    });
  }
  const LIC = O(C.licenses);
  if (LIC.heading || A(LIC.groups).length) {
    out.push({
      id: "licenses",
      title: T(LIC.heading),
      groups: A(LIC.groups).map((g) => ({
        name: T(g?.name ?? g),
        items: A(g?.items),
      })),
    });
  }
  return out;
}

/* Map generic items for Bahrain / UAE (title, desc, bullets) */
function mapGeneric(C) {
  return A(C.items).map((it, i) => ({
    id: `sec-${i}`,
    title: T(it?.title ?? it),
    summary: T(it?.desc ?? ""),
    bullets: A(it?.bullets),
  }));
}

/* ---------- atoms ---------- */
const Crumb = ({ to, children }) => (
  <Link
    to={to}
    className="text-white/90 hover:text-white underline-offset-2 hover:underline"
  >
    {children}
  </Link>
);

const DotList = ({ items }) =>
  !A(items).length ? null : (
    <ul className="mt-3 space-y-1.5">
      {items.map((b, i) => (
        <li key={i} className="flex gap-2 text-gray-800">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
          <span>{T(b)}</span>
        </li>
      ))}
    </ul>
  );

function SectionCard({ s }) {
  return (
    <section id={s.id} className="scroll-mt-28">
      {s.title && (
        <h2 className="text-2xl font-bold text-gray-900">{s.title}</h2>
      )}
      {s.summary && (
        <p className="mt-2 text-gray-700 leading-relaxed">{s.summary}</p>
      )}

      {/* simple bullets */}
      <DotList items={s.bullets} />

      {/* extra (requirements) */}
      {s.extraTitle && <div className="mt-4 font-semibold">{s.extraTitle}</div>}
      <DotList items={s.extraBullets} />

      {/* rich list for company types */}
      {A(s.richList).length > 0 && (
        <div className="mt-4 space-y-3">
          {s.richList.map((r, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-4"
              style={{ borderColor: "rgba(0,0,0,.08)" }}
            >
              <div className="font-semibold text-gray-900">{T(r.name)}</div>
              {r.desc && (
                <div className="mt-1 text-gray-700 leading-relaxed">{T(r.desc)}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* grouped lists for licenses */}
      {A(s.groups).length > 0 && (
        <div className="mt-4 space-y-4">
          {s.groups.map((g, i) => (
            <div key={i}>
              <div className="font-semibold text-gray-900">{T(g.name)}</div>
              <DotList items={g.items} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- page ---------- */
export default function ServiceCountryStandard() {
  const { t, i18n } = useTranslation();
  const { country = "saudi" } = useParams();
  const dir = i18n.dir();

  const data = O(t(`services.${country}`, { returnObjects: true, defaultValue: {} }));

  const title =
    T(data.heading) ||
    (country === "saudi"
      ? t("services.country.saudi", { defaultValue: "Saudi Arabia" })
      : country === "bahrain"
      ? t("services.country.bahrain", { defaultValue: "Bahrain" })
      : t("services.country.uae", { defaultValue: "United Arab Emirates" }));

  const heroImg =
    data.heroImage ||
    (country === "saudi"
      ? "/assets/saudi.jpg"
      : country === "bahrain"
      ? "/assets/bahrain.jpg"
      : "/assets/uae.jpg");

  const sections = useMemo(() => {
    if (country === "saudi") return mapSaudi(data);
    return mapGeneric(data);
  }, [country, data]);

  const anchors = sections
    .filter((s) => !!s.title)
    .map((s) => ({ id: s.id, title: s.title }));

  return (
    <main id="services-country" className="min-h-screen bg-[rgba(162,144,97,0.06)]">
      {/* HERO */}
      <header className="relative h-[42vh] min-h-[280px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/35" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end px-6 pb-8">
          <nav className="text-sm mb-2 text-white/90" dir={dir}>
            <Crumb to="/">{t("nav.home")}</Crumb>
            <span className="mx-2">›</span>
            <Crumb to="/services">{t("nav.services")}</Crumb>
            <span className="mx-2">›</span>
            <span className="text-white">{title}</span>
          </nav>
          <h1 className="text-white text-3xl sm:text-4xl font-black drop-shadow">
            {title}
          </h1>
        </div>
      </header>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-8">
        {/* LEFT rail: sticky TOC (standard pattern) */}
        <aside className="lg:col-span-4">
          {anchors.length > 0 && (
            <div
              className="sticky top-24 rounded-2xl bg-white border shadow-sm p-4"
              style={{ borderColor: "rgba(0,0,0,.08)" }}
            >
              <ul className="space-y-1.5" dir={dir}>
                {anchors.map((a) => (
                  <li key={a.id}>
                    <a
                      href={`#${a.id}`}
                      className="block px-2 py-2 rounded hover:bg-gray-50 text-gray-800"
                    >
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* RIGHT: content */}
        <div className="lg:col-span-8 space-y-10">
          {sections.map((s, i) => (
            <React.Fragment key={s.id || i}>
              <SectionCard s={s} />
              {i < sections.length - 1 && <hr className="my-6 border-gray-200" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </main>
  );
}
