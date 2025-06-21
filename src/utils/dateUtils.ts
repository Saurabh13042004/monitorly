export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
}

export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

export function getUptimeColor(uptime: number): string {
  if (uptime >= 99.5) return 'text-green-400';
  if (uptime >= 99) return 'text-yellow-400';
  if (uptime >= 95) return 'text-orange-400';
  return 'text-red-400';
}

export function generateTimeRange(range: '24h' | '7d' | '30d' | '90d') {
  const now = new Date();
  const data = [];
  
  switch (range) {
    case '24h':
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          time: time.toISOString(),
          uptime: 99 + Math.random(),
          incidents: Math.random() > 0.95 ? 1 : 0
        });
      }
      break;
    case '7d':
      for (let i = 6; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        data.push({
          time: time.toISOString(),
          uptime: 98 + Math.random() * 2,
          incidents: Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0
        });
      }
      break;
    case '30d':
      for (let i = 29; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        data.push({
          time: time.toISOString(),
          uptime: 97 + Math.random() * 3,
          incidents: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0
        });
      }
      break;
    case '90d':
      for (let i = 89; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        data.push({
          time: time.toISOString(),
          uptime: 96 + Math.random() * 4,
          incidents: Math.random() > 0.6 ? Math.floor(Math.random() * 8) : 0
        });
      }
      break;
  }
  
  return data;
}