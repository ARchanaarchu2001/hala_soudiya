import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f8f6f2] text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-[#A29061] mb-4">HALAA SAUDIA</h2>
          <p className="text-sm leading-relaxed">
            HALAA SAUDIA provides premier legal services with excellence and integrity across corporate, litigation, compliance, and advisory domains.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-[#A29061] transition">About Us</a></li>
            <li><a href="/services" className="hover:text-[#A29061] transition">Services</a></li>
            <li><a href="/contact" className="hover:text-[#A29061] transition">Contact</a></li>
        
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-[#A29061]" />
              Riyadh, Saudi Arabia
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#A29061]" />
              +966 50 123 4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#A29061]" />
              info@halaasaudia.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#A29061]"><Facebook /></a>
            <a href="#" className="hover:text-[#A29061]"><Instagram /></a>
            <a href="#" className="hover:text-[#A29061]"><Linkedin /></a>
            <a href="#" className="hover:text-[#A29061]"><Twitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 text-center py-6 text-sm bg-white">
        © {new Date().getFullYear()} HALAA SAUDIA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
