import React from 'react'

const AboutUs = () => {
  return (
    <div>
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
    </div>
  )
}

export default AboutUs
