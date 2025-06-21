import React from 'react';
import { Clock, CheckCircle, AlertTriangle, MessageSquare } from 'lucide-react';

interface IncidentEvent {
  id: string;
  timestamp: string;
  type: 'created' | 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'comment';
  title: string;
  description?: string;
  author?: string;
}

interface IncidentTimelineProps {
  events: IncidentEvent[];
}

export default function IncidentTimeline({ events }: IncidentTimelineProps) {
  const getEventIcon = (type: IncidentEvent['type']) => {
    switch (type) {
      case 'created':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'investigating':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'identified':
        return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case 'monitoring':
        return <Clock className="h-4 w-4 text-blue-400" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getEventColor = (type: IncidentEvent['type']) => {
    switch (type) {
      case 'created':
        return 'border-red-500/30 bg-red-500/10';
      case 'investigating':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'identified':
        return 'border-orange-500/30 bg-orange-500/10';
      case 'monitoring':
        return 'border-blue-500/30 bg-blue-500/10';
      case 'resolved':
        return 'border-green-500/30 bg-green-500/10';
      case 'comment':
        return 'border-gray-500/30 bg-gray-500/10';
      default:
        return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex space-x-4">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full border
              ${getEventColor(event.type)}
            `}>
              {getEventIcon(event.type)}
            </div>
            {index < events.length - 1 && (
              <div className="w-px h-8 bg-gray-700 mt-2" />
            )}
          </div>
          
          {/* Event content */}
          <div className="flex-1 pb-8">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">{event.title}</h4>
              <span className="text-sm text-gray-400">{event.timestamp}</span>
            </div>
            {event.description && (
              <p className="text-gray-300 text-sm mb-2">{event.description}</p>
            )}
            {event.author && (
              <p className="text-xs text-gray-500">by {event.author}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}