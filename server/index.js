import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import routes
import authRoutes from './routes/auth.js';
import monitorRoutes from './routes/monitors.js';
import alertRoutes from './routes/alerts.js';
import statusRoutes from './routes/status.js';
import teamRoutes from './routes/team.js';
import integrationRoutes from './routes/integrations.js';

// Import services
import { initDatabase } from './database/init.js';
import { startMonitoringService } from './services/monitoring.js';
import { startNotificationService } from './services/notifications.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/monitors', monitorRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/integrations', integrationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database and start services
async function startServer() {
  try {
    await initDatabase();
    console.log('Database initialized successfully');
    
    // Start monitoring service
    startMonitoringService();
    console.log('Monitoring service started');
    
    // Start notification service
    startNotificationService();
    console.log('Notification service started');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();