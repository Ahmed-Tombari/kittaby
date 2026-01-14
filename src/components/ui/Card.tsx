import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "default" | "glass" | "solid";
}

export default function Card({
  className,
  children,
  variant = "default",
  ...props
}: CardProps) {
  const baseStyles = "rounded-3xl p-6 transition-all";
  const variantsStyles = {
    default: "bg-white shadow-soft border-2 border-white/50",
    glass: "bg-white/80 backdrop-blur-md shadow-lg border border-white/40",
    solid: "bg-kid-surface shadow-soft",
  };

  return (
    <motion.div
      className={cn(baseStyles, variantsStyles[variant], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
