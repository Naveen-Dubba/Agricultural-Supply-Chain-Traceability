import React, { useState, useEffect } from 'react';
import { shipmentService } from '../services/apiService';
import { Plus, Search, Truck } from 'lucide-react';

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await shipmentService.getAllShipments();
      setShipments(response.data || []);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  const statuses = ['Scheduled', 'Dispatched', 'In Transit', 'Delayed', 'Delivered', 'Cancelled'];

  const filteredShipments = shipments.filter((s) => {
    const matchSearch = s.shipment_id?.includes(searchTerm.toUpperCase()) || s.batch_id?.toString().includes(searchTerm);
    const matchStatus = filterStatus === 'all' || s.shipment_status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusColors = {
    'Scheduled': '#3b82f6',
    'Dispatched': '#f59e0b',
    'In Transit': '#06b6d4',
    'Delayed': '#ef4444',
    'Delivered': '#10b981',
    'Cancelled': '#9ca3af',
  };

  return (
    <div className="container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Shipment Tracking</h1>
          <p className="page-subtitle">Track and manage produce shipments</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> New Shipment
        </button>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, background: 'white', padding: '10px 16px', borderRadius: '8px' }}>
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            placeholder="Search shipments..."
            className="form-input"
            style={{ flex: 1, border: 'none', padding: '0' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="form-input"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ width: '150px' }}
        >
          <option value="all">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Batch ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Dispatch Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id}>
                <td><strong>{shipment.shipment_id}</strong></td>
                <td>{shipment.batch_id}</td>
                <td>{shipment.origin}</td>
                <td>{shipment.destination}</td>
                <td><span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', backgroundColor: (statusColors[shipment.shipment_status] || '#d1d5db') + '20', color: statusColors[shipment.shipment_status] || '#6b7280' }}>{shipment.shipment_status}</span></td>
                <td>{new Date(shipment.dispatch_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shipments;
