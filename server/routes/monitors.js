import express from 'express';
import { db } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all monitors for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const monitors = await db.allAsync(
      `SELECT m.*, 
       (SELECT COUNT(*) FROM monitor_checks mc WHERE mc.monitor_id = m.id AND mc.status = 'UP' AND mc.checked_at > datetime('now', '-30 days')) * 100.0 / 
       NULLIF((SELECT COUNT(*) FROM monitor_checks mc WHERE mc.monitor_id = m.id AND mc.checked_at > datetime('now', '-30 days')), 0) as uptime_percentage
       FROM monitors m WHERE m.user_id = ?
       ORDER BY m.created_at DESC`,
      [req.user.userId]
    );

    const formattedMonitors = monitors.map(monitor => ({
      id: monitor.id.toString(),
      name: monitor.name,
      url: monitor.url,
      type: monitor.type,
      status: monitor.status,
      uptime: Math.round(monitor.uptime_percentage || 100),
      responseTime: monitor.response_time || 0,
      lastCheck: monitor.last_check ? formatTimeAgo(new Date(monitor.last_check)) : 'Never',
      nextCheck: monitor.next_check ? `in ${Math.ceil((new Date(monitor.next_check) - new Date()) / 60000)} minutes` : 'Paused',
      tags: monitor.tags ? monitor.tags.split(',') : []
    }));

    res.json({ monitors: formattedMonitors });
  } catch (error) {
    console.error('Get monitors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new monitor
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, url, type = 'HTTPS', interval = 5, sslCheck = true, domainCheck = false, tags = [] } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const monitorName = name || url;
    const tagsString = Array.isArray(tags) ? tags.join(',') : '';

    const result = await db.runAsync(
      `INSERT INTO monitors (user_id, name, url, type, interval_minutes, ssl_check, domain_check, tags, status, next_check)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'UP', datetime('now', '+' || ? || ' minutes'))`,
      [req.user.userId, monitorName, url, type, interval, sslCheck ? 1 : 0, domainCheck ? 1 : 0, tagsString, interval]
    );

    const monitor = await db.getAsync('SELECT * FROM monitors WHERE id = ?', [result.lastID]);

    res.status(201).json({
      message: 'Monitor created successfully',
      monitor: {
        id: monitor.id.toString(),
        name: monitor.name,
        url: monitor.url,
        type: monitor.type,
        status: monitor.status,
        uptime: 100,
        responseTime: 0,
        lastCheck: 'Never',
        nextCheck: `in ${interval} minutes`,
        tags: monitor.tags ? monitor.tags.split(',') : []
      }
    });
  } catch (error) {
    console.error('Create monitor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get monitor by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const monitor = await db.getAsync(
      'SELECT * FROM monitors WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (!monitor) {
      return res.status(404).json({ error: 'Monitor not found' });
    }

    // Get recent checks
    const checks = await db.allAsync(
      'SELECT * FROM monitor_checks WHERE monitor_id = ? ORDER BY checked_at DESC LIMIT 100',
      [monitor.id]
    );

    // Get incidents
    const incidents = await db.allAsync(
      'SELECT * FROM incidents WHERE monitor_id = ? ORDER BY started_at DESC LIMIT 10',
      [monitor.id]
    );

    res.json({
      monitor: {
        ...monitor,
        tags: monitor.tags ? monitor.tags.split(',') : []
      },
      checks,
      incidents
    });
  } catch (error) {
    console.error('Get monitor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update monitor
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, url, type, interval, sslCheck, domainCheck, tags } = req.body;
    const tagsString = Array.isArray(tags) ? tags.join(',') : '';

    await db.runAsync(
      `UPDATE monitors SET 
       name = ?, url = ?, type = ?, interval_minutes = ?, 
       ssl_check = ?, domain_check = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND user_id = ?`,
      [name, url, type, interval, sslCheck ? 1 : 0, domainCheck ? 1 : 0, tagsString, req.params.id, req.user.userId]
    );

    res.json({ message: 'Monitor updated successfully' });
  } catch (error) {
    console.error('Update monitor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete monitor
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await db.runAsync('DELETE FROM monitors WHERE id = ? AND user_id = ?', [req.params.id, req.user.userId]);
    res.json({ message: 'Monitor deleted successfully' });
  } catch (error) {
    console.error('Delete monitor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Pause/Resume monitor
router.post('/:id/toggle', authenticateToken, async (req, res) => {
  try {
    const monitor = await db.getAsync(
      'SELECT status FROM monitors WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (!monitor) {
      return res.status(404).json({ error: 'Monitor not found' });
    }

    const newStatus = monitor.status === 'PAUSED' ? 'UP' : 'PAUSED';
    
    await db.runAsync(
      'UPDATE monitors SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
      [newStatus, req.params.id, req.user.userId]
    );

    res.json({ message: `Monitor ${newStatus === 'PAUSED' ? 'paused' : 'resumed'} successfully` });
  } catch (error) {
    console.error('Toggle monitor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function formatTimeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

export default router;