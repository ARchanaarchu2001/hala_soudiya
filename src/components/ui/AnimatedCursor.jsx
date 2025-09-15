import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * DoubleRingCursor
 *  - Center grey dot + thin white ring + darker outer ring
 *  - Subtle grow on hover over links/buttons
 *  - Click ripple pulse
 *  - Hides native cursor on desktop (configurable)
 */
const AnimatedCursor = ({
  size = 30,             // outer ring diameter
  dot = 14,              // center dot diameter
  outer = "#6B7280",     // outer ring (gray-600)
  inner = "#FFFFFF",     // inner ring (white)
  fill  = "#9CA3AF",     // center dot (gray-400)
  border = 2,            // ring stroke width
  hideNative = true,
  hoverSelectors = "a,button,[role='button'],.cursor-link,[data-cursor='link']",
}) => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [burstKey, setBurstKey] = useState(0); // resets ripple animation

  // position (snappy but stable)
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xs = useSpring(x, { stiffness: 900, damping: 55, mass: 0.25 });
  const ys = useSpring(y, { stiffness: 900, damping: 55, mass: 0.25 });

  useEffect(() => {
    // don’t render on touch
    if (window.matchMedia?.("(pointer: coarse)")?.matches) return;

    const move = (e) => {
      setVisible(true);
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    };
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);
    const down  = () => { setPressed(true); setBurstKey((k) => k + 1); };
    const up    = () => setPressed(false);
    const hover = (e) => setHovering(Boolean(e.target?.closest?.(hoverSelectors)));

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", hover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", hover);
    };
  }, [x, y, size, hoverSelectors]);

  // hide system cursor globally (desktop)
  useEffect(() => {
    if (!hideNative) return;
    const prev = document.documentElement.style.cursor;
    document.documentElement.style.cursor = "none";
    return () => { document.documentElement.style.cursor = prev; };
  }, [hideNative]);

  const base = "fixed top-0 left-0 pointer-events-none z-[9999]";
  const ringScale = pressed ? 0.95 : hovering ? 1.05 : 1;
  const show = visible ? 1 : 0;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className={base}
        style={{
          x: xs, y: ys, width: size, height: size, opacity: show,
          borderRadius: 9999, border: `${border}px solid ${outer}`,
          boxShadow: "0 1px 6px rgba(0,0,0,0.14)",
        }}
        animate={{ scale: ringScale }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        {/* Inner (white) ring with a small gap */}
        <div
          style={{
            position: "absolute",
            inset: border + 3,
            borderRadius: 9999,
            border: `${border}px solid ${inner}`,
            opacity: 0.95,
          }}
        />
        {/* Center filled dot */}
        <div
          style={{
            position: "absolute",
            width: dot, height: dot,
            left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 9999,
            background: fill,
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.45), 0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </motion.div>

      {/* Click ripple (expanding faint ring) */}
      <motion.div
        key={burstKey}
        className={base}
        style={{
          x: xs, y: ys, width: size, height: size,
          borderRadius: 9999, border: `${border}px solid ${outer}`,
          opacity: 0,
        }}
        initial={{ opacity: 0.28, scale: 1 }}
        animate={{ opacity: 0, scale: 1.8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </>
  );
};

export default AnimatedCursor;
