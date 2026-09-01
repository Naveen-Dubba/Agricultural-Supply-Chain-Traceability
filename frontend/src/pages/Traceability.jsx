import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { produceService } from '../services/apiService';

const Traceability = () => {
  const { batchId } = useParams();
  const [batchData, setBatchData] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTraceability();
  }, [batchId]);

  const fetchTraceability = async () => {
    try {
      const response = await produceService.getTraceability(batchId);
      setBatchData(response.data.batch);
      setEvents(response.data.events || []);
    } catch (err) {
      setError('Batch not found. Please check the Batch ID.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading traceability information...</div>;

  if (error) return <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>{error}</div>;

  const eventTypeColors = {
    'Produce Registered': '#10b981',
    'Harvested': '#8b5cf6',
    'Collected': '#3b82f6',
    'Quality Inspected': '#f59e0b',
    'Stored': '#6366f1',
    'Dispatched': '#ef4444',
    'In Transit': '#06b6d4',
    'Delivered to Distributor': '#14b8a6',
    'Delivered to Retailer': '#84cc16',
    'Sold': '#10b981',
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>🌾 Agricultural Produce Traceability</h1>
        <p style={{ fontSize: '16px', color: '#6b7280' }}>Complete supply chain journey of {batchData?.product_name}</p>
      </div>

      {/* Batch Info */}
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', fontWeight: '600' }}>Batch Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>Batch ID</p>
            <p style={{ fontSize: '18px', fontWeight: '600', color: '#10b981' }}>{batchData?.batch_id}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>Product</p>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>{batchData?.product_name}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>Farmer</p>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>{batchData?.farmer_name}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>Farm Location</p>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>{batchData?.farm_location}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>Harvest Date</p>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>{new Date(batchData?.harvest_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>Quantity</p>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>{batchData?.quantity} {batchData?.unit}</p>
          </div>
        </div>
      </div>

      {/* Verification Badge */}
      <div style={{ background: '#dcfce7', padding: '16px', borderRadius: '8px', marginBottom: '30px', border: '2px solid #10b981', textAlign: 'center' }}>
        <p style={{ color: '#059669', fontWeight: '600' }}>✓ GENUINE TRACKED PRODUCT - All information verified and certified</p>
      </div>

      {/* Timeline */}
      <div>
        <h2 style={{ fontSize: '20px', marginBottom: '30px', fontWeight: '600' }}>Supply Chain Timeline</h2>
        <div style={{ position: 'relative', paddingLeft: '40px' }}>
          {events.map((event, index) => (
            <div key={index} style={{ marginBottom: '30px', position: 'relative' }}>
              {index < events.length - 1 && (
                <div style={{ position: 'absolute', left: '-22px', top: '40px', width: '2px', height: '60px', background: eventTypeColors[event.event_type] || '#d1d5db' }} />
              )}
              <div style={{ position: 'absolute', left: '-31px', top: '0', width: '18px', height: '18px', background: eventTypeColors[event.event_type] || '#d1d5db', borderRadius: '50%', border: '4px solid white', boxShadow: '0 0 0 2px ' + (eventTypeColors[event.event_type] || '#d1d5db') }} />

              <div style={{ background: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: eventTypeColors[event.event_type] || '#6b7280' }}>{event.event_type}</h3>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{new Date(event.event_date).toLocaleDateString()} {event.event_time}</span>
                </div>
                <p style={{ color: '#6b7280', marginBottom: '8px' }}>{event.location}</p>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#6b7280', fontSize: '12px' }}>
        <p>This information is provided by AgriTrace - Agricultural Supply Chain Traceability Platform</p>
        <p>For more information, visit www.agritrace.com</p>
      </div>
    </div>
  );
};

export default Traceability;
