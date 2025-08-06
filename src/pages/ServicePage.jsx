import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Corporate & Commercial Legal Support",
    image: "/icons/service-1.png",
    description: "Legal solutions for governance, M&A, transactions.",
    features: ["Governance", "M&A", "Contracts", "Compliance"],
  },
  {
    title: "Litigation & Court Representation",
    image: "/icons/service-2.png",
    description: "Strong litigation support and representation.",
    features: ["Litigation", "Disputes", "Court", "Strategy"],
  },
  {
    title: "Contract Drafting & Negotiation",
    image: "/icons/service-3.png",
    description: "Contracts that protect your interests.",
    features: ["Drafting", "Review", "Negotiation", "Risk"],
  },
  {
    title: "Govt. & Semi-Govt. Advisory",
    image: "/icons/service-4.png",
    description: "Public sector legal advisory.",
    features: ["Public Law", "Relations", "Policy", "Compliance"],
  },
  {
    title: "Debt Recovery & Execution",
    image: "/icons/service-5.png",
    description: "Tactical debt and enforcement services.",
    features: ["Recovery", "Assets", "Enforcement", "Settlements"],
  },
  {
    title: "Company Registration & Compliance",
    image: "/icons/service-6.png",
    description: "Business setup and legal structuring.",
    features: ["Registration", "Licensing", "Compliance", "Structure"],
  },
];

const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={{ y: [-10, 10, -10], rotate: [-1, 1, -1] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const ServicesPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const headingText = "Our Legal Services";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div  className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#A29061]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10 pt-20">
        <motion.h2
  className="text-4xl font-bold text-center mb-16 text-gray-800 uppercase"
  style={{
    textShadow: "0 0 30px rgba(162, 144, 97, 0.4)", // optional golden glow
  }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  }}
>
  <span className="inline-flex flex-wrap justify-center">
    {headingText.split("").map((char, i) => (
      <motion.span
        key={i}
        variants={{
          hidden: { opacity: 0, y: 25 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.4 }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: -45, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ y: -20, rotateY: 10, rotateX: 5, scale: 1.05 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative perspective-1000"
            >
              <FloatingElement delay={index * 0.5}>
                <div className="relative">
                  <div className="relative bg-white border border-gray-200 rounded-3xl p-8 h-full shadow-md transition-all duration-500 overflow-hidden">
                    <motion.div className="absolute inset-0 opacity-5"></motion.div>

                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360, y: -10 }}
                      transition={{ duration: 0.6, ease: "backOut" }}
                      className="relative z-10 mb-8 flex justify-center"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-28 h-28 object-contain"
                      />
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
                      <motion.h3
                        className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-[#8c764d] transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {service.title}
                      </motion.h3>
                      <motion.p
                        className="text-gray-600 text-sm leading-relaxed text-center mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {service.description}
                      </motion.p>

                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -30, scale: 0.8 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 * idx + index * 0.05, ease: "backOut" }}
                            whileHover={{ x: 10, scale: 1.05 }}
                            className="flex items-center text-sm text-gray-700 group/feature"
                          >
                            <motion.div
                              className="w-3 h-3 bg-gradient-to-r from-[#A29061] to-[#8c764d] rounded-full mr-3 flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-200"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            />
                            <span className="group-hover/feature:font-semibold transition-all duration-200">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                     <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden w-full bg-[#A29061] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Shining effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Text & icon */}
      <motion.span whileHover={{ x: -5 }} transition={{ duration: 0.2 }} className="z-10">
        Explore Service
      </motion.span>
      <motion.div whileHover={{ x: 5, rotate: 45 }} transition={{ duration: 0.3 }} className="z-10">
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </motion.button>
                    </motion.div>
                  </div>
                </div>
              </FloatingElement>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
