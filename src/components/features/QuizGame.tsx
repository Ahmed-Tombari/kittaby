"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALPHABET_DATA } from "@/data/alphabet";
import Button from "../ui/Button";
import CelebrationModal from "../ui/CelebrationModal";
import { shake, popIn, container } from "@/lib/animations";
import { Type, Cat, ArrowRight } from "lucide-react";
import Image from "next/image";

type QuizMode = "menu" | "alphabet" | "animal";

export default function QuizGame({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<QuizMode>("menu");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  // Memoize shuffled options to keep them stable during renders
  // We use currentQuestionIndex as dependency to regenerate on new question
  const { currentLetter, shuffledOptions } = useMemo(() => {
    const letter = ALPHABET_DATA[currentQuestionIndex % ALPHABET_DATA.length];
    
    // Create distinct options
    const otherLetters = ALPHABET_DATA.filter(l => l.id !== letter.id);
    const randomDistractors = otherLetters
      .sort(() => 0.5 - Math.random()) // Sort is okay here as it's inside useMemo
      .slice(0, 3);
      
    const opts = [letter, ...randomDistractors];
    return {
      currentLetter: letter,
      shuffledOptions: opts.sort(() => 0.5 - Math.random())
    };
  }, [currentQuestionIndex]);
  
  // Audio Ref
  const bravoAudioRef = useRef<HTMLAudioElement | null>(null);
  if (!bravoAudioRef.current && typeof window !== 'undefined') {
    const audio = new Audio("/sounds/bravo.mp3"); // Ensure this file exists or use mock
    audio.volume = 0.5;
    bravoAudioRef.current = audio;
  }

  // --- Game Data Logic processed in useMemo above ---

  const handleAnswer = (selectedId: string) => {
    if (selectedId === currentLetter.id) {
       // Correct
       bravoAudioRef.current?.play().catch(() => {});
       
       if (score + 1 >= 5) { // Win after 5
         setShowCelebration(true);
       } else {
         setScore(s => s + 1);
         setCurrentQuestionIndex(i => i + 1);
       }
    } else {
       // Wrong
       setWrongShake(true);
       setTimeout(() => setWrongShake(false), 500);
    }
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setMode("menu"); // Go back to menu after winning
  };
  
  // --- Render: Selection Screen ---
  if (mode === "menu") {
    return (
      <div className="max-w-4xl mx-auto p-4 flex flex-col items-center min-h-[80vh] justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-primary mb-12 drop-shadow-sm"
        >
          اختر نوع التحدي
        </motion.h1>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl px-4"
        >
           <motion.div variants={popIn} custom={1} className="w-full">
             <Button 
               variant="primary" 
               size="xl" 
               className="w-full h-64 flex flex-col items-center justify-center gap-6 rounded-4xl text-3xl shadow-soft hover:scale-105 transition-transform"
               onClick={() => setMode("alphabet")}
             >
                <div className="p-6 bg-white/20 rounded-full">
                  <Type size={64} />
                </div>
                <span>حروف</span>
             </Button>
           </motion.div>

           <motion.div variants={popIn} custom={2} className="w-full">
             <Button 
               variant="secondary" 
               size="xl" 
               className="w-full h-64 flex flex-col items-center justify-center gap-6 rounded-4xl text-3xl shadow-soft hover:scale-105 transition-transform"
               onClick={() => setMode("animal")}
             >
                <div className="p-6 bg-white/20 rounded-full">
                  <Cat size={64} />
                </div>
                <span>حيوانات</span>
             </Button>
           </motion.div>
        </motion.div>

        <div className="mt-16">
          <Button variant="accent" onClick={onBack}>
            <ArrowRight className="ml-2" />
            رجوع
          </Button>
        </div>
      </div>
    );
  }

  // --- Render: Game Modes ---
  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col items-center min-h-[80vh] justify-center">
      <CelebrationModal isOpen={showCelebration} onClose={handleCelebrationClose} />

      {/* Progress Bar */}
      <div className="w-full max-w-lg bg-slate-200 h-6 rounded-full mb-8 overflow-hidden border-2 border-white shadow-inner">
        <motion.div 
          className="h-full bg-linear-to-r from-secondary to-green-400"
          initial={{ width: 0 }}
          animate={{ width: `${(score / 5) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
           key={currentQuestionIndex}
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.9, y: -20 }}
           className="w-full flex flex-col items-center"
        >
          {/* Question Prompt */}
          <div className="mb-10 text-center">
             {mode === "alphabet" ? (
               <h2 className="text-4xl md:text-5xl font-bold text-primary">
                 أين حرف <span className="text-accent inline-block transform hover:scale-110 transition-transform bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-accent/20 mx-2">{currentLetter.letter}</span> ؟
               </h2>
             ) : (
               <div className="flex flex-col items-center gap-6">
                 <div className="relative w-48 h-48 md:w-64 md:h-64 bg-white rounded-3xl p-4 shadow-soft border-4 border-secondary -rotate-3">
                    <Image 
                      src={currentLetter.imagePath}  
                      alt="Guess the animal"
                      fill
                      className="object-contain p-2"
                    />
                 </div>
                 <h2 className="text-4xl font-bold text-slate-700">
                   ما اسم هذا الحيوان؟
                 </h2>
               </div>
             )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
            {shuffledOptions.map((opt, i) => (
              <motion.div
                key={opt.id}
                variants={popIn}
                custom={i}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <motion.div
                   animate={wrongShake ? "shake" : undefined}
                   variants={shake}
                   className="w-full"
                >
                  <Button
                    variant={mode === "alphabet" ? "primary" : "accent"}
                    size="lg"
                    className="w-full h-24 md:h-32 text-3xl md:text-5xl shadow-3d active:shadow-3d-pressed transition-all"
                    onClick={() => handleAnswer(opt.id)}
                  >
                    {mode === "alphabet" ? opt.letter : opt.label}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex gap-4">
        <Button variant="secondary" onClick={() => setMode("menu")}>
           خروج
        </Button>
      </div>
    </div>
  );
}
