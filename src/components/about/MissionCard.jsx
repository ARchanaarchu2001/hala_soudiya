import React from "react";
import { rgba, SECONDARY, PRIMARY } from "./Theme";

const MissionVisionCard = ({ title, text, bg = "/assets/mission.jpg" }) => (
  <div className="group relative min-h-[22rem] sm:h-96">
    <div className="absolute inset-0 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" style={{ backgroundColor: SECONDARY }} />
    <div className="absolute -inset-4 rounded-3xl opacity-10 blur-2xl group-hover:opacity-20 transition-all duration-700" style={{ backgroundColor: SECONDARY }} />
    <div
      className="relative h-full rounded-3xl border-2 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-4 overflow-hidden"
      style={{ borderColor: rgba(SECONDARY, 0.3), boxShadow: `0 25px 50px -12px ${rgba(SECONDARY, 0.15)}` }}
    >
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${bg}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/15 transition-all duration-500" />
      <div className="relative h-full flex flex-col justify-end p-7 sm:p-10">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">{title}</h3>
        <div className="w-14 sm:w-16 h-1 rounded-full mb-4" style={{ backgroundColor: PRIMARY }} />
        <p className="text-white/90 leading-relaxed text-base sm:text-lg">{text}</p>
      </div>
    </div>
  </div>
);

export default MissionVisionCard;
