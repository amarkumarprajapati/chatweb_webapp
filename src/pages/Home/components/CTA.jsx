import { Button } from 'antd'
import React from 'react'

const CTA = () => {
  return (
    <div>
         <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied users and start enjoying seamless,
            real-time communication today.
          </p>
          <Button
            size="large"
            className="!rounded-button bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  )
}

export default CTA
