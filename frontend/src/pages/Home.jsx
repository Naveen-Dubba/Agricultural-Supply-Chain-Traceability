import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Zap, Barcode, Shield, TrendingUp, Users } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">🌾 AgriTrace</div>
        <div className="nav-buttons">
          <button onClick={() => navigate('/login')} className="nav-btn login-btn">Login</button>
          <button onClick={() => navigate('/register')} className="nav-btn register-btn">Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Agricultural Supply Chain Traceability</h1>
          <p className="hero-subtitle">Track produce from farm to table with complete transparency</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/register')} className="btn btn-primary btn-large">Get Started</button>
            <button className="btn btn-secondary btn-large">Track Produce</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">🚜</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why AgriTrace?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Leaf className="feature-icon" />
            <h3>Complete Traceability</h3>
            <p>Track every step from farm registration to consumer delivery</p>
          </div>
          <div className="feature-card">
            <Barcode className="feature-icon" />
            <h3>QR Code Verification</h3>
            <p>Scan QR codes to verify authenticity and origin</p>
          </div>
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3>Quality Assurance</h3>
            <p>Real-time quality inspection and monitoring</p>
          </div>
          <div className="feature-card">
            <Zap className="feature-icon" />
            <h3>Real-time Updates</h3>
            <p>Live tracking of shipments and inventory</p>
          </div>
          <div className="feature-card">
            <TrendingUp className="feature-icon" />
            <h3>Analytics & Reports</h3>
            <p>Comprehensive insights into supply chain performance</p>
          </div>
          <div className="feature-card">
            <Users className="feature-icon" />
            <h3>Role-based Access</h3>
            <p>Tailored dashboards for different stakeholders</p>
          </div>
        </div>
      </section>

      {/* Supply Chain Overview */}
      <section className="supply-chain">
        <h2>Supply Chain Journey</h2>
        <div className="timeline">
          <div className="timeline-step">
            <div className="step-number">1</div>
            <div className="step-label">Farm</div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <div className="step-number">2</div>
            <div className="step-label">Collection</div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <div className="step-number">3</div>
            <div className="step-label">Inspection</div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <div className="step-number">4</div>
            <div className="step-label">Warehouse</div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <div className="step-number">5</div>
            <div className="step-label">Transport</div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <div className="step-number">6</div>
            <div className="step-label">Distribution</div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <div className="step-number">7</div>
            <div className="step-label">Retail</div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <div className="step-number">8</div>
            <div className="step-label">Consumer</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat">
          <h3>1000+</h3>
          <p>Active Farmers</p>
        </div>
        <div className="stat">
          <h3>50000+</h3>
          <p>Produce Batches Tracked</p>
        </div>
        <div className="stat">
          <h3>99.9%</h3>
          <p>Accuracy Rate</p>
        </div>
        <div className="stat">
          <h3>24/7</h3>
          <p>Real-time Tracking</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Transform Your Supply Chain?</h2>
        <p>Join thousands of agricultural stakeholders using AgriTrace</p>
        <button onClick={() => navigate('/register')} className="btn btn-primary btn-large">Start Now</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>AgriTrace</h4>
            <p>Agricultural Supply Chain Traceability Platform</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 AgriTrace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
