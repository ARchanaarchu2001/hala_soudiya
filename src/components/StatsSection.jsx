import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CountUp } from "use-count-up"; // Import from use-count-up
import { Users, Award, MapPin, Building } from "lucide-react";

const stats = [
  { icon: <Users className="w-8 h-8" />, number: 500, label: "Happy Clients" },
  { icon: <Award className="w-8 h-8" />, number: 98, label: "Success Rate" },
  { icon: <MapPin className="w-8 h-8" />, number: 3, label: "Countries" },
  { icon: <Building className="w-8 h-8" />, number: 6, label: "Years Experience" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldStart(true);
    }
  }, [isInView]);

  return (
    <section className="py-20 px-6 bg-white/50 backdrop-blur-sm" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#A29061] to-[#8c764d] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">{stat.icon}</div>
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-1">
                {shouldStart ? (
                  <CountUp isCounting end={stat.number} duration={2} />
                ) : (
                  "0"
                )}
              </h3>

              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
