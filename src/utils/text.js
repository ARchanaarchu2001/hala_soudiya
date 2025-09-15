export const toText = (v) =>
  typeof v === "string" ? v :
  Array.isArray(v) ? v.join(" ") :
  v == null ? "" : String(v);
