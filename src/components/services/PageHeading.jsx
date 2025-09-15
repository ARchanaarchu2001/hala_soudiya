// src/components/services/PageHeading.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function PageHeading({ title, subtitle, titleDir, align = "start" }) {
  const { i18n } = useTranslation();
  const dir = titleDir || i18n.dir();
  const alignClass =
    align === "center" ? "text-center" :
    align === "end"    ? "text-end"    : "text-start";

  return (
    <div className={`mb-8 sm:mb-10 ${alignClass}`}>
      <h1 dir={dir} className={`text-3xl sm:text-4xl font-black tracking-tight text-gray-900 ${alignClass}`}>
        {title}
      </h1>
      {subtitle && (
        <p dir={dir} className={`mt-2 text-gray-600 ${alignClass}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
