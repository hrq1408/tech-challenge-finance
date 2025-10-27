import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TextInput({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-primary">{label}</label>}
      <input
        className="border border-primary-dark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light bg-light"
        {...props}
      />
    </div>
  );
}
