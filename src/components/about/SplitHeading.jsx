import React from "react";

/**
 * Props:
 * - top, bottom: strings
 * - color: text color
 * - dir: "ltr" | "rtl"  (defaults to "ltr")
 * - align: "start" | "end" | "center"
 *   If not provided, it auto-uses "end" for rtl and "start" for ltr.
 */
export default function SplitHeading({
  top = "",
  bottom = "",
  color,
  dir = "ltr",
  align,
}) {
  const isRTL = dir === "rtl";
  const finalAlign = align ?? (isRTL ? "end" : "start");

  const textAlignClass =
    finalAlign === "center"
      ? "text-center"
      : finalAlign === "end"
      ? "text-right"
      : "text-left";

  const justifyClass =
    finalAlign === "center"
      ? "justify-center"
      : finalAlign === "end"
      ? "justify-end"
      : "justify-start";

  const renderWords = (s) =>
    String(s)
      .split(/\s+/)
      .filter(Boolean)
      .map((w, i) => (
        <span key={i} className="mx-1">
          {w}
        </span>
      ));

  return (
    <h2
      dir={dir}
      className={`text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${textAlignClass} [text-wrap:balance]`}
      style={{ color }}
    >
      <span className={`inline-flex flex-wrap ${justifyClass}`}>
        {renderWords(top)}
      </span>
      {bottom && (
        <>
          <br />
          <span className={`inline-flex flex-wrap ${justifyClass}`}>
            {renderWords(bottom)}
          </span>
        </>
      )}
    </h2>
  );
}
