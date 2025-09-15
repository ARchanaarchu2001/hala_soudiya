// src/components/Footer.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

/* Palette to match the reference */
const CREAM = "#f5f0eb";
const INK   = "#111111";
const LINE  = "#e9e1d8";
const MUTED = "#666666";


const TikTokIcon = ({ size = 30, color = "currentColor", ...props }) => (
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


export default function Footer() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const year = new Date().getFullYear();

  // Only use provided keys
  const desc        = t("footer.description");
  const quickLinks  = t("footer.quickLinks");
  const about       = t("footer.about");
  const services    = t("footer.services");
  const contactNav  = t("footer.contact");
  const contactTitle= t("footer.contactTitle");
  const address     = t("footer.address");
  const phone       = t("footer.phone");
  const email       = t("footer.email");
  const followUs    = t("footer.followUs");
  const rights      = t("footer.rights");

  const telHref  = `tel:${String(phone || "").replace(/[^\d+]/g, "")}`;
  const mailHref = `mailto:${email || ""}`;

  return (
    <footer
      dir="ltr"
      className="w-full"
      style={{ background: CREAM, color: INK, borderTop: `1px solid ${LINE}` }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left: description + social */}
        <div className="md:col-span-6" dir={i18n.dir()}>
          {desc && (
            <p
              className={`text-base leading-relaxed ${dir === "rtl" ? "text-right" : "text-left"}`}
              style={{ color: INK }}
            >
              {desc}
            </p>
          )}

          {/* Social */}
          {/* Social */}
<div className="mt-8">
  <div className={`mb-4 text-sm ${dir === "rtl" ? "text-right" : "text-left"}`}>
    {followUs}
  </div>

  {/* consistent containers keep all icons perfectly aligned */}
  <div className="flex items-center gap-2">
   
    <a
      href="https://www.instagram.com/halaasaudia?igsh=bnVrYmRmdnRpZjdj"
      aria-label="Instagram"
      className="inline-flex h-8 w-8 items-center justify-center hover:opacity-80"
    >
      <Instagram size={26} color={INK} />
    </a>

     <a
      href="https://www.tiktok.com/@halaasaudia"
      aria-label="TikTok"
      className="inline-flex mt-2 h-8 w-8 items-center justify-center hover:opacity-80"
    >
      <TikTokIcon size={30} color={INK} style={{ display: "block" }} />
    </a>


    <a
      href="https://www.facebook.com/share/17KjPC1NaV/"
      aria-label="Facebook"
      className="inline-flex h-8 w-8 items-center justify-center hover:opacity-80"
    >
      <Facebook size={26} color={INK} />
    </a>
  </div>
</div>




        </div>

        {/* Right: two stacks – quick links + contact */}
        <div className="md:col-span-6 grid sm:grid-cols-2 gap-10" dir="ltr">
          {/* Quick Links */}
          <div  dir={i18n.dir()} className={i18n.dir() === "rtl" ? "text-right" : "text-left"}>
            <h3 className="text-base font-semibold mb-5">{quickLinks}</h3>
            <ul className="space-y-4">
              <li><a href="#about"    className="hover:opacity-80">{about}</a></li>
              <li><a href="#services" className="hover:opacity-80">{services}</a></li>
              <li><a href="#contact"  className="hover:opacity-80">{contactNav}</a></li>
            </ul>
          </div>

          {/* Contact block */}
          <div dir={i18n.dir()} className={i18n.dir() === "rtl" ? "text-right" : "text-left"}>
            <h3 className="text-base font-semibold mb-5">{contactTitle}</h3>
            <ul className="space-y-4">
              {address && <li className="text-[15px] leading-relaxed">{address}</li>}
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
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-8 border-t" style={{ borderColor: LINE }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="text-center text-sm" style={{ color: MUTED }}>
            © {year} HALAA SAUDIA — {rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
