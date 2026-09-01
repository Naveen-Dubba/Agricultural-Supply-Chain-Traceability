import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Lock, Phone, Building, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Farmer',
    organizationName: '',
    location: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(formData);
    if (result.success) {
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const roles = [
    'Farmer',
    'CollectionCenterManager',
    'QualityInspector',
    'WarehouseManager',
    'LogisticsProvider',
    'Distributor',
    'Retailer',
  ];

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-large">
        <div className="auth-header">
          <h1>🌾 AgriTrace</h1>
          <h2>Create Account</h2>
          <p>Join the agricultural supply chain revolution</p>
        </div>

        {error && (
          <div className="error-alert">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="success-alert">
            <CheckCircle size={20} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div className="input-wrapper">
                <User size={18} />
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <div className="input-wrapper">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone</label>
              <div className="input-wrapper">
                <Phone size={18} />
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Role *</label>
              <select
                name="role"
                className="form-input"
                value={formData.role}
                onChange={handleChange}
                required
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Organization Name</label>
              <div className="input-wrapper">
                <Building size={18} />
                <input
                  type="text"
                  name="organizationName"
                  className="form-input"
                  placeholder="Your organization name"
                  value={formData.organizationName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <div className="input-wrapper">
                <MapPin size={18} />
                <input
                  type="text"
                  name="location"
                  className="form-input"
                  placeholder="Your location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div className="input-wrapper">
                <Lock size={18} />
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <div className="input-wrapper">
                <Lock size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
