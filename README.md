# Monitorly - Website Monitoring SaaS Platform

A complete uptime monitoring platform built with React, Node.js, and SQLite. Monitor your websites, get instant alerts, and keep your users informed with beautiful status pages.

## Features

### Frontend
- 🎨 Modern dark-themed UI with glassmorphism effects
- 📱 Fully responsive design
- 📊 Real-time charts and analytics
- 🔔 Alert management system
- 👥 Team collaboration
- 🌐 Public status pages
- 🔌 Integrations management
- 🔑 API key management

### Backend
- 🚀 RESTful API with Express.js
- 🔐 JWT authentication
- 📊 SQLite database with comprehensive schema
- ⏰ Automated monitoring service with cron jobs
- 📧 Multi-channel notifications (Email, Slack, Webhook)
- 🔍 Incident tracking and management
- 👥 Team management with role-based access

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js, SQLite
- **Authentication**: JWT tokens
- **Monitoring**: Axios for HTTP checks, node-cron for scheduling
- **Notifications**: Nodemailer, Webhook support

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd monitorly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   
   **Frontend (Terminal 1):**
   ```bash
   npm run dev
   ```
   
   **Backend (Terminal 2):**
   ```bash
   npm run server
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Monitors
- `GET /api/monitors` - Get all monitors
- `POST /api/monitors` - Create monitor
- `GET /api/monitors/:id` - Get monitor details
- `PUT /api/monitors/:id` - Update monitor
- `DELETE /api/monitors/:id` - Delete monitor
- `POST /api/monitors/:id/toggle` - Pause/Resume monitor

### Alerts
- `GET /api/alerts/channels` - Get alert channels
- `POST /api/alerts/channels` - Create alert channel
- `PUT /api/alerts/channels/:id` - Update alert channel
- `DELETE /api/alerts/channels/:id` - Delete alert channel
- `POST /api/alerts/channels/:id/test` - Test alert channel

### Status Pages
- `GET /api/status/pages` - Get status pages
- `POST /api/status/pages` - Create status page
- `GET /api/status/public/:slug` - Get public status page

### Team Management
- `GET /api/team/members` - Get team members
- `POST /api/team/invite` - Invite team member
- `PUT /api/team/members/:id` - Update member role
- `DELETE /api/team/members/:id` - Remove team member

## Configuration

### Environment Variables

```env
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=alerts@monitorly.com
```

### Email Setup (Optional)

For email alerts, configure SMTP settings in your `.env` file. Gmail example:

1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `SMTP_PASS`

## Database Schema

The application uses SQLite with the following main tables:

- **users** - User accounts and authentication
- **monitors** - Website monitors configuration
- **monitor_checks** - Historical check results
- **incidents** - Downtime incidents tracking
- **alert_channels** - Notification channels
- **status_pages** - Public status pages
- **team_members** - Team collaboration
- **integrations** - Third-party integrations

## Monitoring Service

The backend includes an automated monitoring service that:

- Checks monitors based on their configured intervals
- Records response times and status codes
- Detects status changes and creates incidents
- Sends alerts through configured channels
- Supports HTTP/HTTPS monitoring with SSL checks

## Alert Channels

Supported notification channels:

- **Email** - SMTP-based email notifications
- **Webhook** - HTTP POST to custom endpoints
- **Slack** - Slack webhook integration
- **More coming soon** - Discord, Telegram, SMS, etc.

## Production Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure proper SMTP settings
4. Consider using PostgreSQL or MySQL for production

### Security Considerations
- Use HTTPS in production
- Implement rate limiting
- Set up proper CORS policies
- Use environment variables for secrets
- Regular security updates

### Scaling
- Use PM2 or similar for process management
- Implement database connection pooling
- Consider Redis for session storage
- Set up monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API endpoints

---

Built with ❤️ using React, Node.js, and modern web technologies.