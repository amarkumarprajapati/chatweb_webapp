import React, { useState } from "react";
import { Button, Carousel } from "antd";
import {
  MessageOutlined,
  LockOutlined,
  UserOutlined,
  StarFilled,
  BgColorsOutlined,
} from "@ant-design/icons";
import { testimonials } from "../../../Data/Dummydata";


const Testimonials = () => {
  return (
    <div>
         <section className="py-20 bg-gray-50">
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
    </div>
  )
}

export default Testimonials
