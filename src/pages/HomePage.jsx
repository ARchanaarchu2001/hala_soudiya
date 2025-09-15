// HomePage.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "../components/Hersection";
import AboutSection from "./AboutPage";
import ServicesPage from "./ServicePage";
import ContactPage from "./ContactPage";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      // wait for sections to render
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.state]);

  return (
    <>
      <section id="home"><HeroSection /></section>
      <section id="services"><ServicesPage /></section>
      <section id="about"><AboutSection /></section>
      
      <section id="contact"><ContactPage /></section>
      
    </>
  );
}
