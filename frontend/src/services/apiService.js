import apiClient from './apiClient';

// Auth services
export const authService = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (data) => apiClient.post('/auth/register', data),
  getCurrentUser: () => apiClient.get('/auth/me'),
};

// Farmer services
export const farmerService = {
  getAllFarmers: () => apiClient.get('/farmers'),
  getFarmerById: (id) => apiClient.get(`/farmers/${id}`),
  addFarmer: (data) => apiClient.post('/farmers', data),
  updateFarmer: (id, data) => apiClient.put(`/farmers/${id}`, data),
  deleteFarmer: (id) => apiClient.delete(`/farmers/${id}`),
  verifyFarmer: (id, data) => apiClient.patch(`/farmers/${id}/verify`, data),
  getFarmerStats: (farmerId) => apiClient.get(`/farmers/${farmerId}/stats`),
};

// Produce services
export const produceService = {
  getAllBatches: (params) => apiClient.get('/produce', { params }),
  getBatchById: (id) => apiClient.get(`/produce/${id}`),
  addBatch: (data) => apiClient.post('/produce', data),
  updateBatch: (id, data) => apiClient.put(`/produce/${id}`, data),
  deleteBatch: (id) => apiClient.delete(`/produce/${id}`),
  getTraceability: (batchId) => apiClient.get(`/produce/trace/${batchId}`),
};

// Inspection services
export const inspectionService = {
  getAllInspections: () => apiClient.get('/inspections'),
  getInspectionById: (id) => apiClient.get(`/inspections/${id}`),
  addInspection: (data) => apiClient.post('/inspections', data),
  updateInspection: (id, data) => apiClient.put(`/inspections/${id}`, data),
  deleteInspection: (id) => apiClient.delete(`/inspections/${id}`),
};

// Warehouse services
export const warehouseService = {
  getAllWarehouses: () => apiClient.get('/warehouses'),
  getWarehouseById: (id) => apiClient.get(`/warehouses/${id}`),
  addWarehouse: (data) => apiClient.post('/warehouses', data),
  updateWarehouse: (id, data) => apiClient.put(`/warehouses/${id}`, data),
  deleteWarehouse: (id) => apiClient.delete(`/warehouses/${id}`),
  getInventory: (warehouseId) => apiClient.get(`/warehouses/${warehouseId}/inventory`),
};

// Shipment services
export const shipmentService = {
  getAllShipments: (params) => apiClient.get('/shipments', { params }),
  getShipmentById: (id) => apiClient.get(`/shipments/${id}`),
  addShipment: (data) => apiClient.post('/shipments', data),
  updateStatus: (id, data) => apiClient.patch(`/shipments/${id}/status`, data),
  deleteShipment: (id) => apiClient.delete(`/shipments/${id}`),
};

// Dashboard services
export const dashboardService = {
  getStats: () => apiClient.get('/dashboard/stats'),
  getActivities: () => apiClient.get('/dashboard/activities'),
  getProduceByCategory: () => apiClient.get('/dashboard/categories'),
  getQualityGrades: () => apiClient.get('/dashboard/quality'),
  getShipmentStats: () => apiClient.get('/dashboard/shipments'),
};

// Supply chain services
export const supplyChainService = {
  getAllDistributors: () => apiClient.get('/supply-chain/distributors'),
  getAllRetailers: () => apiClient.get('/supply-chain/retailers'),
  getRetailerInventory: (retailerId) => apiClient.get(`/supply-chain/retailers/${retailerId}/inventory`),
  addRetailerInventory: (data) => apiClient.post('/supply-chain/retailers/inventory', data),
};

// User services
export const userService = {
  getAllUsers: (params) => apiClient.get('/users', { params }),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  updateUser: (id, data) => apiClient.put(`/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
  getNotifications: (userId) => apiClient.get(`/users/${userId}/notifications`),
  markNotificationAsRead: (notificationId) => apiClient.patch(`/users/${notificationId}/read`),
};
