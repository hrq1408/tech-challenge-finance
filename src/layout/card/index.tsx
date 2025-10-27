import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-light rounded-xl shadow-md p-4 ${className ?? ""}`}>
      {children}
    </div>
  );
}
