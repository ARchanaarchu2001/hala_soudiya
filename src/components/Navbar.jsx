// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

/** Brand + layout constants */
const BRAND = "#000000";          // underline / accents
const BEIGE = "#EBE3D7";
const BORDER = "rgba(0,0,0,0.08)";
const BAR_HEIGHT = 72;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sync doc dir/lang (layout stays LTR in the navbar)
  const applyDirLang = (lng) => {
    const dir = i18n.dir(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = dir;
    document.body.dir = dir;
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    applyDirLang(lng);
  };
  useEffect(() => {
    applyDirLang(i18n.language || "en");
  }, [i18n.language]);

  // Track scroll for transparent header state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Observe sections on home page
  useEffect(() => {
    if (location.pathname !== "/") return;
    const sections = document.querySelectorAll("section[id], main section[id]");
    if (!sections.length) return;
    let currentActive = "";
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisible = "";
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target.id.toLowerCase();
          }
        });
        if (mostVisible && mostVisible !== currentActive) {
          currentActive = mostVisible;
          setActiveItem(mostVisible);
        }
      },
      { threshold: 0.35 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [location.pathname]);

  // Keep "Services" highlighted on /services*
  useEffect(() => {
    if (location.pathname.startsWith("/services")) setActiveItem("services");
  }, [location.pathname]);

  // Close mobile overlay on route change (including back/forward)
  useEffect(() => {
    if (isOpen) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Improved body scroll lock (with scrollbar compensation)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.paddingRight = prevPaddingRight || "";
    }
    return () => {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.paddingRight = prevPaddingRight || "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Expose --nav-safe so hero can offset itself
  useEffect(() => {
  const applyNavSafe = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const h = isMobile ? 64 : 72; // BAR_HEIGHT - 8 on mobile
    const navSafe = `calc(${h}px + env(safe-area-inset-top))`;
    document.documentElement.style.setProperty("--nav-safe", navSafe);
    document.documentElement.style.scrollPaddingTop = navSafe;
  };
  applyNavSafe();
  window.addEventListener("resize", applyNavSafe, { passive: true });
  return () => window.removeEventListener("resize", applyNavSafe);
}, []);


  const navItems = ["home", "services", "about", "contact"];

  // Navigation / scrolling behavior
  const handleScrollTo = (item) => {
    const id = item.toLowerCase();
    setActiveItem(id);

    if (id === "services") {
      if (!location.pathname.startsWith("/services")) {
        navigate("/services");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setIsOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      setIsOpen(false);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  // Icons
  const MenuIcon = (props) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
  const CloseIcon = (props) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  // Visual states
  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled;

  const headerBgClass = isTransparent
    ? "bg-transparent"
    : "bg-[#EBE3D7] backdrop-blur supports-[backdrop-filter]:bg-[#EBE3D7]/95 shadow-sm";

  const linkColorClass = isTransparent ? "text-white" : "text-black";
  const langBtnBorder = isTransparent ? "rgba(255,255,255,.55)" : `${BRAND}33`;
  const langBtnText   = isTransparent ? "#FFFFFF" : BRAND;
  const underlineColor = isTransparent ? "#FFFFFF" : BRAND;
  const showBorder = isTransparent ? "1px solid transparent" : `1px solid ${BORDER}`;

  // -------------------------------------------------
  // Mobile Overlay via Portal (below header; dim backdrop + white card)
  // -------------------------------------------------
  const mobileOverlay = isOpen
    ? createPortal(
        <div
          id="mobile-overlay"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90]
                     bg-black/50 supports-[backdrop-filter]:bg-black/30 backdrop-blur-sm
                     pt-[var(--nav-safe)]"
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
        >
          <div
            className="mx-auto mt-4 w-[88%] max-w-sm rounded-2xl
                       bg-white/95 shadow-2xl ring-1 ring-black/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <nav dir={i18n.dir()} aria-label="Mobile">
              {navItems.map((item, idx) => {
                const active = activeItem === item;
                const isLast = idx === navItems.length - 1;
                return (
                  <button
                    key={item}
                    onClick={() => handleScrollTo(item)}
                    className={`w-full text-left px-5 py-4 text-lg font-semibold transition
                                ${active ? "bg-gray-50 text-gray-900" : "text-gray-900 hover:bg-gray-50/70"}`}
                    style={{ borderBottom: isLast ? "none" : `1px solid ${BORDER}` }}
                  >
                    {t(`nav.${item}`)}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header
        dir="ltr" // lock LTR layout
        className={`fixed top-0 left-0 right-0 z-[100] transition-all ${headerBgClass}`}
        style={{ borderBottom: showBorder }}
        role="navigation"
        aria-label="Main"
      >
        {/* ===== Desktop ===== */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-6 relative flex items-center" style={{ height: BAR_HEIGHT }}>
            {/* Left — language button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => changeLanguage(i18n.language?.startsWith("ar") ? "en" : "ar")}
                className="px-4 py-2 text-sm rounded-full border transition"
                style={{ color: langBtnText, borderColor: langBtnBorder }}
                aria-label="Toggle language"
              >
                {i18n.language?.startsWith("ar") ? "EN" : "العربية"}
              </button>
            </div>

            {/* Center — logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <button
                type="button"
                onClick={() => handleScrollTo("home")}
                className="block"
                aria-label="Go to Home"
              >
                <img src="/logo.png" alt="Logo" className="h-12 w-auto object-contain" />
              </button>
            </div>

            {/* Right — nav links */}
            <nav className="ml-auto flex items-center gap-6" aria-label="Primary">
              {["home", "services", "about", "contact"].map((item) => {
                const active = activeItem === item;
                return (
                  <button
                    key={item}
                    onClick={() => handleScrollTo(item)}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex items-center px-1 text-[15px] font-semibold transition-colors ${linkColorClass}`}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <span dir={i18n.dir()} className={linkColorClass}>
                      {t(`nav.${item}`)}
                    </span>
                    <span
                      className="pointer-events-none absolute left-0 right-0 -bottom-px h-[3px] origin-center transition-transform"
                      style={{
                        backgroundColor: underlineColor,
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ===== Mobile (top bar only) ===== */}
        <div className="md:hidden" dir="ltr">
          <div className="px-4 relative flex items-center" style={{ height: BAR_HEIGHT - 8 }}>
            {/* Left — language btn */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeLanguage(i18n.language?.startsWith("ar") ? "en" : "ar")}
                className="px-3 py-1.5 text-sm rounded-full border transition"
                style={{ color: langBtnText, borderColor: langBtnBorder }}
                aria-label="Toggle language"
              >
                {i18n.language?.startsWith("ar") ? "EN" : "العربية"}
              </button>
            </div>

            {/* Center — logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <button type="button" onClick={() => handleScrollTo("home")} className="block" aria-label="Go to Home">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
              </button>
            </div>

            {/* Right — hamburger */}
            <div className="ml-auto">
              <button
                onClick={() => setIsOpen((p) => !p)}
                aria-expanded={isOpen}
                aria-controls="mobile-overlay"
                className="p-2 rounded-full border"
                style={{
                  color: isTransparent ? "#FFFFFF" : "#111111",
                  borderColor: isTransparent ? "rgba(255,255,255,.55)" : BORDER,
                }}
                title={isOpen ? "Close" : "Menu"}
              >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Render mobile overlay via portal (outside header) */}
      {mobileOverlay}
    </>
  );
};

export default Navbar;
