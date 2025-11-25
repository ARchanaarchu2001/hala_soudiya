// src/pages/ContactPage.jsx
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Loader2, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// Brand accent
const GREEN = "#000000";

// ---- EmailJS (use your own IDs/keys) ----
const SERVICE_ID  = "service_cfz3esk";
const TEMPLATE_ID = "template_0qslmvf";
const PUBLIC_KEY  = "GExPI6OzFSXlGPrpB";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "error" | null
  const dir = i18n.dir(); // "ltr" | "rtl"

  // Translation-driven content
  const heading            = t("contact.heading");
  const description        = t("contact.description");
  const phone              = t("contact.phone");
  const email              = t("contact.email");
  const email2             = t("contact.email2");
  const address            = t("contact.address");
  const nameLabel          = t("contact.nameLabel");
  const namePlaceholder    = t("contact.namePlaceholder");
  const emailLabel         = t("contact.emailLabel");
  const emailPlaceholder   = t("contact.emailPlaceholder");
  const messageLabel       = t("contact.messageLabel");
  const messagePlaceholder = t("contact.messagePlaceholder");
  const buttonText         = t("contact.button");
  const whatsapp           = t("contact.whatsapp", { defaultValue: "" });
  const phoneFieldLabel       = t("contact.phoneFieldLabel", { defaultValue: "Phone (optional)" });
