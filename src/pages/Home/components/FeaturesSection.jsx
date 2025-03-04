import React from 'react'
import {
    MessageOutlined,
    LockOutlined,
    UserOutlined,
    StarFilled,
    BgColorsOutlined,
  } from "@ant-design/icons";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="features">
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
              <BgColorsOutlined className="text-4xl text-blue-600 mb-4" />
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
  )
}

export default FeaturesSection
