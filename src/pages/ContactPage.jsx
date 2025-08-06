import React , { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const headingText = "Get In Touch";
  return (
    <div id="contact" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
      className="text-3xl font-bold text-gray-800 mb-6 uppercase text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.07,
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
          <p className="text-gray-600 mb-8">
            We're here to help. Reach out for inquiries, consultations, or questions
            about our legal services.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Phone className="text-[#A29061]" />
              <span className="text-gray-700">+971 50 123 4567</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-[#A29061]" />
              <span className="text-gray-700">contact@halaasaudia.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-[#A29061]" />
              <span className="text-gray-700">
                Office 203, Marina Plaza, Dubai Marina, UAE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 p-8 rounded-3xl shadow-lg space-y-6"
        >
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A29061]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A29061]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="How can we assist you?"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A29061]"
            ></textarea>
          </div>
         <motion.button
      type="submit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full bg-[#A29061] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#8c764d] transition-colors duration-300 overflow-hidden"
    >
      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Button Text */}
      <span className="relative z-10">Send Message</span>
    </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactPage;
