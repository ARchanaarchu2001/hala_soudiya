// src/pages/ServiceCountryShowcase.jsx
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* ---------- helpers (no extra strings) ---------- */
const A = (v) => (Array.isArray(v) ? v : []);
const O = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : {});
const T = (v) => (typeof v === "string" ? v : v?.title ?? v?.name ?? "");

/* Map SA data to sections */
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

/* Map generic items (Bahrain / UAE) */
function mapGeneric(C) {
  return A(C.items).map((it, i) => ({
    id: `sec-${i}`,
    title: T(it?.title ?? it),
    summary: T(it?.desc ?? ""),
    bullets: A(it?.bullets),
  }));
}

/* ---------- atoms ---------- */
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

/* Big alternating “showcase” section */
function ShowcaseSection({ s, index, dir }) {
  const isEven = index % 2 === 0;
  return (
    <section
      id={s.id}
      className="scroll-mt-28 relative rounded-3xl overflow-hidden"
      dir={dir}
    >
      <div
        className={`grid lg:grid-cols-12 gap-6 items-stretch `}
        style={{ minHeight: "min(68vh, 760px)" }}
      >
        {/* Visual panel (accent gradient, watermark index) */}
        <div
          className={`relative ${isEven ? "lg:col-span-5" : "lg:col-span-5 lg:order-2"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#016c37] via-[#0f4f30] to-[#01361d]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(90% 60% at 20% 0%, rgba(212,175,55,.35) 0%, transparent 60%)",
              mixBlendMode: "screen",
            }}
          />
          <div className="absolute inset-0 bg-[url('/assets/pattern-noise.png')] opacity-20" />
          <div
            className={`absolute ${dir === "rtl" ? "left-6" : "right-6"} bottom-4 text-white/15 font-black`}
            style={{ fontSize: "clamp(52px, 10vw, 120px)", lineHeight: 1 }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Content panel */}
        <div
          className={`relative bg-white/90 backdrop-blur rounded-3xl border p-6 sm:p-8 ${isEven ? "lg:col-span-7" : "lg:col-span-7 lg:order-1"}`}
          style={{ borderColor: "rgba(0,0,0,.08)" }}
        >
          {s.title && (
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              {s.title}
            </h2>
          )}
          {s.summary && (
            <p className="mt-3 text-gray-700 leading-relaxed">{s.summary}</p>
          )}

          <DotList items={s.bullets} />

          {s.extraTitle && (
            <div className="mt-5 font-semibold text-gray-900">{s.extraTitle}</div>
          )}
          <DotList items={s.extraBullets} />

          {A(s.richList).length > 0 && (
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {s.richList.map((r, i) => (
                <div
                  key={i}
                  className="rounded-xl border bg-white p-4"
                  style={{ borderColor: "rgba(0,0,0,.08)" }}
                >
                  <div className="font-semibold text-gray-900">{T(r.name)}</div>
                  {r.desc && (
                    <div className="mt-1 text-gray-700 leading-relaxed">
                      {T(r.desc)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {A(s.groups).length > 0 && (
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {s.groups.map((g, i) => (
                <div
                  key={i}
                  className="rounded-xl border bg-white p-4"
                  style={{ borderColor: "rgba(0,0,0,.08)" }}
                >
                  <div className="font-semibold text-gray-900">{T(g.name)}</div>
                  <DotList items={g.items} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ServiceCountryShowcase() {
  const { t, i18n } = useTranslation();
  const { country = "saudi" } = useParams();
  const dir = i18n.dir();

  const data = O(t(`services.${country}`, { returnObjects: true, defaultValue: {} }));

  const title =
    T(data.heading) ||
    (country === "saudi"
      ? t("services.country.saudi")
      : country === "bahrain"
      ? t("services.country.bahrain")
      : t("services.country.uae"));

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

  const anchors = sections.filter((s) => !!s.title).map((s) => ({ id: s.id, title: s.title }));

  return (
    <main className="bg-[rgba(162,144,97,0.06)] min-h-screen" dir="ltr">
      {/* HERO */}
      <header className="relative h-[48vh] min-h-[320px] w-full overflow-hidden">
        <img src={heroImg} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end px-6 pb-10">
          <nav className="text-white/90 text-sm mb-2" dir={dir}>
            <Link to="/" className="hover:text-white underline-offset-2 hover:underline">
              {t("nav.home")}
            </Link>
            <span className="mx-2">›</span>
            <Link to="/services" className="hover:text-white underline-offset-2 hover:underline">
              {t("nav.services")}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-white">{title}</span>
          </nav>
          <h1 className="text-white text-3xl sm:text-5xl font-black drop-shadow">{title}</h1>
        </div>
      </header>

      {/* STICKY CHIPS NAV */}
      {anchors.length > 0 && (
        <div className="sticky top-16 z-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mt-4 mb-2 overflow-x-auto no-scrollbar">
              <div className="inline-flex gap-2">
                {anchors.map((a) => (
                  <a
                    key={a.id}
                    href={`#${a.id}`}
                    className="px-4 py-2 rounded-full bg-white border text-gray-800 hover:bg-gray-50 whitespace-nowrap"
                    style={{ borderColor: "rgba(0,0,0,.08)" }}
                  >
                    {a.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {sections.map((s, i) => (
          <ShowcaseSection key={s.id || i} s={s} index={i} dir={i18n.dir()} />
        ))}
      </div>
    </main>
  );
}
