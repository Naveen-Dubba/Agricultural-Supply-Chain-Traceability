import React, { useState, useEffect } from 'react';
import { warehouseService } from '../services/apiService';
import { Plus, Search, Package } from 'lucide-react';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await warehouseService.getAllWarehouses();
      setWarehouses(response.data || []);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWarehouses = warehouses.filter((w) =>
    w.warehouse_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Warehouse Management</h1>
          <p className="page-subtitle">Manage storage facilities and inventory</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Add Warehouse
        </button>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '10px 16px', borderRadius: '8px' }}>
        <Search size={18} color="#9ca3af" />
        <input
          type="text"
          placeholder="Search warehouses..."
          className="form-input"
          style={{ flex: 1, border: 'none', padding: '0' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredWarehouses.map((warehouse) => (
          <div key={warehouse.id} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{warehouse.warehouse_name}</h3>
              <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', backgroundColor: warehouse.status === 'Active' ? '#dcfce7' : '#fee2e2', color: warehouse.status === 'Active' ? '#059669' : '#991b1b' }}>{warehouse.status}</span>
            </div>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
              <p><strong>Location:</strong> {warehouse.location}</p>
              <p><strong>Capacity:</strong> {warehouse.capacity} units</p>
              <p><strong>Available:</strong> {warehouse.available_capacity} units</p>
            </div>
            <div style={{ paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
              <button className="btn btn-secondary btn-small" style={{ marginRight: '8px' }}>View Details</button>
              <button className="btn btn-secondary btn-small"><Package size={14} /> Inventory</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Warehouses;
