"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function CelebrationModal({ isOpen, onClose, message = "أحسنت!" }: CelebrationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-12 rounded-[3rem] shadow-2xl flex flex-col items-center text-center max-w-md w-full relative overflow-hidden"
          >
             {/* Confetti Background (Simplified CSS effect) */}
            <div className="absolute inset-0 bg-kid-yellow/10 -z-10" />

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-9xl mb-6"
            >
              ⭐
            </motion.div>

            <h2 className="text-6xl font-black text-kid-pink mb-4 drop-shadow-md">
              {message}
            </h2>
            
            <p className="text-2xl text-slate-600 font-bold mb-8">
              أنت بطل رائع!
            </p>

            <button
              onClick={onClose}
              className={cn(
                "w-full py-4 rounded-2xl bg-kid-green text-white text-2xl font-black shadow-lg",
                "hover:scale-105 active:scale-95 transition-transform"
              )}
            >
              العب مرة أخرى
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
