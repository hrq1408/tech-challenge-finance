import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded-lg font-semibold transition-colors";
  let variantClasses = "";

  if (variant === "primary") {
    variantClasses = "bg-primary text-white hover:bg-primary-light";
  } else if (variant === "secondary") {
    variantClasses = "bg-secondary text-white hover:bg-secondary-light";
  } else if (variant === "outline") {
    variantClasses = "border-2 border-primary text-primary hover:bg-primary hover:text-white";
  }

  return (
    <button className={`${base} ${variantClasses} ${className}`} {...props} />
  );
}
