import pool from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { generateToken } from '../utils/jwtUtils.js';

// Register user
export const register = async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword, role, organizationName, location } =
      req.body;

    // Validation
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user exists
    const connection = await pool.getConnection();
    const [existingUser] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      connection.release();
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Insert user
    await connection.query(
      'INSERT INTO users (full_name, email, phone, password, role, organization_name, location, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [fullName, email, phone, hashedPassword, role, organizationName, location, role === 'Admin']
    );

    connection.release();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      connection.release();
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      connection.release();
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id, user.email, user.role);

    connection.release();

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        organizationName: user.organization_name,
        location: user.location,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT * FROM users WHERE id = ?', [req.user.userId]);

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    connection.release();

    res.json({
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      organizationName: user.organization_name,
      location: user.location,
      isVerified: user.is_verified,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
