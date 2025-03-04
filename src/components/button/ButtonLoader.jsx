import React from "react";

const ButtonLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-center items-center space-x-1">
      <motion.div
        className="w-3 h-1 bg-white rounded"
        animate={{ scaleX: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="w-3 h-1 bg-white rounded"
        animate={{ scaleX: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-3 h-1 bg-white rounded"
        animate={{ scaleX: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </div>
  );
};

export default ButtonLoader;
