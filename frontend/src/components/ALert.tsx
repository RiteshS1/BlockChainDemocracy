// src/components/Alert.tsx
import React from 'react';

// Define the props type
interface AlertProps {
  message: string;
  type: 'success' | 'error'; // You can expand this if you have more alert types
}

const Alert = ({ message, type }: AlertProps) => {
  return (
    <div
      className={`p-4 mb-4 text-sm ${
        type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
      }`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
