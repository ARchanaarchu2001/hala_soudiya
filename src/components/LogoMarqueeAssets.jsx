import React, { useMemo } from "react";

const LOGOS = [
  "/assets/logo0.png","/assets/logo1.png","/assets/logo2.png","/assets/logo3.png",
  "/assets/logo4.png","/assets/logo5.png","/assets/logo6.png","/assets/logo7.png",
  "/assets/logo8.png","/assets/logo9.png","/assets/logo10.png","/assets/logo11.png",
  "/assets/logo12.png","/assets/logo13.png","/assets/logo14.png","/assets/logo15.png",
  "/assets/logo16.png","/assets/logo17.png","/assets/logo18.png","/assets/logo19.png",
  "/assets/logo20.png","/assets/logo21.png","/assets/logo22.png","/assets/logo23.png",
];

export default function LogoMarqueeAssets({
  height = 60,
  gap = 36,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
}) {
  const items = useMemo(() => [...LOGOS, ...LOGOS], []);

  return (
    <div
      className="marquee group w-full overflow-hidden relative"
      style={{ height }}
      aria-label="Scrolling partner logos"
    >
      <div
        className="
          marqueeTrack flex flex-nowrap whitespace-nowrap w-max shrink-0
          items-center
        "
        style={{
          gap: `${gap}px`,
          height,
          animationName: "marqueeScroll",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {items.map((src, i) => (
          <span
            key={`${src}-${i}`}
            className="shrink-0 inline-flex items-center justify-center"
            style={{ height }}
          >
            <img
              src={src}
              alt={`logo-${i}`}
              loading="lazy"
              draggable="false"
              height={height}
              style={{
                height,
                width: "auto",
                objectFit: "contain",
                flex: "0 0 auto",     // extra safety
              }}
            />
          </span>
        ))}
      </div>

      <style>
        {`
          ${pauseOnHover ? `.group:hover .marqueeTrack { animation-play-state: paused; }` : ""}
          @keyframes marqueeScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}
