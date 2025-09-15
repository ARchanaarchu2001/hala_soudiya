import React from "react";
import { rgba, TINT } from "./Theme";

const Background = ({ src = "/assets/about-2.jpg", tint = TINT, opacity = 0.55 }) => (
  <div className="absolute inset-0 -z-10">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url("${src}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(5px)",
        transform: "scale(1.05)",
      }}
    />
    <div className="absolute inset-0" style={{ backgroundColor: rgba(tint, opacity) }} />
  </div>
);

export default Background;
