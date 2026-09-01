import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import corsOptions from './config/cors.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import produceRoutes from './routes/produceRoutes.js';
import inspectionRoutes from './routes/inspectionRoutes.js';
import warehouseRoutes from './routes/warehouseRoutes.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import distributorRetailerRoutes from './routes/distributorRetailerRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/produce', produceRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/supply-chain', distributorRetailerRoutes);
app.use('/api/users', userRoutes);

// Public traceability route
app.get('/api/trace/:batchId', async (req, res) => {
  const { batchId } = req.params;
  // This will be handled by produce routes
  res.json({ batchId, message: 'Use /api/produce/trace/:batchId instead' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AgriTrace Backend is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`AgriTrace Backend running on port ${PORT}`);
});
