'use client';

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50  z-50 flex justify-center items-center" onClick={onClose}>
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-gray-900">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}