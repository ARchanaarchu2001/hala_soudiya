// Subtle lattice background for the page
const GOLD = "#A29061";
const enc = (s) => encodeURIComponent(s).replace(/%20/g, " ");

const tile = `
<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>
  <g fill='none' stroke='${GOLD}' stroke-opacity='0.16' stroke-width='2'>
    <path d='M60 30 A30 30 0 0 1 90 60 A30 30 0 0 1 60 90 A30 30 0 0 1 30 60 A30 30 0 0 1 60 30 Z'/>
    <circle cx='60' cy='0'   r='60'/>
    <circle cx='60' cy='120' r='60'/>
    <circle cx='0'   cy='60' r='60'/>
    <circle cx='120' cy='60' r='60'/>
    <circle cx='0'   cy='0'   r='60'/>
    <circle cx='120' cy='0'   r='60'/>
    <circle cx='0'   cy='120' r='60'/>
    <circle cx='120' cy='120' r='60'/>
  </g>
</svg>`;

export const PATTERN_URL = `url("data:image/svg+xml,${enc(tile)}")`;

export const pagePatternStyle = {
  backgroundColor: "rgba(162,144,97,0.06)",
  backgroundImage: PATTERN_URL,
  backgroundSize: "50px 50px",
  backgroundRepeat: "repeat",
  backgroundAttachment: "fixed",
};
