import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("HOME");
  const [isOpen, setIsOpen] = useState(false);
  const clickSoundRef = useRef(null);

  const navItems = ["HOME", "ABOUT", "SERVICES", "CONTACT"];

  useEffect(() => {
    const sections = document.querySelectorAll("section[id], div[id]");
    let currentActive = "";

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisibleSection = "";

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id.toUpperCase();
          }
        });

        if (mostVisibleSection && mostVisibleSection !== currentActive) {
          currentActive = mostVisibleSection;
          setActiveItem(mostVisibleSection);
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play();
    }
  };


  const handleScrollTo = (item) => {
     playClickSound();
    setActiveItem(item);
    const section = document.getElementById(item.toLowerCase());
    section?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
  className="fixed top-4 z-50 w-full px-4 flex justify-end md:left-1/2 md:transform md:-translate-x-1/2 md:justify-center"
>
<audio ref={clickSoundRef} src="/sounds/1.mp3" preload="auto" />

      {/* Desktop Nav */}
      <div className="hidden md:flex px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-[#A29061]/30 shadow-lg space-x-2">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => handleScrollTo(item)}
            className={`relative font-semibold px-5 py-2.5 rounded-full transition-all duration-300 group overflow-hidden
              ${activeItem === item
                ? "bg-white text-[#A29061] shadow-lg scale-105"
                : "bg-white/90 text-gray-800 hover:bg-white hover:shadow-md hover:scale-105"}`}
          >
            {/* Shine effect */}
            <span className="absolute left-[-100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 group-hover:animate-shine"></span>

            <span className="relative z-10 text-sm">{item}</span>

            {activeItem === item && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#A29061] rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex justify-end pr-2">
        <button
          onClick={() =>{
            playClickSound();
             setIsOpen(!isOpen)
          }}
          className="bg-white/90 p-2 rounded-full shadow-md border border-[#A29061]/30"
        >
          <svg
            className="w-6 h-6 text-[#A29061]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 right-4 w-64  bg-white rounded-xl shadow-lg py-2 px-4  mx-auto">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleScrollTo(item)}
              className={`block w-full text-left py-3 text-sm font-semibold rounded-lg 
                ${activeItem === item
                  ? "bg-[#A29061]/10 text-[#A29061]"
                  : "text-gray-700 hover:bg-[#A29061]/10"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Shine Animation */}
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .animate-shine {
          animation: shine 1.2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
