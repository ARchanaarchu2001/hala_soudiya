import React from "react";
import { TEXT, PRIMARY } from "./Theme";

const Stat = ({ value, label, color = TEXT }) => (
  <div className="text-center">
    <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2" style={{ color }}>{value}</div>
    <div className="text-[11px] sm:text-sm uppercase tracking-wider opacity-90">{label}</div>
  </div>
);

const StatsRow = ({ t, lang }) => (
  <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-white/20">
    <Stat value="2017" color={PRIMARY} label={t("about.stats.founded", { defaultValue: lang.startsWith("ar") ? "تأسس" : "Founded" })} />
    <Stat value="3+"   color={PRIMARY} label={t("about.stats.countries", { defaultValue: lang.startsWith("ar") ? "دول" : "Countries" })} />
    <Stat value="100%"                label={t("about.stats.dedicated", { defaultValue: lang.startsWith("ar") ? "فريق متخصص" : "Dedicated" })} />
  </div>
);

export default StatsRow;
