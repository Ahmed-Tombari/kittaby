"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { float, container, popIn } from "@/lib/animations";
import { Sun, Cloud, Star } from "lucide-react";

interface DashboardProps {
  onStart: () => void;
}

export default function Dashboard({ onStart }: DashboardProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-kid-bg text-center p-4">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-100px] left-[-100px] text-accent opacity-20"
      >
        <Sun size={300} />
      </motion.div>

      <motion.div
        variants={float}
        initial="animate"
        animate="animate"
        className="absolute top-20 right-[10%] text-sky-200"
      >
        <Cloud size={120} fill="currentColor" />
      </motion.div>
      
      <motion.div
        variants={float}
        initial="animate"
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute top-40 left-[10%] text-sky-200"
      >
        <Cloud size={80} fill="currentColor" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="z-10 max-w-2xl w-full"
      >
        <motion.div variants={popIn} custom={1} className="mb-8">
           <div className="inline-block bg-white p-6 rounded-full shadow-soft mb-4">
             <Star size={64} className="text-accent fill-accent animate-pulse" />
           </div>
           <h1 className="text-6xl md:text-8xl font-black text-primary drop-shadow-sm mb-4">
             كِتَابِي
           </h1>
           <p className="text-2xl text-gray-600 font-medium">
             رحلة سحرية لتعلم الحروف العربية
           </p>
        </motion.div>

        <motion.div variants={popIn} custom={2}>
          <Button
            variant="primary"
            size="xl"
            onClick={onStart}
            className="text-2xl w-full md:w-auto min-w-[200px]"
          >
            ابدأ التعلّم
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
