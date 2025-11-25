// src/components/Footer.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram } from "lucide-react";

/* Palette */
const CREAM = "#f5f0eb";
const INK   = "#111111";
const LINE  = "#e9e1d8";
const MUTED = "#666666";

/* TikTok icon (stroke to match lucide style) */
const TikTokIcon = ({ size = 22, color = "currentColor", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 3v9.5a3.75 3.75 0 1 1-3.5-3.73" />
    <path d="M12 3c1.3 1.9 3.5 3.2 5.5 3.2" />
  </svg>
);

/* Uniform social button */
const SocialBtn = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:opacity-85"
    style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
  >
    {children}
  </a>
);

export default function Footer() {
  const { t, i18n } = useTranslation();
  const dir  = i18n.dir();
  const year = new Date().getFullYear();

  // i18n keys (with safe fallbacks)
  const quickLinks   = t("footer.quickLinks",   { defaultValue: "Quick links" });
  const about        = t("footer.about",        { defaultValue: "About" });
  const services     = t("footer.services",     { defaultValue: "Services" });
  const contactNav   = t("footer.contact",      { defaultValue: "Contact" });
  const contactTitle = t("footer.contactTitle", { defaultValue: "Contact" });
  const address      = t("footer.address",      { defaultValue: "" });
  const phone        = t("footer.phone",        { defaultValue: "" });
  const email        = t("footer.email",        { defaultValue: "" });
  const followUs     = t("footer.followUs",     { defaultValue: "Follow us" });
  const rights       = t("footer.rights",       { defaultValue: "All rights reserved." });

  const telHref  = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : undefined;
  const mailHref = email ? `mailto:${email}` : undefined;

  return (
    <footer
      dir="ltr"
      className="w-full"
      style={{ background: CREAM, color: INK, borderTop: `1px solid ${LINE}` }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Three columns only: Quick Links | Contact | Follow Us */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Quick Links */}
          <div className="md:col-span-4" dir={i18n.dir()}>
            <h3 className="text-base font-semibold mb-5">{quickLinks}</h3>
            <ul className={`space-y-3 text-[15px] ${dir === "rtl" ? "text-right" : "text-left"}`}>
              <li><a href="#about"    className="hover:opacity-80">{about}</a></li>
              <li><a href="#services" className="hover:opacity-80">{services}</a></li>
              <li><a href="/contact"  className="hover:opacity-80">{contactNav}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4" dir={i18n.dir()}>
            <h3 className="text-base font-semibold mb-5">{contactTitle}</h3>
            <ul className={`space-y-3 text-[15px] ${dir === "rtl" ? "text-right" : "text-left"}`}>
              {address && <li className="leading-relaxed">{address}</li>}
              {phone && (
                <li>
                  <a href={telHref} className="hover:opacity-80">{phone}</a>
                </li>
              )}
              {email && (
                <li>
                  <a href={mailHref} className="hover:opacity-80">{email}</a>
                </li>
              )}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:col-span-4" dir={i18n.dir()}>
            <h3 className="text-base font-semibold mb-5">{followUs}</h3>
            <div className={`flex items-center gap-3 ${dir === "rtl" ? "" : ""}`}>
              <SocialBtn href="https://www.instagram.com/halaasaudia?igsh=bnVrYmRmdnRpZjdj" label="Instagram">
                <Instagram size={22} />
              </SocialBtn>
              <SocialBtn href="https://www.tiktok.com/@halaasaudia" label="TikTok">
                <TikTokIcon size={22} />
              </SocialBtn>
              <SocialBtn href="https://www.facebook.com/share/17KjPC1NaV/" label="Facebook">
                <Facebook size={22} />
              </SocialBtn>
              {/* Add more if needed:
              <SocialBtn href="#" label="LinkedIn"><Linkedin size={22} /></SocialBtn>
              <SocialBtn href="#" label="YouTube"><Youtube size={22} /></SocialBtn>
              */}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 mt-10 border-t" style={{ borderColor: LINE }}>
          <p className="text-center text-sm" style={{ color: MUTED }}>
            © {year} HALAA SAUDIA — {rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
