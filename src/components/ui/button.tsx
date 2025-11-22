import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

