// src/components/common/RichText.jsx
import React, { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Lightweight, safe tag parser:
 *  - <contact>Contact us</contact> -> link to Contact (scroll on current page or navigate to /#contact)
 *  - <ext href="https://...">Label</ext> -> external <a target="_blank" rel="noopener">
 */
const RichText = ({ text = "", className = "" }) => {
  const raw = typeof text === "string" ? text : String(text ?? "");
  if (!raw) return null;

  const navigate = useNavigate();
  const location = useLocation();

  const trySmoothScroll = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    return false;
  }, []);

  const goToContact = (e) => {
    // If contact is on this page, just scroll
    if (trySmoothScroll("contact")) {
      e.preventDefault();
      return;
    }

    // Otherwise navigate to home with hash, then scroll after it mounts
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/#contact"); // SPA navigation
    } else {
      // already on / but the element isn't mounted yet (rare), set hash anyway
      navigate("#contact");
    }

    // Poll briefly until the section is in the DOM, then smooth-scroll
    let tries = 0;
    const tick = () => {
      if (trySmoothScroll("contact") || tries > 30) return; // stop after ~1.5s
      tries += 1;
      setTimeout(tick, 50);
    };
    setTimeout(tick, 50);
  };

  const nodes = [];
  const re = /<(contact|ext)(?:\s+href="([^"]*)")?\s*>(.*?)<\/\1>/gi;

  let lastIndex = 0;
  let match;
  let key = 0;

  const pushText = (slice) => {
    if (!slice) return;
    const parts = slice.split(/\n/);
    parts.forEach((part, i) => {
      if (part) nodes.push(<span key={`t-${key++}`}>{part}</span>);
      if (i < parts.length - 1) nodes.push(<br key={`br-${key++}`} />);
    });
  };

  while ((match = re.exec(raw)) !== null) {
    const [full, tag, href, inner = ""] = match;
    const start = match.index;

    // text before the tag
    pushText(raw.slice(lastIndex, start));

    if (tag.toLowerCase() === "contact") {
      nodes.push(
        <a
          key={`c-${key++}`}
          href="/#contact"              // graceful fallback if JS/router not available
          onClick={goToContact}         // smart scroll-or-navigate
          className="text-[#000000] underline hover:no-underline font-semibold"
        >
          {inner || "contact us"}
        </a>
      );
    } else {
      // <ext href="...">...</ext>
      nodes.push(
        <a
          key={`e-${key++}`}
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#000000] hover:underline font-semibold"
        >
          {inner}
        </a>
      );
    }

    lastIndex = start + full.length;
  }

  // remaining text after the last tag
  pushText(raw.slice(lastIndex));

  return <span className={className}>{nodes}</span>;
};

export default RichText;
