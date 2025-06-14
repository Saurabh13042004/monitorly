import express from 'express';
import { db } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get team members
router.get('/members', authenticateToken, async (req, res) => {
  try {
    const members = await db.allAsync(
      `SELECT tm.*, u.name, u.email 
       FROM team_members tm 
       JOIN users u ON tm.user_id = u.id 
       WHERE tm.team_owner_id = ? 
       ORDER BY tm.invited_at DESC`,
      [req.user.userId]
    );

    res.json({ members });
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Invite team member
router.post('/invite', authenticateToken, async (req, res) => {
  try {
    const { email, role = 'viewer' } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user exists
    let user = await db.getAsync('SELECT id FROM users WHERE email = ?', [email]);
    
    if (!user) {
      // Create a placeholder user for the invitation
      const result = await db.runAsync(
        'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)',
        [email, '', 'Invited User']
      );
      user = { id: result.lastID };
    }

    // Check if already a team member
    const existingMember = await db.getAsync(
      'SELECT id FROM team_members WHERE user_id = ? AND team_owner_id = ?',
      [user.id, req.user.userId]
    );

    if (existingMember) {
      return res.status(400).json({ error: 'User is already a team member' });
    }

    // Create team member invitation
    await db.runAsync(
      'INSERT INTO team_members (user_id, team_owner_id, role, status) VALUES (?, ?, ?, ?)',
      [user.id, req.user.userId, role, 'pending']
    );

    // TODO: Send invitation email

    res.status(201).json({ message: 'Team member invited successfully' });
  } catch (error) {
    console.error('Invite team member error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update team member role
router.put('/members/:id', authenticateToken, async (req, res) => {
  try {
    const { role } = req.body;

    await db.runAsync(
      'UPDATE team_members SET role = ? WHERE id = ? AND team_owner_id = ?',
      [role, req.params.id, req.user.userId]
    );

    res.json({ message: 'Team member role updated successfully' });
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove team member
router.delete('/members/:id', authenticateToken, async (req, res) => {
  try {
    await db.runAsync(
      'DELETE FROM team_members WHERE id = ? AND team_owner_id = ?',
      [req.params.id, req.user.userId]
    );

    res.json({ message: 'Team member removed successfully' });
  } catch (error) {
    console.error('Remove team member error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;