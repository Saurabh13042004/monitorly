import express from 'express';
import { db } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get alert channels
router.get('/channels', authenticateToken, async (req, res) => {
  try {
    const channels = await db.allAsync(
      'SELECT * FROM alert_channels WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    );

    const formattedChannels = channels.map(channel => ({
      ...channel,
      config: JSON.parse(channel.config)
    }));

    res.json({ channels: formattedChannels });
  } catch (error) {
    console.error('Get alert channels error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create alert channel
router.post('/channels', authenticateToken, async (req, res) => {
  try {
    const { type, name, config } = req.body;

    if (!type || !name || !config) {
      return res.status(400).json({ error: 'Type, name, and config are required' });
    }

    const result = await db.runAsync(
      'INSERT INTO alert_channels (user_id, type, name, config) VALUES (?, ?, ?, ?)',
      [req.user.userId, type, name, JSON.stringify(config)]
    );

    res.status(201).json({
      message: 'Alert channel created successfully',
      channel: {
        id: result.lastID,
        type,
        name,
        config,
        enabled: true
      }
    });
  } catch (error) {
    console.error('Create alert channel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update alert channel
router.put('/channels/:id', authenticateToken, async (req, res) => {
  try {
    const { name, config, enabled } = req.body;

    await db.runAsync(
      'UPDATE alert_channels SET name = ?, config = ?, enabled = ? WHERE id = ? AND user_id = ?',
      [name, JSON.stringify(config), enabled ? 1 : 0, req.params.id, req.user.userId]
    );

    res.json({ message: 'Alert channel updated successfully' });
  } catch (error) {
    console.error('Update alert channel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete alert channel
router.delete('/channels/:id', authenticateToken, async (req, res) => {
  try {
    await db.runAsync(
      'DELETE FROM alert_channels WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    res.json({ message: 'Alert channel deleted successfully' });
  } catch (error) {
    console.error('Delete alert channel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Test alert channel
router.post('/channels/:id/test', authenticateToken, async (req, res) => {
  try {
    const channel = await db.getAsync(
      'SELECT * FROM alert_channels WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (!channel) {
      return res.status(404).json({ error: 'Alert channel not found' });
    }

    // TODO: Implement actual alert sending logic based on channel type
    console.log(`Testing alert channel: ${channel.type} - ${channel.name}`);

    res.json({ message: 'Test alert sent successfully' });
  } catch (error) {
    console.error('Test alert channel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;