import React, { useState, useEffect } from 'react';
import { supplyChainService } from '../services/apiService';
import { Search, Users } from 'lucide-react';

const SupplyChain = () => {
  const [distributors, setDistributors] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [activeTab, setActiveTab] = useState('distributors');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupplyChainData();
  }, []);

  const fetchSupplyChainData = async () => {
    try {
      const [distRes, retRes] = await Promise.all([
        supplyChainService.getAllDistributors(),
        supplyChainService.getAllRetailers(),
      ]);
      setDistributors(distRes.data || []);
      setRetailers(retRes.data || []);
    } catch (error) {
      console.error('Error fetching supply chain data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Supply Chain Management</h1>
        <p className="page-subtitle">Manage distributors and retailers</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <button
          onClick={() => setActiveTab('distributors')}
          style={{
            padding: '12px 20px',
            border: 'none',
            background: activeTab === 'distributors' ? '#10b981' : 'transparent',
            color: activeTab === 'distributors' ? 'white' : '#6b7280',
            cursor: 'pointer',
            fontWeight: '600',
            borderBottom: activeTab === 'distributors' ? '3px solid #10b981' : 'none',
          }}
        >
          Distributors
        </button>
        <button
          onClick={() => setActiveTab('retailers')}
          style={{
            padding: '12px 20px',
            border: 'none',
            background: activeTab === 'retailers' ? '#10b981' : 'transparent',
            color: activeTab === 'retailers' ? 'white' : '#6b7280',
            cursor: 'pointer',
            fontWeight: '600',
            borderBottom: activeTab === 'retailers' ? '3px solid #10b981' : 'none',
          }}
        >
          Retailers
        </button>
      </div>

      {activeTab === 'distributors' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {distributors.map((dist) => (
            <div key={dist.id} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{dist.distributor_name}</h3>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                <p><strong>Company:</strong> {dist.company}</p>
                <p><strong>Location:</strong> {dist.location}</p>
                <p><strong>Contact:</strong> {dist.contact}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'retailers' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {retailers.map((retail) => (
            <div key={retail.id} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{retail.store_name}</h3>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                <p><strong>Owner:</strong> {retail.owner_name}</p>
                <p><strong>Address:</strong> {retail.address}, {retail.city}</p>
                <p><strong>Contact:</strong> {retail.contact}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplyChain;
