"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { pulse } from "@/lib/animations";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "accent" | "success" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const variants = {
  primary: "bg-primary text-white shadow-3d hover:shadow-soft-hover border-b-4 border-purple-800 active:border-b-0 active:translate-y-1",
  secondary: "bg-secondary text-black shadow-3d hover:shadow-soft-hover border-b-4 border-lime-700 active:border-b-0 active:translate-y-1",
  accent: "bg-accent text-black shadow-3d hover:shadow-soft-hover border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1",
  success: "bg-[#81C784] text-white shadow-3d hover:shadow-soft-hover border-b-4 border-green-700 active:border-b-0 active:translate-y-1",
  danger: "bg-destructive text-white shadow-3d hover:shadow-soft-hover border-b-4 border-red-800 active:border-b-0 active:translate-y-1",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-2xl",
  lg: "px-8 py-4 text-xl rounded-3xl",
  xl: "px-10 py-5 text-2xl rounded-[32px]",
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      variants={pulse}
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "font-bold transition-all relative outline-none select-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
