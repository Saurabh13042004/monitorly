import cron from 'node-cron';
import axios from 'axios';
import { db } from '../database/init.js';
import { sendAlert } from './notifications.js';

let monitoringActive = false;

export function startMonitoringService() {
  if (monitoringActive) return;
  
  monitoringActive = true;
  console.log('Starting monitoring service...');

  // Run every minute
  cron.schedule('* * * * *', async () => {
    try {
      await checkMonitors();
    } catch (error) {
      console.error('Error in monitoring service:', error);
    }
  });
}

async function checkMonitors() {
  try {
    // Get monitors that need to be checked
    const monitors = await db.allAsync(
      `SELECT * FROM monitors 
       WHERE status != 'PAUSED' 
       AND (next_check IS NULL OR next_check <= datetime('now'))
       ORDER BY next_check ASC`
    );

    console.log(`Checking ${monitors.length} monitors...`);

    for (const monitor of monitors) {
      await checkMonitor(monitor);
    }
  } catch (error) {
    console.error('Error checking monitors:', error);
  }
}

async function checkMonitor(monitor) {
  const startTime = Date.now();
  let status = 'UP';
  let statusCode = null;
  let errorMessage = null;
  let responseTime = null;

  try {
    console.log(`Checking monitor: ${monitor.name} (${monitor.url})`);

    const response = await axios.get(monitor.url, {
      timeout: monitor.timeout_seconds * 1000,
      validateStatus: () => true // Don't throw on HTTP error status codes
    });

    responseTime = Date.now() - startTime;
    statusCode = response.status;

    // Consider 2xx and 3xx as UP
    if (response.status >= 200 && response.status < 400) {
      status = 'UP';
    } else {
      status = 'DOWN';
      errorMessage = `HTTP ${response.status}`;
    }

  } catch (error) {
    responseTime = Date.now() - startTime;
    status = 'DOWN';
    errorMessage = error.message;
    console.error(`Monitor check failed for ${monitor.name}:`, error.message);
  }

  // Record the check
  await db.runAsync(
    `INSERT INTO monitor_checks (monitor_id, status, response_time, status_code, error_message)
     VALUES (?, ?, ?, ?, ?)`,
    [monitor.id, status, responseTime, statusCode, errorMessage]
  );

  // Update monitor status and next check time
  const nextCheck = new Date(Date.now() + monitor.interval_minutes * 60 * 1000);
  await db.runAsync(
    `UPDATE monitors SET 
     status = ?, 
     last_check = datetime('now'), 
     next_check = ?, 
     response_time = ?
     WHERE id = ?`,
    [status, nextCheck.toISOString(), responseTime, monitor.id]
  );

  // Handle status changes
  if (monitor.status !== status) {
    await handleStatusChange(monitor, status, errorMessage);
  }

  console.log(`Monitor ${monitor.name}: ${status} (${responseTime}ms)`);
}

async function handleStatusChange(monitor, newStatus, errorMessage) {
  console.log(`Status change for ${monitor.name}: ${monitor.status} -> ${newStatus}`);

  if (newStatus === 'DOWN' && monitor.status === 'UP') {
    // Monitor went down - create incident
    await db.runAsync(
      'INSERT INTO incidents (monitor_id, started_at, cause, status) VALUES (?, datetime(\'now\'), ?, ?)',
      [monitor.id, errorMessage || 'Unknown error', 'open']
    );

    // Send alert
    await sendAlert(monitor, 'down', errorMessage);

  } else if (newStatus === 'UP' && monitor.status === 'DOWN') {
    // Monitor came back up - resolve incident
    await db.runAsync(
      `UPDATE incidents SET 
       resolved_at = datetime('now'), 
       status = 'resolved' 
       WHERE monitor_id = ? AND status = 'open'`,
      [monitor.id]
    );

    // Send recovery alert
    await sendAlert(monitor, 'up');
  }
}