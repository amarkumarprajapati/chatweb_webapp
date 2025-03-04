import React, { useState } from "react";
import { Button, Carousel } from "antd";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
      navigate("/login");
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <section className="pt-20 bg-gradient-to-r from-blue-50 to-indigo-50">
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Connect Instantly, Chat Effortlessly
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover the ultimate web chat experience with real-time
            messaging and seamless communication.
          </p>
          <Button
            type="primary"
            size="large"
            className="!rounded-button bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700"
            onClick={handleGetStarted}
          >
            Get Started Now
          </Button>
        </div>
        <div className="relative">
          <img
            src="https://public.readdy.ai/ai/img_res/ec4b957a302a9d1d0f69729106dfae9f.jpg"
            alt="Chat Interface"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero
