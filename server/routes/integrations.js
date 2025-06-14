import express from 'express';
import { db } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get integrations
router.get('/', authenticateToken, async (req, res) => {
  try {
    const integrations = await db.allAsync(
      'SELECT * FROM integrations WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    );

    const formattedIntegrations = integrations.map(integration => ({
      ...integration,
      config: JSON.parse(integration.config)
    }));

    res.json({ integrations: formattedIntegrations });
  } catch (error) {
    console.error('Get integrations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create integration
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { type, name, config } = req.body;

    if (!type || !name || !config) {
      return res.status(400).json({ error: 'Type, name, and config are required' });
    }

    const result = await db.runAsync(
      'INSERT INTO integrations (user_id, type, name, config) VALUES (?, ?, ?, ?)',
      [req.user.userId, type, name, JSON.stringify(config)]
    );

    res.status(201).json({
      message: 'Integration created successfully',
      integration: {
        id: result.lastID,
        type,
        name,
        config,
        enabled: true
      }
    });
  } catch (error) {
    console.error('Create integration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update integration
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, config, enabled } = req.body;

    await db.runAsync(
      'UPDATE integrations SET name = ?, config = ?, enabled = ? WHERE id = ? AND user_id = ?',
      [name, JSON.stringify(config), enabled ? 1 : 0, req.params.id, req.user.userId]
    );

    res.json({ message: 'Integration updated successfully' });
  } catch (error) {
    console.error('Update integration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete integration
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await db.runAsync(
      'DELETE FROM integrations WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    res.json({ message: 'Integration deleted successfully' });
  } catch (error) {
    console.error('Delete integration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;