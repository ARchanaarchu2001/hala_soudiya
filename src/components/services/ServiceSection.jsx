// src/pages/ServiceSection.jsx
import React, { useMemo, useEffect } from "react";
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

const BG     = "#f5f0eb";
const BRAND  = "#006C3D";
const BORDER = "rgba(0,0,0,0.08)";
const INK    = "#0f172a";

const SAUDI_ID_TO_INDEX = {
  foreign: 0,
  "with-partner": 1,
  premium: 2,
  "local-gcc": 3,
  "company-types": 4,
  licenses: 5,
};

// ---- CTA (supports variant + custom link) ----
const CtaButton = ({ label, to = "/contact", variant = "primary" }) => {
  const isPrimary = variant === "primary";
  return (
    <Link
      to={to}
      className={[
        "inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition",
        isPrimary ? "text-white hover:opacity-90" : "text-[var(--ink)] hover:bg-gray-50"
      ].join(" ")}
      style={{
        background: isPrimary ? "black" : "white",
        border: `1px solid ${BORDER}`,
        boxShadow: `0 1px 0 ${BORDER}`,
        ["--ink"]: INK,
      }}
    >
      {label}
    </Link>
  );
};

// ---- Right sidebar list (RTL-aware) ----
const RightTitleList = ({ items = [], activeId, onSelect, dir = "ltr" }) => (
  <nav
    aria-label="Other services"
    className="rounded-lg bg-white p-3 shadow-sm"
    style={{ border: `1px solid ${BORDER}` }}
  >
    <ul className="space-y-2">
      {items.map((it) => {
        const active = it.id === activeId;
        return (
          <li key={it.id}>
            <button
              type="button"
              onClick={() => onSelect?.(it.id)}
              aria-current={active ? "page" : undefined}
              className={[
                "w-full px-4 py-3 rounded-md font-medium transition",
                dir === "rtl" ? "text-right" : "text-left",
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
  </nav>
);

export default function ServiceSection() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { country, sectionId } = useParams();

  // Direction helpers
  const dir = i18n.dir(); // "rtl" | "ltr"
  const align = dir === "rtl" ? "text-right" : "text-left";
  const padStart = dir === "rtl" ? "pr-5" : "pl-5";

  useEffect(() => {
    document.documentElement.lang = i18n.language || "en";
    document.documentElement.dir = dir;
  }, [i18n.language, dir]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [country, sectionId]);

  const SRaw = O(t("services.saudi",   { returnObjects: true, defaultValue: {} }));
  const BRaw = O(t("services.bahrain", { returnObjects: true, defaultValue: {} }));
  const URaw = O(t("services.uae",     { returnObjects: true, defaultValue: {} }));

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

  const others = useMemo(() => {
    if (country === "saudi") {
      const ids = ["foreign","with-partner","premium","local-gcc","company-types","licenses"];
      return ids.map((id) => {
        const node =
          id === "foreign"       ? O(SRaw.foreign)
        : id === "with-partner"  ? O(SRaw.withPartner)
        : id === "premium"       ? O(SRaw.premium)
        : id === "local-gcc"     ? O(SRaw.localGCC)
        : id === "company-types" ? O(SRaw.companyTypes)
        : id === "licenses"      ? O(SRaw.licenses)
        : {};
        return { id, title: node?.title || node?.heading || "" };
      });
    }
    const items = country === "bahrain" ? asArray(BRaw.items) : asArray(URaw.items);
    function asArray(v){return Array.isArray(v)?v:[]}
    return items.map((it, idx) => ({ id: `sec-${idx}`, title: it?.title || it?.name || "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, sectionId, i18n.language]);

  if (!panel) {
    return (
      <section dir={dir} className="min-h-screen" style={{ background: BG }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <PageHeading title={t("services.heading", { defaultValue: "Our Services" })} />
          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm" style={{ border: `1px solid ${BORDER}` }}>
            <p className="text-gray-700">
              {t("services.notFound", { defaultValue: "Sorry, that section was not found." })}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-md hover:bg-gray-50"
                style={{ border: `1px solid ${BORDER}` }}
              >
                {t("common.back", { defaultValue: "Back" })}
              </button>
              <Link
                to={`/services/${country}`}
                className="px-4 py-2 rounded-md hover:bg-gray-50"
                style={{ border: `1px solid ${BORDER}` }}
              >
                {t("services.viewServices", { defaultValue: "View All Services" })}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const arrow = dir === "rtl" ? "←" : "←";

  return (
    <section dir={dir} className="min-h-screen" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="flex items-center justify-between gap-4">
          <PageHeading title={title} titleDir={dir} />
          <Link
            to={`/services/${country}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white hover:bg-gray-50 "
            style={{ border: `1px solid ${BORDER}` }}
          >
            <span>{arrow}</span>
            {/* <span className="font-medium">
              {t("services.backToCountry", { defaultValue: "Back to Services" })}
            </span> */}
            <span className="font-medium">
  {i18n.language.startsWith("ar") ? "عودة إلى الخدمات" : "Back to Services"}
</span>

          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN */}
          <article className="lg:col-span-8 p-1">
            <div className="rounded-lg p-6 md:p-8 leading-relaxed">
              <h2 className={`text-2xl font-bold mb-5 ${align}`} style={{ color: INK }} dir={dir}>
                {panel.title}
              </h2>

              {/* Variants */}
              {"type" in panel && panel.type === "companyTypes" ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {A(panel.items).map((it, i) => (
                    <div
                      key={i}
                      className="rounded-md p-4"
                      style={{ background: BG, border: `1px solid ${BORDER}` }}
                    >
                      <div className={`font-semibold mb-1 ${align}`} dir={dir}>{it.name}</div>
                      {it.desc ? (
                        <RichText text={it.desc} className={`text-gray-800 text-[15px] ${align}`} dir={dir} />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : "type" in panel && panel.type === "licenses" ? (
                <div className="space-y-4">
                  <ul className={`list-disc ${padStart} space-y-3 ${align}`} dir={dir}>
                    {A(panel.groups).map((g, gi) => (
                      <li key={gi} className={`text-gray-900 ${align}`}>
                        <span className="font-semibold">{g.name}</span>
                        {A(g.items).length > 0 && (
                          <ul className={`list-disc ${padStart} mt-1 space-y-1 ${align}`} dir={dir}>
                            {g.items.map((li, lii) => (
                              <li key={lii} className={`text-gray-800 ${align}`}>
                                <RichText text={li} className={`text-gray-800 ${align}`} dir={dir} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* CTA at the very end for licenses */}
                  {panel.contactCta && (
                    <div className="mt-4">
                      <RichText text="<contact>Contact us</contact>" dir={dir} />
                    </div>
                  )}
                </div>
              ) : "isHtml" in panel && panel.isHtml ? (
                // HTML blocks already include the CTA inside their content
                <div
                  dir={dir}
                  className={`prose max-w-none prose-li:my-1 prose-h5:mt-4 prose-h5:mb-2 ${align}`}
                  style={{ color: INK }}
                  dangerouslySetInnerHTML={{ __html: panel.content }}
                />
              ) : (
                <>
                  {panel.content ? (
                    <RichText text={panel.content} className={`text-[17px] ${align}`} dir={dir} />
                  ) : null}

                  {A(panel.bullets).length ? (
                    <>
                      <ul className={`mt-4 list-disc ${padStart} space-y-1 ${align}`} dir={dir}>
                        {panel.bullets.map((b, bi) => (
                          <li key={bi} className="text-gray-800">
                            <RichText text={b} className={`text-gray-800 ${align}`} dir={dir} />
                          </li>
                        ))}
                      </ul>

                      {/* CTA after bullets for simple panels */}
                      {panel.contactCta && (
                        <div className="mt-4">
                          <RichText text="<contact>Contact us</contact>" dir={dir} />
                        </div>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </div>

            {/* CTA row: Contact + More info */}
            <div className="mt-6 flex flex-wrap justify-center gap-3" dir={dir}>
              <CtaButton
                label={t("services.contactCta", { defaultValue: "Contact us" })}
                to="/contact"
                variant="primary"
              />
             
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <RightTitleList
              items={others}
              activeId={sectionId}
              dir={dir}
              onSelect={(id) => navigate(`/services/${country}/section/${id}`)}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
