import jwt from 'jsonwebtoken';

const generateToken = (userId, email, role) => {
  return jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET || 'your_super_secret_jwt_key',
    { expiresIn: '7d' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key');
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
