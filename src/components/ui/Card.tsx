import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-dark-100/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 ${
        hover ? 'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}