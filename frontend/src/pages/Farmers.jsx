import React, { useState, useEffect } from 'react';
import { farmerService } from '../services/apiService';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ farmName: '', farmLocation: '', farmSize: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await farmerService.getAllFarmers();
      setFarmers(response.data || []);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFarmer = async (e) => {
    e.preventDefault();
    try {
      await farmerService.addFarmer(formData);
      setFormData({ farmName: '', farmLocation: '', farmSize: '' });
      setShowForm(false);
      fetchFarmers();
    } catch (error) {
      console.error('Error adding farmer:', error);
    }
  };

  const handleDeleteFarmer = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await farmerService.deleteFarmer(id);
        fetchFarmers();
      } catch (error) {
        console.error('Error deleting farmer:', error);
      }
    }
  };

  const filteredFarmers = farmers.filter((farmer) =>
    farmer.farm_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Farmers Management</h1>
          <p className="page-subtitle">Manage farmer registrations and details</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={18} /> Add Farmer
        </button>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '10px 16px', borderRadius: '8px' }}>
        <Search size={18} color="#9ca3af" />
        <input
          type="text"
          placeholder="Search farmers..."
          className="form-input"
          style={{ flex: 1, border: 'none', padding: '0' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3>Add New Farmer</h3>
          <form onSubmit={handleAddFarmer} style={{ marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Farm Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Farm Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.farmLocation}
                  onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
                  required
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">Save Farmer</button>
              <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#9ca3af' }} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Farmer ID</th>
              <th>Name</th>
              <th>Farm Name</th>
              <th>Location</th>
              <th>Verification Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.id}>
                <td>{farmer.farmer_id}</td>
                <td>{farmer.full_name}</td>
                <td>{farmer.farm_name}</td>
                <td>{farmer.farm_location}</td>
                <td><span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', backgroundColor: farmer.verification_status === 'Verified' ? '#dcfce7' : '#fef3c7', color: farmer.verification_status === 'Verified' ? '#059669' : '#d97706' }}>{farmer.verification_status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-small" style={{ marginRight: '8px' }}><Edit size={14} /></button>
                  <button className="btn btn-danger btn-small" onClick={() => handleDeleteFarmer(farmer.id)}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Farmers;
