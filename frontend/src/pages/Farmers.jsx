import React, { useEffect, useState } from 'react';
import {
  Search,
  MapPin,
  Sprout,
  CheckCircle,
  Users,
  Eye,
  Trash2,
  Loader2,
  Edit2,
  Plus
} from 'lucide-react';

import apiClient from '../services/apiClient';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import Toast from '../components/Toast';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    farmName: '',
    farmLocation: '',
    farmSize: '',
    cropTypes: '',
  });

  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchFarmers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await apiClient.get('/farmers');
      const data = Array.isArray(response.data) ? response.data : response.data.farmers || [];
      setFarmers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load farmers from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleAddClick = () => {
    setFormData({ farmName: '', farmLocation: '', farmSize: '', cropTypes: '' });
    setShowAddModal(true);
  };

  const handleEditClick = (farmer) => {
    setSelectedFarmer(farmer);
    setFormData({
      farmName: farmer.farm_name || '',
      farmLocation: farmer.farm_location || '',
      farmSize: farmer.farm_size || '',
      cropTypes: farmer.crop_types || '',
      verificationStatus: farmer.verification_status || 'Pending',
    });
    setShowEditModal(true);
  };

  const handleViewClick = (farmer) => {
    setSelectedFarmer(farmer);
    setShowViewModal(true);
  };

  const handleDeleteClick = (farmer) => {
    setSelectedFarmer(farmer);
    setShowDeleteConfirm(true);
  };

  const handleAddFarmer = async () => {
    if (!formData.farmName || !formData.farmLocation) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post('/farmers', {
        userId: 1, // In real app, get from auth context
        farmName: formData.farmName,
        farmLocation: formData.farmLocation,
        farmSize: formData.farmSize || null,
        cropTypes: formData.cropTypes || '',
      });
      showToast('Farmer added successfully', 'success');
      setShowAddModal(false);
      fetchFarmers();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add farmer', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateFarmer = async () => {
    if (!formData.farmName || !formData.farmLocation) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.put(`/farmers/${selectedFarmer.id}`, {
        farmName: formData.farmName,
        farmLocation: formData.farmLocation,
        farmSize: formData.farmSize || null,
        cropTypes: formData.cropTypes || '',
        verificationStatus: formData.verificationStatus || 'Pending',
      });
      showToast('Farmer updated successfully', 'success');
      setShowEditModal(false);
      fetchFarmers();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update farmer', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFarmer = async () => {
    setSubmitting(true);
    try {
      await apiClient.delete(`/farmers/${selectedFarmer.id}`);
      showToast('Farmer deleted successfully', 'success');
      setShowDeleteConfirm(false);
      fetchFarmers();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete farmer', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredFarmers = farmers.filter((farmer) => {
    const text = search.toLowerCase();
    return (
      String(farmer.farmer_id || farmer.id || '').toLowerCase().includes(text) ||
      String(farmer.full_name || '').toLowerCase().includes(text) ||
      String(farmer.farm_name || '').toLowerCase().includes(text) ||
      String(farmer.farm_location || '').toLowerCase().includes(text)
    );
  });

  const verifiedCount = farmers.filter(f => f.verification_status === 'Verified').length;
  const locations = new Set(farmers.map(f => f.farm_location).filter(Boolean)).size;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <p style={styles.breadcrumb}>Farmers / Management</p>
          <h1 style={styles.title}>Farmers Management</h1>
          <p style={styles.subtitle}>Manage farmer registrations and details</p>
        </div>
        <button style={styles.addButton} onClick={handleAddClick}>
          <Plus size={18} style={{ marginRight: '6px' }} />
          Add Farmer
        </button>
      </div>

      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Users size={23} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Total Farmers</span>
            <h2 style={styles.summaryNumber}>{farmers.length}</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <CheckCircle size={23} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Verified Farmers</span>
            <h2 style={styles.summaryNumber}>{verifiedCount}</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Sprout size={23} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Registered Farms</span>
            <h2 style={styles.summaryNumber}>{farmers.filter(f => f.farm_name).length}</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <MapPin size={23} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Active Locations</span>
            <h2 style={styles.summaryNumber}>{locations}</h2>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>Registered Farmers</h2>
            <p style={styles.cardSubtitle}>Live farmer records from AgriTrace database</p>
          </div>
          <div style={styles.searchBox}>
            <Search size={19} color="#909890" />
            <input
              type="text"
              placeholder="Search farmers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        {loading && (
          <div style={styles.message}>
            <Loader2 size={24} />
            Loading farmers...
          </div>
        )}

        {error && !loading && (
          <div style={styles.error}>
            {error}
            <button onClick={fetchFarmers} style={styles.retryButton}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredFarmers.length === 0 && (
          <EmptyState
            message="No farmers found"
            actionText="Add Farmer"
            onAction={handleAddClick}
            icon={Users}
          />
        )}

        {!loading && !error && filteredFarmers.length > 0 && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Farmer</th>
                  <th style={styles.th}>Farmer ID</th>
                  <th style={styles.th}>Farm Name</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Verification</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarmers.map((farmer) => (
                  <tr key={farmer.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.farmerCell}>
                        <div style={styles.avatar}>
                          <Users size={22} />
                        </div>
                        <div>
                          <strong>{farmer.full_name}</strong>
                          {farmer.email && <span style={styles.smallText}>{farmer.email}</span>}
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <strong>{farmer.farmer_id || 'N/A'}</strong>
                    </td>
                    <td style={styles.td}>{farmer.farm_name || 'Not specified'}</td>
                    <td style={styles.td}>
                      <div style={styles.location}>
                        <MapPin size={15} />
                        {farmer.farm_location || 'Not specified'}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <StatusBadge status={farmer.verification_status} />
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button
                          style={styles.iconButton}
                          title="View Farmer"
                          onClick={() => handleViewClick(farmer)}
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          style={styles.editButton}
                          title="Edit Farmer"
                          onClick={() => handleEditClick(farmer)}
                        >
                          <Edit2 size={17} />
                        </button>
                        <button
                          style={styles.deleteButton}
                          title="Delete Farmer"
                          onClick={() => handleDeleteClick(farmer)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Farmer Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Farmer" size="medium">
        <form onSubmit={(e) => { e.preventDefault(); handleAddFarmer(); }}>
          <FormInput
            label="Farm Name"
            name="farmName"
            value={formData.farmName}
            onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
            required
            placeholder="Enter farm name"
          />
          <FormInput
            label="Farm Location"
            name="farmLocation"
            value={formData.farmLocation}
            onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
            required
            placeholder="Enter farm location"
          />
          <FormInput
            label="Farm Size (hectares)"
            name="farmSize"
            type="number"
            value={formData.farmSize}
            onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
            placeholder="Enter farm size"
          />
          <FormInput
            label="Crop Types"
            name="cropTypes"
            value={formData.cropTypes}
            onChange={(e) => setFormData({ ...formData, cropTypes: e.target.value })}
            placeholder="Enter crops (e.g., Rice, Wheat)"
          />
          <div style={styles.modalActions}>
            <button type="button" style={styles.cancelBtn} onClick={() => setShowAddModal(false)}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Farmer'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Farmer Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Farmer" size="medium">
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateFarmer(); }}>
          <FormInput
            label="Farm Name"
            name="farmName"
            value={formData.farmName}
            onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
            required
            placeholder="Enter farm name"
          />
          <FormInput
            label="Farm Location"
            name="farmLocation"
            value={formData.farmLocation}
            onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
            required
            placeholder="Enter farm location"
          />
          <FormInput
            label="Farm Size (hectares)"
            name="farmSize"
            type="number"
            value={formData.farmSize}
            onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
            placeholder="Enter farm size"
          />
          <FormInput
            label="Crop Types"
            name="cropTypes"
            value={formData.cropTypes}
            onChange={(e) => setFormData({ ...formData, cropTypes: e.target.value })}
            placeholder="Enter crops"
          />
          <FormSelect
            label="Verification Status"
            name="verificationStatus"
            value={formData.verificationStatus}
            onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value })}
            options={[
              { value: 'Pending', label: 'Pending' },
              { value: 'Verified', label: 'Verified' },
              { value: 'Rejected', label: 'Rejected' },
            ]}
          />
          <div style={styles.modalActions}>
            <button type="button" style={styles.cancelBtn} onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={submitting}>
              {submitting ? 'Updating...' : 'Update Farmer'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Farmer Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Farmer Details" size="medium">
        {selectedFarmer && (
          <div style={styles.viewDetails}>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Full Name:</span>
              <span style={styles.detailValue}>{selectedFarmer.full_name}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Farmer ID:</span>
              <span style={styles.detailValue}>{selectedFarmer.farmer_id}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Email:</span>
              <span style={styles.detailValue}>{selectedFarmer.email}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Phone:</span>
              <span style={styles.detailValue}>{selectedFarmer.phone}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Farm Name:</span>
              <span style={styles.detailValue}>{selectedFarmer.farm_name}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Location:</span>
              <span style={styles.detailValue}>{selectedFarmer.farm_location}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Farm Size:</span>
              <span style={styles.detailValue}>{selectedFarmer.farm_size ? `${selectedFarmer.farm_size} hectares` : 'Not specified'}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Crops:</span>
              <span style={styles.detailValue}>{selectedFarmer.crop_types || 'Not specified'}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Verification Status:</span>
              <StatusBadge status={selectedFarmer.verification_status} />
            </div>
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setShowViewModal(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Farmer"
        message={`Are you sure you want to delete farmer "${selectedFarmer?.full_name}"? This action cannot be undone.`}
        onConfirm={handleDeleteFarmer}
        loading={submitting}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: '26px',
    minHeight: '100vh',
    background: '#f7f9f7',
    color: '#2f3630'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '22px'
  },
  breadcrumb: {
    color: '#45b65a',
    fontSize: '12px',
    fontWeight: '600',
    margin: '0 0 5px'
  },
  title: {
    margin: 0,
    fontSize: '27px'
  },
  subtitle: {
    margin: '6px 0 0',
    color: '#89918b',
    fontSize: '14px'
  },
  addButton: {
    background: '#46b85a',
    border: 'none',
    color: '#fff',
    padding: '11px 17px',
    borderRadius: '7px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '22px'
  },
  summaryCard: {
    background: '#fff',
    border: '1px solid #e8ede8',
    borderRadius: '11px',
    padding: '17px',
    display: 'flex',
    alignItems: 'center',
    gap: '13px'
  },
  summaryIcon: {
    width: '46px',
    height: '46px',
    background: '#eaf8ed',
    color: '#45b65a',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  summaryLabel: {
    color: '#8e968f',
    fontSize: '12px'
  },
  summaryNumber: {
    margin: '3px 0 0',
    fontSize: '23px'
  },
  card: {
    background: '#fff',
    border: '1px solid #e8ede8',
    borderRadius: '12px',
    padding: '20px'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '18px'
  },
  cardTitle: {
    margin: 0,
    fontSize: '18px'
  },
  cardSubtitle: {
    margin: '4px 0 0',
    color: '#909791',
    fontSize: '12px'
  },
  searchBox: {
    minWidth: '290px',
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    border: '1px solid #e2e7e2',
    padding: '9px 12px',
    borderRadius: '8px'
  },
  searchInput: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '14px'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '900px'
  },
  th: {
    textAlign: 'left',
    padding: '13px',
    background: '#f4f8f4',
    fontSize: '12px',
    color: '#59615b',
    fontWeight: '600'
  },
  tr: {
    borderBottom: '1px solid #edf0ed'
  },
  td: {
    padding: '14px 13px',
    fontSize: '13px'
  },
  farmerCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px'
  },
  avatar: {
    width: '43px',
    height: '43px',
    borderRadius: '50%',
    background: '#eaf8ed',
    color: '#45b65a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallText: {
    display: 'block',
    fontSize: '10px',
    color: '#959d96',
    marginTop: '2px'
  },
  location: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center'
  },
  actions: {
    display: 'flex',
    gap: '7px'
  },
  iconButton: {
    width: '34px',
    height: '34px',
    background: '#fff',
    border: '1px solid #e2e7e2',
    borderRadius: '6px',
    color: '#45b65a',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  editButton: {
    width: '34px',
    height: '34px',
    background: '#fff',
    border: '1px solid #e2e7e2',
    borderRadius: '6px',
    color: '#3b82f6',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    width: '34px',
    height: '34px',
    background: '#fff',
    border: '1px solid #f1dddd',
    borderRadius: '6px',
    color: '#db5555',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    padding: '35px',
    textAlign: 'center',
    color: '#777',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  error: {
    padding: '25px',
    textAlign: 'center',
    color: '#c33',
    background: '#fde8e8',
    borderRadius: '6px'
  },
  retryButton: {
    marginLeft: '12px',
    padding: '7px 14px',
    background: '#46b85a',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px'
  },
  cancelBtn: {
    padding: '10px 20px',
    background: '#e5e7eb',
    color: '#374151',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  submitBtn: {
    padding: '10px 20px',
    background: '#43b654',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  viewDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '12px'
  },
  detailLabel: {
    fontWeight: '600',
    color: '#374151'
  },
  detailValue: {
    color: '#6b7280'
  }
};

export default Farmers;