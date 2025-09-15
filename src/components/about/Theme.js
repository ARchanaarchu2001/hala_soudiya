// src/components/about/Theme.js (or wherever your theme lives)

/** Brand palette */
export const GREEN        = "#000000"; // primary green
export const GREEN_DARK   = "#000000";
export const GREEN_MID    = "#000000";
export const GREEN_LIGHT  = "#000000";
export const GREEN_TINT   = "#000000";

export const YELLOW       = "#d4af37"; // accent gold/yellow
export const YELLOW_DARK  = "#b9972c";
export const YELLOW_MID   = "#e3c75a";
export const YELLOW_TINT  = "#f6ebc7";

/** Use these as your main tokens */
export const PRIMARY   = GREEN;       // app primary
export const SECONDARY = GREEN_DARK;  // supportive green
export const ACCENT    = YELLOW;      // highlight / CTAs
export const TEXT      = "#0f172a";   // near-black for better readability
export const TINT      = "#d4af37";   // soft overlay tint (kept from before)

/** Utils */
export const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `${r}, ${g}, ${b}`;
};

export const rgba = (hex, a) => `rgba(${hexToRgb(hex)}, ${a})`;

/** Optional: quick gradients you can reuse */
export const GOLDEN_RIBBON_BG = `
  conic-gradient(from 215deg at 92% 8%,  ${YELLOW} 0 52deg, transparent 56deg 360deg),
  conic-gradient(from  25deg at 78% 18%,  ${YELLOW_DARK} 0 38deg, transparent 44deg 360deg),
  radial-gradient(85% 72% at 100% 100%, transparent 58%, ${rgba(GREEN, .92)} 60%, ${GREEN_DARK} 100%)
`;

export const GOLDEN_HORIZON_BG = `
  linear-gradient(140deg, transparent 0 35%, ${YELLOW} 36%, ${YELLOW_DARK} 52%, transparent 60%),
  radial-gradient(65% 55% at 30% 40%, ${rgba(YELLOW, .15)} 0%, transparent 65%),
  radial-gradient(90% 80% at 100% 100%, transparent 58%, ${rgba(GREEN, .92)} 60%, ${GREEN_DARK} 100%)
`;
