import nodemailer from 'nodemailer';
import { db } from '../database/init.js';

let notificationService = null;

export function startNotificationService() {
  console.log('Starting notification service...');
  
  // Initialize email transporter
  if (process.env.SMTP_HOST) {
    notificationService = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
}

export async function sendAlert(monitor, type, errorMessage = null) {
  try {
    // Get user info
    const user = await db.getAsync('SELECT * FROM users WHERE id = ?', [monitor.user_id]);
    if (!user) return;

    // Get alert channels for this user
    const channels = await db.allAsync(
      'SELECT * FROM alert_channels WHERE user_id = ? AND enabled = 1',
      [monitor.user_id]
    );

    console.log(`Sending ${type} alert for monitor ${monitor.name} to ${channels.length} channels`);

    for (const channel of channels) {
      await sendAlertToChannel(channel, monitor, user, type, errorMessage);
    }
  } catch (error) {
    console.error('Error sending alert:', error);
  }
}

async function sendAlertToChannel(channel, monitor, user, type, errorMessage) {
  const config = JSON.parse(channel.config);

  switch (channel.type) {
    case 'email':
      await sendEmailAlert(config, monitor, user, type, errorMessage);
      break;
    case 'webhook':
      await sendWebhookAlert(config, monitor, user, type, errorMessage);
      break;
    case 'slack':
      await sendSlackAlert(config, monitor, user, type, errorMessage);
      break;
    default:
      console.log(`Alert channel type ${channel.type} not implemented yet`);
  }
}

async function sendEmailAlert(config, monitor, user, type, errorMessage) {
  if (!notificationService) {
    console.log('Email service not configured');
    return;
  }

  const subject = type === 'down' 
    ? `🚨 ${monitor.name} is DOWN`
    : `✅ ${monitor.name} is back UP`;

  const html = `
    <h2>${subject}</h2>
    <p><strong>Monitor:</strong> ${monitor.name}</p>
    <p><strong>URL:</strong> ${monitor.url}</p>
    <p><strong>Status:</strong> ${type.toUpperCase()}</p>
    ${errorMessage ? `<p><strong>Error:</strong> ${errorMessage}</p>` : ''}
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
    <hr>
    <p>Powered by Monitorly</p>
  `;

  try {
    await notificationService.sendMail({
      from: process.env.SMTP_FROM || 'alerts@monitorly.com',
      to: config.email,
      subject,
      html
    });
    console.log(`Email alert sent to ${config.email}`);
  } catch (error) {
    console.error('Error sending email alert:', error);
  }
}

async function sendWebhookAlert(config, monitor, user, type, errorMessage) {
  const payload = {
    monitor: {
      id: monitor.id,
      name: monitor.name,
      url: monitor.url
    },
    status: type,
    error: errorMessage,
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers || {})
      },
      body: JSON.stringify(payload)
    });
    console.log(`Webhook alert sent to ${config.url}`);
  } catch (error) {
    console.error('Error sending webhook alert:', error);
  }
}

async function sendSlackAlert(config, monitor, user, type, errorMessage) {
  const color = type === 'down' ? 'danger' : 'good';
  const emoji = type === 'down' ? '🚨' : '✅';
  
  const payload = {
    attachments: [{
      color,
      title: `${emoji} Monitor ${type.toUpperCase()}: ${monitor.name}`,
      fields: [
        {
          title: 'URL',
          value: monitor.url,
          short: true
        },
        {
          title: 'Status',
          value: type.toUpperCase(),
          short: true
        }
      ],
      footer: 'Monitorly',
      ts: Math.floor(Date.now() / 1000)
    }]
  };

  if (errorMessage) {
    payload.attachments[0].fields.push({
      title: 'Error',
      value: errorMessage,
      short: false
    });
  }

  try {
    await fetch(config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    console.log('Slack alert sent');
  } catch (error) {
    console.error('Error sending Slack alert:', error);
  }
}