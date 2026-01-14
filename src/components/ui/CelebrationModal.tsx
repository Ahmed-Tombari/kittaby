"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  color: string;
}

export default function CelebrationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Play celebration sound
      const audio = new Audio("/sounds/Celebration.mp3");
      audio.volume = 0.5;
      audio.play().catch(e => console.error("Audio play failed", e));

      // Generate particles deterministically for this effect
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        scale: Math.random() * 0.5 + 0.5,
        rotate: Math.random() * 360,
        color: ["#FFD54F", "#F06292", "#81C784", "#4FC3F7"][Math.floor(Math.random() * 4)],
      }));
      setParticles(newParticles);

      const timer = setTimeout(onClose, 5000); // Auto close
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1.5, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-yellow-400 drop-shadow-2xl"
            >
              <Star size={200} fill="currentColor" />
            </motion.div>
            
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-black text-white mt-8 drop-shadow-md text-center"
            >
              أحسنت!
            </motion.h2>

            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: p.scale,
                }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: 0,
                  rotate: p.rotate,
                }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full"
                style={{ backgroundColor: p.color }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
