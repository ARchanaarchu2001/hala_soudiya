// Map visible labels -> canonical keys we use in ServicesPage
export const REGION_KEY_BY_LABEL = {
  en: {
    "Saudi Arabia": "saudi",
    "Bahrain": "bahrain",
    "United Arab Emirates": "uae",
  },
  ar: {
    "المملكة العربية السعودية": "saudi",
    "مملكة البحرين": "bahrain",
    "الإمارات العربية المتحدة": "uae",
  },
};

// Turn a label into "saudi" | "bahrain" | "uae" (fallback makes a slug)
export const regionKeyFrom = (label, i18n) => {
  const lang = i18n?.language?.startsWith("ar") ? "ar" : "en";
  const text = String(label || "").trim();
  return (
    REGION_KEY_BY_LABEL[lang]?.[text] ||
    text.toLowerCase().replace(/\s+/g, "-")
  );
};

// Single event name for consistency
export const OPEN_SERVICES_EVENT = "open-services-country";

// Helper to broadcast the selection to ServicesPage
export const openServices = (countryKey) => {
  window.dispatchEvent(new CustomEvent(OPEN_SERVICES_EVENT, { detail: { country: countryKey } }));
};
