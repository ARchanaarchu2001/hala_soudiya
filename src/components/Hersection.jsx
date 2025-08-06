import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/hero-bg.mp4"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 "></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#A29061]/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl text-white">
        {/* Heading */}
       <motion.h1
  className="text-4xl md:text-6xl font-bold leading-tight flex flex-wrap justify-center text-center"
  style={{
    textShadow: `0 0 30px #A2906150`, // optional golden glow
  }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  }}
>
  {[
    { text: "Officially ", className: "text-white " },
    { text: "Certified", className: "text-[#A29061] " },
    { text: " Saudi ", className: "text-white  " },
    {
      text: "Law Firm",
      className: "bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent",
    },
  ].map((segment, idx) =>
    segment.text.split("").map((char, i) => (
      <motion.span
        key={`${idx}-${i}`}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.4 }}
        className={segment.className}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))
  )}
</motion.h1>


        {/* Motto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-white/90 italic"
        >
          “Defending rights. Delivering justice.{" "}
          <span className="text-[#A29061] font-semibold not-italic">
            Shaping the future of law across the region.”
          </span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-4 text-base md:text-lg text-white/70"
        >
          Providing trusted legal services across Bahrain, Saudi Arabia, and the Gulf.
        </motion.p>

        {/* Buttons */}

        
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2, duration: 0.8 }}
  className="mt-8 flex justify-center gap-4 flex-wrap"
>
  {/* Button 1 with Shine */}
  <div className="relative group overflow-hidden rounded-full">
    <button className="relative z-10 px-6 py-3 bg-[#A29061] text-white rounded-full font-medium transition duration-300">
      Get Legal Support
    </button>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-full h-full"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>

  {/* Button 2 with Shine */}
  <div className="relative group overflow-hidden rounded-full border border-white">
    <button className="relative z-10 px-6 py-3 text-white rounded-full font-medium transition duration-300">
      Learn More
    </button>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full h-full"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
</motion.div>

      </div>

      {/* Accent Circles */}
      <div className="absolute -top-20 -left-20 w-40 h-40 border border-[#A29061]/10 rounded-full animate-spin-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 border border-[#A29061]/5 rounded-full animate-spin-reverse"></div>

      {/* Keep existing CSS for float/spin */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 18s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
