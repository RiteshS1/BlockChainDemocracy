// src/components/Modal.tsx
import React from 'react';

// Define the props type
interface ModalProps {
  isOpen: boolean;
  onClose: () => void; // Function type for closing the modal
  title: string;
  children: React.ReactNode; // Type for children prop
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content bg-white rounded-lg shadow-lg p-6 z-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <button onClick={onClose} className="close-button">Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
