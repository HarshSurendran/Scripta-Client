import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AnimatedButton = ({ text }: { text: string }) => {
    const navigate = useNavigate();
  return (
      <motion.button
      onClick={()=> navigate('/signup')}
      className="px-6 py-3 bg-primary text-white rounded-lg shadow-md"
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.9 }} 
    >
      {text}
    </motion.button>
  );
};

export default AnimatedButton;