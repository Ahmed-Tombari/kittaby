"use client";

import { useState } from "react";
import Dashboard from "@/components/features/Dashboard";
import AlphabetGrid from "@/components/features/AlphabetGrid";
import QuizGame from "@/components/features/QuizGame";
import Button from "@/components/ui/Button";
import { Home as HomeIcon, BookOpen, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ViewState = "dashboard" | "learn" | "quiz";

export default function Home() {
  const [view, setView] = useState<ViewState>("dashboard");

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {view === "dashboard" && (
          <motion.div
            key="dashboard"
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0"
          >
            <Dashboard onStart={() => setView("learn")} />
          </motion.div>
        )}

        {view !== "dashboard" && (
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 pt-4"
          >
             {/* Navigation Bar */}
             <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
               <Button variant="secondary" size="sm" onClick={() => setView("dashboard")} className="gap-2 flex">
                 <HomeIcon size={20} />
                 <span className="hidden md:inline">الرئيسية</span>
               </Button>
               
               <div className="flex gap-4">
                 <Button 
                    variant={view === "learn" ? "primary" : "secondary"} 
                    size="sm" 
                    onClick={() => setView("learn")}
                    className={view === "learn" ? "shadow-none translate-y-1" : ""}
                 >
                   <BookOpen size={20} className="mr-2" />
                   تعلم
                 </Button>
                 <Button 
                    variant={view === "quiz" ? "primary" : "accent"} 
                    size="sm" 
                    onClick={() => setView("quiz")}
                    className={view === "quiz" ? "shadow-none translate-y-1" : ""}
                 >
                   <Gamepad2 size={20} className="mr-2" />
                   العب
                 </Button>
               </div>
             </nav>

             <motion.div
               key={view}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
               className="mt-4"
             >
               {view === "learn" ? (
                 <AlphabetGrid />
               ) : (
                 <QuizGame onBack={() => setView("learn")} />
               )}
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
