import React, { useState } from "react";
import { motion } from "framer-motion";


const Chats1 = () => {

    const data = [
      { x: 0, y: 30 },
      { x: 1, y: 50 },
      { x: 2, y: 40 },
      { x: 3, y: 70 },
      { x: 4, y: 60 },
      { x: 5, y: 90 },
    ];
    
    const generatePath = (data) => {
      return data.map((point, index) => {
        return `${index === 0 ? "M" : "L"}${point.x * 50},${100 - point.y}`;
      }).join(" ");
    };
    
    const [hoveredPoint, setHoveredPoint] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-6 rounded-2xl shadow-lg w-[80%] max-w-3xl"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Animated Line Graph</h2>
        <div className="relative w-full">
          <svg width="300" height="150" viewBox="0 0 300 100" className="w-full">
            <motion.path
              d={generatePath(data)}
              fill="none"
              stroke="#8884d8"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {data.map((point, index) => (
              <motion.circle
                key={index}
                cx={point.x * 50}
                cy={100 - point.y}
                r={5}
                fill="#8884d8"
                whileHover={{ scale: 1.5 }}
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}
          </svg>
          {hoveredPoint && (
            <div
              className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded"
              style={{
                left: `${hoveredPoint.x * 50}px`,
                top: `${100 - hoveredPoint.y - 20}px`,
                transform: "translate(-50%, -100%)",
              }}
            >
              {`(${hoveredPoint.x}, ${hoveredPoint.y})`}
            </div>
          )}
        </div>
      </motion.div>
    </div>
    </div>
  )
}

export default Chats1
