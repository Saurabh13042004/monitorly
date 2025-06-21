import React, { ReactNode } from 'react';
import { GripVertical, X, Settings } from 'lucide-react';
import Card from '../ui/Card';

interface DashboardWidgetProps {
  id: string;
  title: string;
  children: ReactNode;
  onRemove?: (id: string) => void;
  onConfigure?: (id: string) => void;
  isDragging?: boolean;
  className?: string;
}

export default function DashboardWidget({ 
  id, 
  title, 
  children, 
  onRemove, 
  onConfigure,
  isDragging = false,
  className = ''
}: DashboardWidgetProps) {
  return (
    <Card className={`relative group ${isDragging ? 'opacity-50' : ''} ${className}`}>
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1 text-gray-400 hover:text-white transition-colors cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          {onConfigure && (
            <button
              onClick={() => onConfigure(id)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              title="Configure widget"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}
          {onRemove && (
            <button
              onClick={() => onRemove(id)}
              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              title="Remove widget"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Widget Content */}
      <div>{children}</div>
    </Card>
  );
}