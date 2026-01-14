export interface Letter {
  id: string;
  letter: string; // The Arabic letter (e.g. "أ")
  label: string; // The word (e.g. "أسد")
  color: string; // Tailwind color class or hex
  imagePath: string; // Path to image
  soundPath?: string; // Path to letter sound
  wordSoundPath?: string; // Path to word sound
}

export interface QuizQuestion {
  id: string;
  type: "find-letter" | "find-image";
  correctAnswerId: string;
  options: Letter[]; // 4 options
  promptAudio?: string;
  questionText: string;
}
