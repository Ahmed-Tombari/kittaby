"use client";

import { motion } from "framer-motion";
import { ALPHABET_DATA } from "@/data/alphabet";
import Card from "../ui/Card";
import { container, popIn } from "@/lib/animations";
import { Volume2 } from "lucide-react";
import Image from "next/image";

export default function AlphabetGrid() {
  const playSound = (id: string) => {
    // Find the letter data
    const letter = ALPHABET_DATA.find(l => l.id === id);
    if (!letter?.soundPath) return;

    // Create audio instances
    const letterAudio = new Audio(letter.soundPath);
    
    // Play letter sound
    letterAudio.play().catch(e => console.error("Error playing letter sound:", e));

    // If there is a word sound, play it after
    if (letter.wordSoundPath) {
      const wordAudio = new Audio(letter.wordSoundPath);
      letterAudio.onended = () => {
        // Small delay for natural feel
        setTimeout(() => {
          wordAudio.play().catch(e => console.error("Error playing word sound:", e));
        }, 300);
      };
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-primary text-center mb-8"
      >
        حروفي العربية
      </motion.h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {ALPHABET_DATA.map((item, index) => (
          <motion.div key={item.id} variants={popIn} custom={index}>
            <Card 
              variant="default" 
              className="cursor-pointer hover:border-primary/20 aspect-square flex flex-col items-center justify-center relative group overflow-hidden"
              onClick={() => playSound(item.id)}
            >
              <div className={`absolute inset-0 opacity-10 ${item.color}`} />
              
              <span className="text-8xl font-black text-slate-800 mb-2 group-hover:scale-110 transition-transform relative z-10">
                {item.letter}
              </span>
              
              <div className="relative w-24 h-24 mt-2 mb-2 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md">
                 <Image 
                   src={item.imagePath} 
                   alt={item.label}
                   fill
                   className="object-contain"
                 />
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Volume2 className="text-primary" />
              </div>
              
              <div className="mt-2 text-2xl text-gray-500 font-bold z-10">
                {item.label}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