const phoneFieldPlaceholder = t("contact.phoneFieldPlaceholder", { defaultValue: "e.g. +971501234567" });


  const toLatinDigits = (s = "") =>
    s
      .replace(/[٠-٩]/g, (d) => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]) // Arabic-Indic
      .replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]); // Persian

  const telHref  = `tel:${toLatinDigits(String(phone || "")).replace(/[^\d+]/g, "")}`;
  const mailHref = `mailto:${email || ""}`;

  const rawWhatsApp = (whatsapp && whatsapp.trim()) || phone || "";
  const waNumber    = toLatinDigits(rawWhatsApp).replace(/\D/g, ""); // digits only for wa.me
  const waHref      = waNumber ? `https://wa.me/${waNumber}` : "";

  const onSubmit = async (e) => {
    e.preventDefault();

    // Honeypot (spam trap)
    const hp = formRef.current?.elements?.namedItem("company")?.value;
    if (hp) return;

    try {
      setSending(true);
      setStatus(null);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      formRef.current?.reset();
      setStatus("ok");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Spacer so content never hides under fixed navbar */}
      <div aria-hidden="true" style={{ height: "calc(var(--nav-safe) + 15px)" }} />

      {/* Lock the *layout* to LTR so columns never swap; text aligns per-language */}
      <section
        id="contact"
        dir="ltr"
        className="bg-white"
        style={{
          // ensures anchor / scrollIntoView lands below navbar
          scrollMarginTop: "calc(var(--nav-safe) + 8px)",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 py-12 md:py-16"
          // tiny visual buffer so rounded corners don't kiss the bar
          style={{ paddingTop: "8px" }}
        >
          {/* Equal-height two-column layout */}
          <div className="grid md:grid-cols-12 gap-10 items-stretch">
            {/* LEFT: Contact info (text direction follows language) */}
            <aside
              dir={dir}
              className={`md:col-span-5 rounded-2xl border bg-white p-6 md:p-8 shadow-sm ${
                dir === "rtl" ? "text-right" : "text-left"
              } h-full`}
              style={{ borderColor: "rgba(0,0,0,.08)" }}
            >
              <h1
                className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
                style={{ color: GREEN }}
              >
                {heading}
              </h1>
              {description && (
                <p className="text-gray-700 leading-relaxed mb-7">
                  {description}
                </p>
              )}

              <ul className="space-y-4">
                {!!phone && (
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 text-[color:var(--accent)]" style={{ color: GREEN }} />
                    <a href={telHref} className="text-gray-900 hover:text-[color:var(--accent)]" style={{ "--accent": GREEN }}>
                      {phone}
                    </a>
                  </li>
                )}

                {!!waHref && (
                  <li className="flex items-start gap-3 break-words">
                    <MessageCircle className="mt-0.5" style={{ color: GREEN }} />
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-[color:var(--accent)]"
                      style={{ "--accent": GREEN }}
                      aria-label="Open WhatsApp chat"
                    >
                      {rawWhatsApp} <span className="sr-only">(WhatsApp)</span>
                    </a>
                  </li>
                )}

                {!!email && (
                  <li className="flex items-start gap-3 break-words">
                    <Mail className="mt-0.5" style={{ color: GREEN }} />
                    <a href={mailHref} className="text-gray-900 hover:text-[color:var(--accent)]" style={{ "--accent": GREEN }}>
                      {email}
                    </a>
                  </li>
                  
                )}

                 {!!email2 && (
                  <li className="flex items-start gap-3 break-words">
                    <Mail className="mt-0.5" style={{ color: GREEN }} />
                    <a href={mailHref} className="text-gray-900 hover:text-[color:var(--accent)]" style={{ "--accent": GREEN }}>
                      {email2}
                    </a>
                  </li>
                )}
                {!!address && (
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 " style={{ color: GREEN }} />
                    <span className="text-gray-900">{address}</span>
                  </li>
                )}
              </ul>
            </aside>

            {/* RIGHT: Form (text direction follows language) */}
            <form
              ref={formRef}
              onSubmit={onSubmit}
              dir={dir}
              className={`md:col-span-7 rounded-2xl border bg-white p-6 md:p-8 shadow-lg space-y-5 ${
                dir === "rtl" ? "text-right" : "text-left"
              } h-full`}
              style={{ borderColor: "rgba(0,0,0,.08)" }}
            >
              {/* Honeypot */}
              <input type="text" name="company" autoComplete="off" tabIndex="-1" className="hidden" aria-hidden="true" />

              {/* Hidden (optional) */}
              <input type="hidden" name="lang" defaultValue={i18n.language || "en"} />

              <div className="mt-1">
                <label htmlFor="name" className="block text-gray-800 mb-1.5">
                  {nameLabel}
                </label>
                <input
                  id="name"
                  name="user_name"
                  type="text"
                  placeholder={namePlaceholder}
                  autoComplete="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2"
                  style={{ borderColor: "rgba(0,0,0,.12)", boxShadow: `0 0 0 0 rgba(0,0,0,0)` }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-800 mb-1.5">
                  {emailLabel}
                </label>
                <input
                  id="email"
                  name="user_email"
                  type="email"
                  placeholder={emailPlaceholder}
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2"
                  style={{ borderColor: "rgba(0,0,0,.12)" }}
                />
              </div>

              {/* Phone (optional) */}
              <div>
                <label htmlFor="phone" className="block text-gray-800 mb-1.5">
                  {phoneFieldLabel}
                </label>
                <input
                  id="phone"
                  name="user_phone"
                  type="tel"
                  placeholder={phoneFieldPlaceholder}
                  autoComplete="tel"
                  // not required => optional
                  className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2"
                  style={{
                      borderColor: "rgba(0,0,0,.12)",
                      direction: "ltr",                         // keep numbers natural
                      textAlign: dir === "rtl" ? "right" : "left", // match other fields
                    }}
                  // allow digits, spaces, dashes, parentheses, and + at start
                  pattern="^\+?[0-9\s\-()]*$"
                  inputMode="tel"
                />
              </div>


              <div>
                <label htmlFor="message" className="block text-gray-800 mb-1.5">
                  {messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder={messagePlaceholder}
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2"
                  style={{ borderColor: "rgba(0,0,0,.12)" }}
                />
              </div>

              {/* Status banners */}
              {status === "ok" && (
                <div className="rounded-xl bg-green-50 border border-green-200 text-green-800 px-4 py-3">
                  {dir === "rtl" ? "تم إرسال رسالتك بنجاح." : "Your message has been sent successfully."}
                </div>
              )}
              {status === "error" && (
                <div className="rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3">
                  {dir === "rtl" ? "حدث خطأ أثناء الإرسال. جرّب مرة أخرى." : "Something went wrong. Please try again."}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-white font-semibold transition-colors ${
                  sending ? "bg-emerald-400 cursor-not-allowed" : "hover:opacity-95"
                }`}
                style={{ backgroundColor: GREEN }}
              >
                {sending && <Loader2 className="w-4 h-4 animate-spin" />}
                {sending ? (dir === "rtl" ? "جاري الإرسال..." : "Sending...") : buttonText}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
