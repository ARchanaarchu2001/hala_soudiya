// src/utils/servicesUtils.js
export const asArray = (v) => (Array.isArray(v) ? v : []);
export const ensureObject = (v) =>
  v && typeof v === "object" && !Array.isArray(v) ? v : {};
export const isNonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
export const toText = (v) =>
  typeof v === "string" ? v : v?.title ?? v?.name ?? (v ?? "");

/**
 * Build Saudi panels with stable ids for deep links.
 * No auto-append. We keep the strings exactly as in i18n JSON.
 * The page will render these with <RichText> so <contact> tags work.
 */
export const buildSaudiPanels = (S) => {
  const out = [];

  // 1) Foreign
  const F = ensureObject(S.foreign);
  if (isNonEmpty(F?.title)) {
    out.push({
      id: "foreign",
      title: toText(F.title),
      isHtml: false,
      content: toText(F.intro || ""),
      bullets: asArray(F.points).map(toText)
        .concat(isNonEmpty(F.reqTitle) ? [toText(F.reqTitle)] : [])
        .concat(asArray(F.requirements).map(toText)),
      // no contactCta unless you explicitly want an extra CTA at the end
    });
  }

  // 2) With partner
  const WP = ensureObject(S.withPartner);
  if (isNonEmpty(WP?.title)) {
    out.push({
      id: "with-partner",
      title: toText(WP.title),
      isHtml: false,
      content: toText(WP.intro || ""),
      bullets: []
        .concat(asArray(WP.points).map(toText))
        .concat(isNonEmpty(WP.reqTitle) ? [toText(WP.reqTitle)] : [])
        .concat(asArray(WP.requirements).map(toText)),
    });
  }

  // 3) Premium (conditions can be string or array)
  const PR = ensureObject(S.premium);
  if (isNonEmpty(PR?.title)) {
    const text = toText(PR.text || "");
    const conditions = Array.isArray(PR.conditions)
      ? PR.conditions.map(toText)
      : isNonEmpty(PR.conditions)
        ? [toText(PR.conditions)]
        : [];
    out.push({
      id: "premium",
      title: toText(PR.title),
      isHtml: false,
      content: text,
      bullets: conditions,
    });
  }

  // 4) Local/GCC (bullets)
  const LG = ensureObject(S.localGCC);
  if (isNonEmpty(LG?.title)) {
    out.push({
      id: "local-gcc",
      title: toText(LG.title),
      isHtml: false,
      content: "",
      bullets: asArray(LG.items).map(toText),
    });
  }

  // 5) Company types (structured; desc is rendered with <RichText> in the page)
  const CT = ensureObject(S.companyTypes);
  if (isNonEmpty(CT?.heading)) {
    out.push({
      id: "company-types",
      title: toText(CT.heading),
      type: "companyTypes",
      items: asArray(CT.items).map((it) => ({
        name: toText(it?.name ?? it),
        desc: toText(it?.desc ?? ""),
      })),
    });
  }

  // 6) Licenses (structured; items rendered via <RichText> in the page)
  const LIC = ensureObject(S.licenses);
  if (isNonEmpty(LIC?.heading)) {
    out.push({
      id: "licenses",
      title: toText(LIC.heading),
      type: "licenses",
      groups: asArray(LIC.groups).map((g) => ({
        name: toText(g?.name ?? g),
        items: asArray(g?.items).map((x) => toText(x)),
      })),
    });
  }

  return out;
};

/**
 * Build simple panels (Bahrain/UAE) and carry bullets through.
 * No auto-append; strings are passed as-is so <contact> works only where present.
 */
export const buildSimplePanels = (obj) =>
  asArray(obj.items).map((it, i) => ({
    id: `sec-${i}`,
    title: toText(it?.title ?? it),
    isHtml: false,
    content: toText(it?.desc ?? ""),
    bullets: asArray(it?.bullets).map(toText),
  }));

/** Optional helper if you need country tiles elsewhere */
export const buildCountryCards = (labels) => [
  {
    key: "saudi",
    label: toText(labels.saudi),
    flagSrc: "/icons/saudi.png",
    bgSrc: "/assets/saudi1.jpg",
    overlay: "#0c6b64",
  },
  {
    key: "bahrain",
    label: toText(labels.bahrain),
    flagSrc: "/icons/bahran.png",
    bgSrc: "/assets/bahrain.jpg",
    overlay: "#75516b",
  },
  {
    key: "uae",
    label: toText(labels.uae),
    flagSrc: "/icons/uae3.png",
    bgSrc: "/assets/uae.jpg",
    overlay: "#0e3a5a",
  },
];
