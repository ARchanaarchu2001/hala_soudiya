import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState({});
  const headingText1 = "Excellence in";
const headingText2 = "Legal Practice";
const parts = [
    { text: "Mission & ", className: "text-black" },
    { text: "Vision", className: "text-[#A29061]" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('[id^="animate-"]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div  className="bg-white text-black overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: 'rgba(162, 144, 97, 0.1)' }}></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(162, 144, 97, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(162, 144, 97, 0.05) 0%, transparent 50%)`
          }}
        ></div>
      </div>

      {/* Hero About Section */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-0">
          {/* Enhanced Icon Animation */}
          <div 
            id="animate-icon"
            className={`w-full lg:w-1/2 flex justify-center lg:justify-start transition-all duration-1000 transform ${
              isVisible['animate-icon'] ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
            }`}
          >
            <div className="relative group">
              {/* Animated Orbital Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-96 h-96 rounded-full border-2 opacity-20 animate-spin" 
                     style={{ 
                       borderColor: '#A29061', 
                       borderTopColor: 'transparent',
                       animationDuration: '10s'
                     }}>
                </div>
                <div className="absolute w-80 h-80 rounded-full border-2 opacity-30 animate-spin" 
                     style={{ 
                       borderColor: '#A29061', 
                       borderRightColor: 'transparent',
                       animationDuration: '8s',
                       animationDirection: 'reverse'
                     }}>
                </div>
              </div>
              
              {/* Pulsing Background */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse" 
                   style={{ backgroundColor: '#A29061' }}>
              </div>
              
              {/* Main Icon Container with Enhanced Animation */}
              <div className="relative bg-gradient-to-br from-white/80 to-gray-50/60 backdrop-blur-xl rounded-full p-12 border-2 shadow-2xl group-hover:scale-110 transition-all duration-700 mx-30"
                   style={{ borderColor: 'rgba(162, 144, 97, 0.3)', boxShadow: '0 25px 50px -12px rgba(162, 144, 97, 0.2)' }}>
                {/* Custom Icon */}
                <div className="w-64 h-64 flex items-center justify-center group-hover:rotate-6 transition-transform duration-700">
            <img 
              src="/assets/about-1.jpg" 
              alt="Legal Services Icon"
              className="w-64 h-64 object-contain rounded-full group-hover:scale-105 group-hover:opacity-90 transition-all duration-500 filter drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 10px 20px rgba(162, 144, 97, 0.2))' }}
            />
          </div>

                
                {/* Floating Particles */}
                <div className="absolute top-4 right-8 w-3 h-3 rounded-full animate-bounce opacity-70" 
                     style={{ backgroundColor: '#A29061', animationDelay: '0s', animationDuration: '2s' }}>
                </div>
                <div className="absolute bottom-8 left-6 w-2 h-2 rounded-full animate-bounce opacity-60" 
                     style={{ backgroundColor: '#A29061', animationDelay: '0.7s', animationDuration: '2.5s' }}>
                </div>
                <div className="absolute top-16 left-4 w-4 h-4 rounded-full animate-bounce opacity-50" 
                     style={{ backgroundColor: '#A29061', animationDelay: '1.4s', animationDuration: '3s' }}>
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div 
            id="animate-content"
            className={`w-full lg:w-1/2 transition-all duration-1000 transform ${
              isVisible['animate-content'] ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
            }`}
          >
            <div className="space-y-8 mx-5">
              <div>
                <div className="inline-block px-4 py-2 rounded-full border mb-6" style={{ backgroundColor: 'rgba(162, 144, 97, 0.2)', borderColor: 'rgba(162, 144, 97, 0.3)' }}>
                  <span className="text-sm font-medium" style={{ color: '#A29061' }}>ABOUT OUR FIRM</span>
                </div>
               <motion.h2
  className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-center sm:text-left"
  style={{
    textShadow: "0 0 30px rgba(162, 144, 97, 0.5)", // glowing shadow
  }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }}
>
  <span className="inline-flex flex-wrap justify-center sm:justify-start text-black">
    {headingText1.split("").map((char, i) => (
      <motion.span
        key={`top-${i}`}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.4 }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
  <br />
  <span className="inline-flex flex-wrap justify-center sm:justify-start" style={{ color: "#A29061" }}>
    {headingText2.split("").map((char, i) => (
      <motion.span
        key={`bottom-${i}`}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.4 }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
</motion.h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Founded in 2017, our law firm delivers comprehensive legal services across 
                  Bahrain, Saudi Arabia, and the Gulf region.
                </p>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Led by expert Bahraini professionals, we offer trusted legal guidance 
                  based on deep experience, unwavering ethics, and dedication to building 
                  long-term relationships with our clients.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-300">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#A29061' }}>2017</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#A29061' }}>3+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-2">100%</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">Dedicated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Mission & Vision Section */}
      <section className="relative  px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div 
            id="animate-header"
            className={`text-center mb-16 transition-all duration-1000 transform ${
              isVisible['animate-header'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="inline-block px-6 py-3 rounded-full border mb-6" 
                 style={{ backgroundColor: 'rgba(162, 144, 97, 0.1)', borderColor: 'rgba(162, 144, 97, 0.2)' }}>
              <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#A29061' }}>
                Our Commitment
              </span>
            </div>
           <motion.h2
      className="text-4xl lg:text-5xl font-bold mb-4 flex flex-wrap justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.3,
          },
        },
      }}
    >
      {parts.map((segment, idx) =>
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
    </motion.h2>
          </div>

          {/* Cards Container */}
          <div 
            id="animate-cards"
            className={`relative transition-all duration-1200 transform ${
              isVisible['animate-cards'] ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}
          >
            {/* Background Connection Line */}
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 rounded-full opacity-30 hidden lg:block"
                 style={{ backgroundColor: '#A29061' }}>
            </div> */}

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
              {/* Mission Card - Left Side */}
              <div className="group relative h-96">
                {/* Card Background Effects */}
                <div className="absolute inset-0 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500"
                     style={{ backgroundColor: '#A29061' }}>
                </div>
                <div className="absolute -inset-4 rounded-3xl opacity-10 blur-2xl group-hover:opacity-20 transition-all duration-700"
                     style={{ backgroundColor: '#A29061' }}>
                </div>

                {/* Main Card with Background Image */}
                <div className="relative h-full rounded-3xl border-2 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-4 overflow-hidden"
                     style={{ borderColor: 'rgba(162, 144, 97, 0.3)', boxShadow: '0 25px 50px -12px rgba(162, 144, 97, 0.15)' }}>
                  
                  {/* Background Image */}
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                       style={{
                         backgroundImage: 'url("/assets/vision.jpg")',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                         backgroundRepeat: 'no-repeat'
                       }}>
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 group-hover:from-black/70 transition-all duration-500">
                  </div>
                  
                  {/* Brand Color Overlay */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                       style={{ backgroundColor: '#A29061' }}>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
                    <div className="space-y-4">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-opacity-90 transition-all duration-300">
                        Our Mission
                      </h3>
                      <div className="w-16 h-1 rounded-full transition-all duration-500 group-hover:w-24"
                           style={{ backgroundColor: '#A29061' }}>
                      </div>
                      <p className="text-gray-200 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                        We offer trusted legal services based on science, experience, and 
                        unwavering ethics to build long-lasting client relationships that 
                        drive success and growth.
                      </p>
                    </div>
                  </div>

                  {/* Decorative Corner Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                       style={{ backgroundColor: '#A29061' }}>
                  </div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                       style={{ backgroundColor: '#A29061' }}>
                  </div>
                </div>
              </div>

              {/* Vision Card - Right Side */}
              <div className="group relative h-96">
                {/* Card Background Effects */}
                <div className="absolute inset-0 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500"
                     style={{ backgroundColor: '#A29061' }}>
                </div>
                <div className="absolute -inset-4 rounded-3xl opacity-10 blur-2xl group-hover:opacity-20 transition-all duration-700"
                     style={{ backgroundColor: '#A29061' }}>
                </div>

                {/* Main Card with Background Image */}
                <div className="relative h-full rounded-3xl border-2 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-4 overflow-hidden"
                     style={{ borderColor: 'rgba(162, 144, 97, 0.3)', boxShadow: '0 25px 50px -12px rgba(162, 144, 97, 0.15)' }}>
                  
                  {/* Background Image */}
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                       style={{
                         backgroundImage: 'url("/assets/mission.jpg")',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                         backgroundRepeat: 'no-repeat'
                       }}>
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 group-hover:from-black/70 transition-all duration-500">
                  </div>
                  
                  {/* Brand Color Overlay */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                       style={{ backgroundColor: '#A29061' }}>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
                    <div className="space-y-4">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-opacity-90 transition-all duration-300">
                        Our Vision
                      </h3>
                      <div className="w-16 h-1 rounded-full transition-all duration-500 group-hover:w-24"
                           style={{ backgroundColor: '#A29061' }}>
                      </div>
                      <p className="text-gray-200 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                        To lead a growing Gulf-wide legal network under a unified 
                        standard of professionalism, ethics, and reliability that 
                        sets the benchmark for excellence.
                      </p>
                    </div>
                  </div>

                  {/* Decorative Corner Elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                       style={{ backgroundColor: '#A29061' }}>
                  </div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                       style={{ backgroundColor: '#A29061' }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Accent */}
      {/* <div className="h-2" style={{ backgroundColor: '#A29061' }}></div> */}
    </div>
  );
};

export default AboutSection;