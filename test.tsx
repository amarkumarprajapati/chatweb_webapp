// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Button, Carousel } from "antd";
import {
  MessageOutlined,
  LockOutlined,
  ThemeOutlined,
  UserOutlined,
  StarFilled,
} from "@ant-design/icons";
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              className="!rounded-button bg-blue-600 text-white px-6 hover:bg-blue-700"
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
                className="!rounded-button w-full mt-2 bg-blue-600"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </header>
      {/* Hero Section */}
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
                className="!rounded-button bg-blue-600 hover:bg-blue-700"
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
      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Our Web Chat App?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <MessageOutlined className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Real-Time Messaging
              </h3>
              <p className="text-gray-600">
                Experience lightning-fast messaging that keeps you connected
                with your friends, family, and colleagues.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <UserOutlined className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                User-Friendly Interface
              </h3>
              <p className="text-gray-600">
                Enjoy a sleek and intuitive design that makes chatting a breeze,
                even for first-time users.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <LockOutlined className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Secure Conversations
              </h3>
              <p className="text-gray-600">
                Rest assured that your conversations are protected with
                end-to-end encryption.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <ThemeOutlined className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Customizable Themes
              </h3>
              <p className="text-gray-600">
                Personalize your chat experience with a variety of themes and
                customization options.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Section */}
      <section className="py-20 bg-gray-50" id="about">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">About Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://public.readdy.ai/ai/img_res/fb05ab8c41355dfc4b8e2f297bf9a438.jpg"
                alt="Our Team"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-6">
                We are a passionate team of developers and designers committed
                to creating the most intuitive and efficient communication
                platform. Our mission is to connect people worldwide through
                seamless, secure, and enjoyable conversations.
              </p>
              <p className="text-lg text-gray-600">
                Since our founding in 2023, we've helped millions of users stay
                connected with their loved ones and colleagues. We continue to
                innovate and improve our platform based on user feedback and
                emerging technologies.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            What Our Users Say
          </h2>
          <Carousel autoplay className="pb-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-white rounded-lg shadow-lg p-8 mx-4">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarFilled key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    {testimonial.content}
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied users and start enjoying seamless,
            real-time communication today.
          </p>
          <Button
            size="large"
            className="!rounded-button bg-white text-blue-600 hover:bg-gray-100"
          >
            Get Started Now
          </Button>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img
                src="https://public.readdy.ai/ai/img_res/71d14039bd0908febfe28cda409401db.jpg"
                alt="Logo"
                className="h-8 mb-4"
              />
              <p className="text-gray-400">
                Connecting people through seamless communication.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Chat App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
