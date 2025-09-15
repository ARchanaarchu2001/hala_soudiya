// src/utils/servicesUtils.js
export const asArray = (v) => (Array.isArray(v) ? v : []);
export const ensureObject = (v) =>
  v && typeof v === "object" && !Array.isArray(v) ? v : {};
export const isNonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
export const toText = (v) =>
  typeof v === "string" ? v : v?.title ?? v?.name ?? (v ?? "");

// Force bullet lists with logical padding (works LTR & RTL)
const ul = (arr) => {
  const items = asArray(arr);
  if (!items.length) return "";
  return `<ul class="list-disc ps-6 space-y-1">${items
    .map((x) => `<li>${toText(x)}</li>`)
    .join("")}</ul>`;
};

/**
 * Build Saudi panels with stable ids for deep links.
 * - "foreign" and "with-partner" show both points + requirements as bullet lists.
 * - Some panels return isHtml so the page drops in the HTML content.
 * - Others return structured "type" with data the page renders itself.
 */
export const buildSaudiPanels = (S) => {
  const out = [];

  // 1) Foreign
  const F = ensureObject(S.foreign);
  if (F.title) {
    const intro    = isNonEmpty(F.intro) ? `<p>${toText(F.intro)}</p>` : "";
    const pointsUL = ul(F.points);
    const reqTitle = isNonEmpty(F.reqTitle) ? `<h5>${toText(F.reqTitle)}</h5>` : "";
    const reqsUL   = ul(F.requirements);
    out.push({
      id: "foreign",
      title: toText(F.title),
      isHtml: true,
      content: `${intro}${pointsUL}${reqTitle}${reqsUL}`,
    });
  }

  // 2) With partner
  const WP = ensureObject(S.withPartner);
  if (WP.title) {
    const intro    = isNonEmpty(WP.intro) ? `<p>${toText(WP.intro)}</p>` : "";
    const pointsUL = ul(WP.points);
    const reqTitle = isNonEmpty(WP.reqTitle) ? `<h5>${toText(WP.reqTitle)}</h5>` : "";
    const reqsUL   = ul(WP.requirements);
    out.push({
      id: "with-partner",
      title: toText(WP.title),
      isHtml: true,
      content: `${intro}${pointsUL}${reqTitle}${reqsUL}`,
    });
  }

  // 3) Premium
  // 3) Premium  ✅ now supports a separate "conditions" field (string or array)
const PR = ensureObject(S.premium);
if (PR.title) {
  const textHTML =
    isNonEmpty(PR.text) ? `<p>${toText(PR.text)}</p>` : "";

  // If you ever add a dedicated title (e.g., "الشروط" / "Conditions"), you can
  // put it in premium.conditionsTitle. Otherwise we'll just print the conditions.
  const condTitle = isNonEmpty(PR.conditionsTitle) ? toText(PR.conditionsTitle) : "";

  // Conditions can be a string ("Conditions: ...") OR an array of bullets.
  const condListHTML = Array.isArray(PR.conditions) ? (
    // render as bullet list when array
    `<ul class="list-disc ps-6 space-y-1">${asArray(PR.conditions).map(c => `<li>${toText(c)}</li>`).join("")}</ul>`
  ) : (
    // otherwise render the single string (keeps your Arabic "الشروط: ..." intact)
    isNonEmpty(PR.conditions) ? `<p><strong>${toText(PR.conditions)}</strong></p>` : ""
  );

  const conditionsHTML = condListHTML
    ? (condTitle ? `<h5>${condTitle}</h5>${condListHTML}` : condListHTML)
    : "";

  out.push({
    id: "premium",
    title: toText(PR.title),
    isHtml: true,                 // ⬅ switched to HTML so we can show both parts
    content: `${textHTML}${conditionsHTML}`,
  });
}


  // 4) Local/GCC (bullets)
  const LG = ensureObject(S.localGCC);
  if (LG.title) {
    out.push({
      id: "local-gcc",
      title: toText(LG.title),
      isHtml: true,
      content: ul(LG.items),
    });
  }

  // 5) Company types (structured)
  const CT = ensureObject(S.companyTypes);
  if (CT.heading) {
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

  // 6) Licenses (structured)
  const LIC = ensureObject(S.licenses);
  if (LIC.heading) {
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
 */
export const buildSimplePanels = (obj) =>
  asArray(obj.items).map((it, i) => ({
    id: `sec-${i}`,
    title: toText(it?.title ?? it),
    isHtml: false,
    content: toText(it?.desc ?? ""),
    bullets: asArray(it?.bullets).map((b) => toText(b)),
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
