import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
const HeroSection = () => {
   
    return (
        <>
            <motion.section
                className=" text-center mt-24"
                initial={{ opacity: 0, y: -50 }} // Start invisible and move up
                animate={{ opacity: 1, y: 0 }} // End at full opacity
                transition={{ duration: 1 }} // Animation duration
            >
                <img src="./scripta_logo.png" alt="Logo" className="w-32 h-32 mx-auto" />
                <h1 className="text-6xl font-bold">
                    Welcome to Scripta
                </h1>
                <p className="text-xl text-gray-600 my-4">
                    Read and share articles based on your interests.
                </p>
                <AnimatedButton text="Get Started" />
            </motion.section>
        </>
    );
};

export default HeroSection;