import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <motion.div
        className="absolute w-32 h-32 rounded-full border-[6px] border-gray-800 animate-pulse"
      />

      <motion.div
        className="absolute w-32 h-32 rounded-full border-[6px] border-[#1976d2] blur-md"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="w-14 h-14 bg-[#0d1721] rounded-full shadow-lg shadow-blue-500/30"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default LoadingScreen;