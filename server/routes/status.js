import express from 'express';
import { db } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get status pages
router.get('/pages', authenticateToken, async (req, res) => {
  try {
    const pages = await db.allAsync(
      'SELECT * FROM status_pages WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    );

    res.json({ pages });
  } catch (error) {
    console.error('Get status pages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create status page
router.post('/pages', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      slug,
      domain,
      customDomain,
      password,
      theme = 'dark',
      showUptime = true,
      showCharts = true,
      showIncidents = true,
      removeBranding = false
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' });
    }

    // Check if slug is unique
    const existingPage = await db.getAsync('SELECT id FROM status_pages WHERE slug = ?', [slug]);
    if (existingPage) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const result = await db.runAsync(
      `INSERT INTO status_pages 
       (user_id, name, slug, domain, custom_domain, password, theme, show_uptime, show_charts, show_incidents, remove_branding)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.userId, name, slug, domain, customDomain, password, theme, 
       showUptime ? 1 : 0, showCharts ? 1 : 0, showIncidents ? 1 : 0, removeBranding ? 1 : 0]
    );

    res.status(201).json({
      message: 'Status page created successfully',
      page: {
        id: result.lastID,
        name,
        slug,
        domain,
        customDomain,
        theme,
        showUptime,
        showCharts,
        showIncidents,
        removeBranding
      }
    });
  } catch (error) {
    console.error('Create status page error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get public status page
router.get('/public/:slug', async (req, res) => {
  try {
    const page = await db.getAsync(
      'SELECT * FROM status_pages WHERE slug = ?',
      [req.params.slug]
    );

    if (!page) {
      return res.status(404).json({ error: 'Status page not found' });
    }

    // Get monitors for this user
    const monitors = await db.allAsync(
      `SELECT m.name, m.url, m.status, m.response_time,
       (SELECT COUNT(*) FROM monitor_checks mc WHERE mc.monitor_id = m.id AND mc.status = 'UP' AND mc.checked_at > datetime('now', '-30 days')) * 100.0 / 
       NULLIF((SELECT COUNT(*) FROM monitor_checks mc WHERE mc.monitor_id = m.id AND mc.checked_at > datetime('now', '-30 days')), 0) as uptime_percentage
       FROM monitors m WHERE m.user_id = ? AND m.status != 'PAUSED'`,
      [page.user_id]
    );

    // Get recent incidents
    const incidents = await db.allAsync(
      `SELECT i.*, m.name as monitor_name 
       FROM incidents i 
       JOIN monitors m ON i.monitor_id = m.id 
       WHERE m.user_id = ? AND i.started_at > datetime('now', '-30 days')
       ORDER BY i.started_at DESC LIMIT 10`,
      [page.user_id]
    );

    res.json({
      page: {
        name: page.name,
        theme: page.theme,
        showUptime: page.show_uptime,
        showCharts: page.show_charts,
        showIncidents: page.show_incidents,
        removeBranding: page.remove_branding
      },
      monitors: monitors.map(monitor => ({
        name: monitor.name,
        status: monitor.status,
        uptime: Math.round(monitor.uptime_percentage || 100),
        responseTime: monitor.response_time || 0
      })),
      incidents: incidents.map(incident => ({
        id: incident.id,
        monitorName: incident.monitor_name,
        startedAt: incident.started_at,
        resolvedAt: incident.resolved_at,
        cause: incident.cause,
        status: incident.status
      }))
    });
  } catch (error) {
    console.error('Get public status page error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;