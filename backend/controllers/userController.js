import pool from '../config/database.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let query = 'SELECT id, full_name, email, phone, role, organization_name, location, is_verified, created_at FROM users WHERE 1=1';

    const params = [];

    if (role) {
      query += ' AND role = ?';
      params.push(role);
    }

    query += ' ORDER BY created_at DESC';

    const connection = await pool.getConnection();
    const [users] = await connection.query(query, params);
    connection.release();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [users] = await connection.query(
      'SELECT id, full_name, email, phone, role, organization_name, location, is_verified, created_at FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'User not found' });
    }

    connection.release();
    res.json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phone, organizationName, location, isVerified } = req.body;

    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE users SET full_name = ?, phone = ?, organization_name = ?, location = ?, is_verified = ?, updated_at = NOW() WHERE id = ?',
      [fullName, phone, organizationName, location, isVerified, id]
    );

    connection.release();
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM users WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Get notifications
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const connection = await pool.getConnection();
    const [notifications] = await connection.query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20',
      [userId]
    );

    connection.release();
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const connection = await pool.getConnection();
    await connection.query('UPDATE notifications SET is_read = TRUE WHERE id = ?', [notificationId]);
    connection.release();
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
};
