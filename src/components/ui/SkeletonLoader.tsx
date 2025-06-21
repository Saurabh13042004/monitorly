import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-700/50';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl'
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

export function MonitorCardSkeleton() {
  return (
    <div className="bg-dark-100/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" width={40} height={40} />
          <div>
            <Skeleton width={120} height={16} className="mb-2" />
            <Skeleton width={200} height={12} />
          </div>
        </div>
        <Skeleton width={80} height={24} className="rounded-full" />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <Skeleton width={60} height={24} className="mx-auto mb-1" />
          <Skeleton width={40} height={12} className="mx-auto" />
        </div>
        <div className="text-center">
          <Skeleton width={60} height={24} className="mx-auto mb-1" />
          <Skeleton width={50} height={12} className="mx-auto" />
        </div>
        <div className="text-center">
          <Skeleton width={60} height={24} className="mx-auto mb-1" />
          <Skeleton width={45} height={12} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} height={16} width="80%" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height={20} width={colIndex === 0 ? "100%" : "60%"} />
          ))}
        </div>
      ))}
    </div>
  );
}