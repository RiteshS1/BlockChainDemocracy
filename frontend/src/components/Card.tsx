// src/components/Card.tsx
import React from 'react';

// Define the props type
interface CardProps {
  title: string;
  content: string;
  onClick: () => void;
}

const Card = ({ title, content, onClick }: CardProps) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 cursor-pointer" onClick={onClick}>
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Card;
