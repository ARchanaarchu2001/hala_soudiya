// src/pages/ServiceSection.jsx
import React, { useMemo, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PageHeading from "../services/PageHeading";
import RichText from "../common/RichTextLink";

import {
  buildSaudiPanels,
  buildSimplePanels,
  ensureObject as O,
  asArray as A,
} from "../../utils/servicesUtils";

/* ---- brand tokens ---- */
const BG     = "#f5f0eb";
const BRAND  = "#006C3D";
const BORDER = "rgba(0,0,0,0.08)";
const INK    = "#0f172a";

/** Stable Saudi section ids -> indices (for picking one panel) */
const SAUDI_ID_TO_INDEX = {
  foreign: 0,
  "with-partner": 1,
  premium: 2,
  "local-gcc": 3,
  "company-types": 4,
  licenses: 5,
};

/** Stable Saudi list (for right sidebar) with safe fallbacks */
const SAUDI_SECTIONS = [
  { id: "foreign",        pick: (S) => O(S.foreign).title,        fallback: "For Foreign Investors" },
  { id: "with-partner",   pick: (S) => O(S.withPartner).title,    fallback: "For Saudi/GCC with Foreign Partner" },
  { id: "premium",        pick: (S) => O(S.premium).title,        fallback: "Saudi Premium Residency Program" },
  { id: "local-gcc",      pick: (S) => O(S.localGCC).title,       fallback: "For Saudi and GCC Investors" },
  { id: "company-types",  pick: (S) => O(S.companyTypes).heading, fallback: "Types of Companies" },
  { id: "licenses",       pick: (S) => O(S.licenses).heading,     fallback: "Types of Investment Licenses" },
];

/* Right column: clean, right-aligned list (no lines) + keyboard navigation */
const RightTitleList = ({ items = [], activeId, onSelect }) => {
  const containerRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      activeRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  const onKeyDown = (e) => {
    const idx = items.findIndex((it) => it.id === activeId);
    if (idx < 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      onSelect?.(items[Math.min(idx + 1, items.length - 1)].id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onSelect?.(items[Math.max(idx - 1, 0)].id);
    } else if (e.key === "Home") {
      e.preventDefault();
      onSelect?.(items[0]?.id);
    } else if (e.key === "End") {
      e.preventDefault();
      onSelect?.(items[items.length - 1]?.id);
    } else if (e.key === "Enter") {
      e.preventDefault();
      onSelect?.(activeId);
    }
  };

  return (
    <nav aria-label="Other services" className="rounded-lg bg-white shadow-sm" style={{ border: `1px solid ${BORDER}` }}>
      <div
        ref={containerRef}
        className="max-h-[60vh] overflow-auto p-2"
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="listbox"
        aria-activedescendant={activeId ? `svc-${activeId}` : undefined}
      >
        <ul className="space-y-2">
          {items.map((it) => {
            const active = it.id === activeId;
            return (
              <li key={it.id} role="none">
                <button
                  id={`svc-${it.id}`}
                  type="button"
                  ref={active ? activeRef : null}
                  onClick={() => onSelect?.(it.id)}
                  aria-current={active ? "page" : undefined}
                  role="option"
                  aria-selected={active}
                  className={[
                    "w-full px-4 py-3 rounded-md font-medium transition text-right",
                    active ? "cursor-default" : "hover:bg-[var(--beige)]/80",
                  ].join(" ")}
                  style={{
                    background: active ? BG : "transparent",
                    color: active ? BRAND : INK,
                    boxShadow: active ? `0 0 0 1px ${BRAND}33 inset` : "none",
                    ["--beige"]: BG,
                  }}
                >
                  <span className="inline-block truncate max-w-full">{it.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default function ServiceSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const navigate = useNavigate();
  const { country, sectionId } = useParams();

  // Keep document language/dir for accessibility
  useEffect(() => {
    document.documentElement.lang = i18n.language || "en";
    document.documentElement.dir = i18n.dir();
  }, [i18n.language, i18n]);

  // Go to top on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [country, sectionId]);

  // Pull raw i18n blocks
  const SRaw = O(t("services.saudi",   { returnObjects: true, defaultValue: {} }));
  const BRaw = O(t("services.bahrain", { returnObjects: true, defaultValue: {} }));
  const URaw = O(t("services.uae",     { returnObjects: true, defaultValue: {} }));

  // Pick the ONE selected panel + country heading
  const { panel, title } = useMemo(() => {
    let panels = [];
    let idx = -1;
    let heading = "";

    if (country === "saudi") {
      panels  = buildSaudiPanels(SRaw);
      idx     = SAUDI_ID_TO_INDEX[sectionId] ?? -1;
      heading = SRaw?.heading || t("services.country.saudi");
    } else if (country === "bahrain") {
      panels  = buildSimplePanels(BRaw);
      const n = Number((sectionId || "").replace("sec-", ""));
      idx     = Number.isFinite(n) ? n : -1;
      heading = BRaw?.heading || t("services.country.bahrain");
    } else if (country === "uae") {
      panels  = buildSimplePanels(URaw);
      const n = Number((sectionId || "").replace("sec-", ""));
      idx     = Number.isFinite(n) ? n : -1;
      heading = URaw?.heading || t("services.country.uae");
    }

    const p = idx >= 0 && idx < panels.length ? panels[idx] : null;
    return { panel: p, title: heading };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, sectionId, i18n.language]);

  // Sidebar titles
  const others = useMemo(() => {
    if (country === "saudi") {
      return SAUDI_SECTIONS.map(({ id, pick, fallback }) => ({
        id,
        title: pick(SRaw) || fallback,
      }));
    }
    const items = country === "bahrain" ? A(BRaw.items) : A(URaw.items);
    return items.map((it, idx) => ({ id: `sec-${idx}`, title: it?.title || it?.name || "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, sectionId, i18n.language]);

  // Fallback if invalid id
  if (!panel) {
    return (
      <section dir="ltr" className="min-h-screen" style={{ background: BG }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <PageHeading title={t("services.heading", { defaultValue: "Our Services" })} />
          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm" style={{ border: `1px solid ${BORDER}` }}>
            <p className="text-gray-700">
              {t("services.notFound", { defaultValue: "Sorry, that section was not found." })}
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-md hover:bg-gray-50" style={{ border: `1px solid ${BORDER}` }}>
                {t("common.back", { defaultValue: "Back" })}
              </button>
              <Link to={`/services/${country}`} className="px-4 py-2 rounded-md hover:bg-gray-50" style={{ border: `1px solid ${BORDER}` }}>
                {t("services.viewServices", { defaultValue: "View All Services" })}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const arrow = isRTL ? "→" : "←";

  return (
    /* 🔒 Lock layout LTR so the sidebar stays on the RIGHT by default; we control swap with order utilities */
    <section dir="ltr" className="min-h-screen" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        {/* Header row — reverse visual order when RTL */}
        <div className={`flex items-center justify-between gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <PageHeading title={title} titleDir={i18n.dir()} align="start" />
          <Link
            to={`/services/${country}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white hover:bg-gray-50"
            style={{ border: `1px solid ${BORDER}` }}
          >
            <span>{arrow}</span>
            <span className="font-medium">
              {t("services.backToCountry", {
                defaultValue: isRTL ? "عودة إلى الخدمات" : "Back to Services",
              })}
            </span>
          </Link>
        </div>

        {/* Two columns: MAIN + SIDEBAR; swap positions on RTL */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* MAIN — becomes left in LTR (order-1) and left in visual flow for RTL by setting order-2 */}
          <article className={`lg:col-span-8 p-1 ${isRTL ? "lg:order-2" : "lg:order-1"}`}>
            <div dir={i18n.dir()} className="rounded-lg p-6 md:p-8 leading-relaxed text-start">
              <h2 dir={i18n.dir()} className="text-2xl font-bold mb-5 text-start" style={{ color: INK }}>
                {panel.title}
              </h2>

              {/* Render variants */}
              {"type" in panel && panel.type === "companyTypes" ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {A(panel.items).map((it, i) => (
                    <div key={i} className="rounded-md p-4" style={{ background: BG, border: `1px solid ${BORDER}` }}>
                      <div className="font-semibold mb-1" dir={i18n.dir()}>{it.name}</div>
                      {it.desc ? (
                        <div dir={i18n.dir()} className="text-start">
                          <RichText text={it.desc} className="text-gray-800 text-[15px]" />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : "type" in panel && panel.type === "licenses" ? (
                <div className="space-y-6">
                  {A(panel.groups).map((g, gi) => (
                    <section key={gi}>
                      <h3 className="font-semibold mb-2 text-start" dir={i18n.dir()}>{g.name}</h3>
                      {A(g.items).length ? (
                        <ul dir={i18n.dir()} className="list-disc ps-6 space-y-1">
                          {g.items.map((li, lii) => (
                            <li key={lii} className="text-gray-800">
                              {li}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 text-sm">—</p>
                      )}
                    </section>
                  ))}
                </div>
              ) : "isHtml" in panel && panel.isHtml ? (
                <div
                  dir={i18n.dir()}
                  className="prose max-w-none prose-li:my-1 prose-h5:mt-4 prose-h5:mb-2
                             prose-ul:list-disc prose-ul:ps-6 prose-ol:list-decimal prose-ol:ps-6 text-start"
                  style={{ color: INK }}
                  dangerouslySetInnerHTML={{ __html: panel.content }}
                />
              ) : (
                <>
                  {panel.content ? (
                    <div dir={i18n.dir()} className="text-start">
                      <RichText text={panel.content} className="text-[17px]" />
                    </div>
                  ) : null}
                  {A(panel.bullets).length ? (
                    <ul dir={i18n.dir()} className="mt-4 list-disc ps-6 space-y-1">
                      {panel.bullets.map((b, bi) => (
                        <li key={bi} className="text-gray-800">
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              )}
            </div>
          </article>

          {/* SIDEBAR — stays visually on the right in LTR; moves to the right in RTL by ordering first */}
          <aside className={`lg:col-span-4 lg:sticky lg:top-24 h-fit ${isRTL ? "lg:order-1" : "lg:order-2"}`}>
            <RightTitleList
              items={others}
              activeId={sectionId}
              onSelect={(id) => navigate(`/services/${country}/section/${id}`)}
            />
            {/* Hint/assistive text could be added here if needed */}
          </aside>
        </div>
      </div>
    </section>
  );
}
