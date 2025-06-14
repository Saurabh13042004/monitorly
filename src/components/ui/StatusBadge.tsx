import React from 'react';

interface StatusBadgeProps {
  status: 'UP' | 'DOWN' | 'PAUSED';
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const colors = {
    UP: 'bg-green-500/20 text-green-400 border-green-500/30',
    DOWN: 'bg-red-500/20 text-red-400 border-red-500/30',
    PAUSED: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colors[status]} ${sizes[size]}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${
        status === 'UP' ? 'bg-green-400' : 
        status === 'DOWN' ? 'bg-red-400' : 'bg-yellow-400'
      }`}></span>
      {status}
    </span>
  );
}