import React, { useState } from "react";
import { Button, Carousel } from "antd";
import {
  MessageOutlined,
  LockOutlined,
  UserOutlined,
  StarFilled,
  BgColorsOutlined,
} from "@ant-design/icons";
import { testimonials } from "../../Data/Dummydata";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
      navigate("/login");
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://public.readdy.ai/ai/img_res/255f8aeeb0464d484dd21d1c5770f94f.jpg"
          alt="Logo"
          className="h-10"
        />
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        <a
          href="#home"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Home
        </a>
        <a
          href="#features"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Features
        </a>
        <a
          href="#about"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          About Us
        </a>
        <a
          href="#contact"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Contact
        </a>
        <Button
          type="primary"
          className="!rounded-button bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 hover:from-blue-500 hover:to-blue-700"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </nav>
      <button
        className="md:hidden text-gray-600"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="fas fa-bars text-2xl"></i>
      </button>
    </div>
    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden bg-white border-t">
        <div className="px-4 py-2">
          <a href="#home" className="block py-2 text-gray-600">
            Home
          </a>
          <a href="#features" className="block py-2 text-gray-600">
            Features
          </a>
          <a href="#about" className="block py-2 text-gray-600">
            About Us
          </a>
          <a href="#contact" className="block py-2 text-gray-600">
            Contact
          </a>
          <Button
            type="primary"
            className="!rounded-button w-full mt-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </div>
    )}
  </header>
  )
}

export default Header
