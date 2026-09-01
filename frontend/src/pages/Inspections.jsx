import React, { useState, useEffect } from 'react';
import { inspectionService, produceService } from '../services/apiService';
import { Plus, Search, CheckCircle, XCircle } from 'lucide-react';

const Inspections = () => {
  const [inspections, setInspections] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    batchId: '',
    qualityGrade: 'Grade A',
    inspectionResult: 'Approved',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [inspRes, prodRes] = await Promise.all([
        inspectionService.getAllInspections(),
        produceService.getAllBatches(),
      ]);
      setInspections(inspRes.data || []);
      setBatches(prodRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInspection = async (e) => {
    e.preventDefault();
    try {
      await inspectionService.addInspection({
        ...formData,
        inspectionDate: new Date().toISOString().split('T')[0],
        inspectorId: 1,
      });
      setFormData({ batchId: '', qualityGrade: 'Grade A', inspectionResult: 'Approved' });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error adding inspection:', error);
    }
  };

  const filteredInspections = inspections.filter((insp) =>
    insp.batch_id?.toString().includes(searchTerm) || insp.inspection_id?.includes(searchTerm)
  );

  return (
    <div className="container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Quality Inspections</h1>
          <p className="page-subtitle">Manage produce quality inspections</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={18} /> New Inspection
        </button>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '10px 16px', borderRadius: '8px' }}>
        <Search size={18} color="#9ca3af" />
        <input
          type="text"
          placeholder="Search inspections..."
          className="form-input"
          style={{ flex: 1, border: 'none', padding: '0' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>Create Inspection Report</h3>
          <form onSubmit={handleAddInspection} style={{ marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Batch</label>
                <select className="form-input" value={formData.batchId} onChange={(e) => setFormData({ ...formData, batchId: e.target.value })} required>
                  <option value="">Select Batch</option>
                  {batches.map((b) => <option key={b.id} value={b.id}>{b.batch_id}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quality Grade</label>
                <select className="form-input" value={formData.qualityGrade} onChange={(e) => setFormData({ ...formData, qualityGrade: e.target.value })}>
                  <option>Grade A</option>
                  <option>Grade B</option>
                  <option>Grade C</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Result</label>
                <select className="form-input" value={formData.inspectionResult} onChange={(e) => setFormData({ ...formData, inspectionResult: e.target.value })}>
                  <option>Approved</option>
                  <option>Conditional Approval</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">Save Inspection</button>
              <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#9ca3af' }} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Inspection ID</th>
              <th>Batch ID</th>
              <th>Quality Grade</th>
              <th>Result</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredInspections.map((insp) => (
              <tr key={insp.id}>
                <td>{insp.inspection_id}</td>
                <td>{insp.batch_id}</td>
                <td><span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', backgroundColor: insp.quality_grade === 'Grade A' ? '#dcfce7' : '#fef3c7', color: insp.quality_grade === 'Grade A' ? '#059669' : '#d97706' }}>{insp.quality_grade}</span></td>
                <td style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {insp.inspection_result === 'Approved' ? (
                    <><CheckCircle size={16} color="#10b981" /> {insp.inspection_result}</>
                  ) : (
                    <><XCircle size={16} color="#ef4444" /> {insp.inspection_result}</>
                  )}
                </td>
                <td>{new Date(insp.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inspections;
