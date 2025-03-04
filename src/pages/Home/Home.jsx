import React, { useState } from "react";

import Header from "../../components/Header/Header";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturesSection />
      <AboutUs />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
