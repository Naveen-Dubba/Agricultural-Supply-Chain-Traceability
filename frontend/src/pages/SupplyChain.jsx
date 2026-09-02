import React, { useState } from 'react';
import {
  Building2,
  Store,
  MapPin,
  Phone,
  Mail,
  Package,
  Search
} from 'lucide-react';

const distributors = [
  {
    id: 'DIST-001',
    name: 'GreenLine Distributors',
    location: 'Vijayawada',
    phone: '+91 9876543210',
    email: 'greenline@agritrace.com',
    stock: '125 Batches',
    status: 'Active'
  },
  {
    id: 'DIST-002',
    name: 'AgroLink Distribution',
    location: 'Guntur',
    phone: '+91 9876501234',
    email: 'agrolink@agritrace.com',
    stock: '98 Batches',
    status: 'Active'
  },
  {
    id: 'DIST-003',
    name: 'FreshRoute Logistics',
    location: 'Nellore',
    phone: '+91 9123456780',
    email: 'freshroute@agritrace.com',
    stock: '74 Batches',
    status: 'Active'
  }
];

const retailers = [
  {
    id: 'RET-001',
    name: 'Fresh Mart',
    location: 'Chennai',
    phone: '+91 9012345678',
    email: 'freshmart@agritrace.com',
    stock: '42 Batches',
    status: 'Active'
  },
  {
    id: 'RET-002',
    name: 'Green Basket',
    location: 'Bangalore',
    phone: '+91 9988776655',
    email: 'greenbasket@agritrace.com',
    stock: '31 Batches',
    status: 'Active'
  },
  {
    id: 'RET-003',
    name: 'Farm Fresh Store',
    location: 'Hyderabad',
    phone: '+91 8899776655',
    email: 'farmfresh@agritrace.com',
    stock: '28 Batches',
    status: 'Active'
  }
];

const SupplyChain = () => {
  const [activeTab, setActiveTab] = useState('distributors');
  const [search, setSearch] = useState('');

  const currentData =
    activeTab === 'distributors' ? distributors : retailers;

  const filteredData = currentData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase()) ||
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div>
          <p style={styles.breadcrumb}>
            Supply Chain / Partners
          </p>

          <h1 style={styles.title}>
            Supply Chain Management
          </h1>

          <p style={styles.subtitle}>
            Manage distributors and retailers
          </p>
        </div>

        <button style={styles.addButton}>
          + Add Partner
        </button>
      </div>

      <div style={styles.summaryGrid}>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Building2 size={22} />
          </div>

          <div>
            <span style={styles.summaryLabel}>
              Distributors
            </span>
            <h2 style={styles.summaryNumber}>12</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Store size={22} />
          </div>

          <div>
            <span style={styles.summaryLabel}>
              Retailers
            </span>
            <h2 style={styles.summaryNumber}>28</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Package size={22} />
          </div>

          <div>
            <span style={styles.summaryLabel}>
              Active Batches
            </span>
            <h2 style={styles.summaryNumber}>186</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <MapPin size={22} />
          </div>

          <div>
            <span style={styles.summaryLabel}>
              Locations
            </span>
            <h2 style={styles.summaryNumber}>16</h2>
          </div>
        </div>

      </div>

      <div style={styles.contentCard}>

        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab('distributors')}
            style={
              activeTab === 'distributors'
                ? styles.activeTab
                : styles.tab
            }
          >
            <Building2 size={18} />
            Distributors
          </button>

          <button
            onClick={() => setActiveTab('retailers')}
            style={
              activeTab === 'retailers'
                ? styles.activeTab
                : styles.tab
            }
          >
            <Store size={18} />
            Retailers
          </button>
        </div>

        <div style={styles.toolbar}>

          <div>
            <h2 style={styles.sectionTitle}>
              {activeTab === 'distributors'
                ? 'Distributor Network'
                : 'Retailer Network'}
            </h2>

            <p style={styles.sectionSubtitle}>
              View registered supply chain partners
            </p>
          </div>

          <div style={styles.searchBox}>
            <Search size={18} color="#8d968e" />

            <input
              type="text"
              placeholder="Search partners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>

        </div>

        <div style={styles.grid}>

          {filteredData.map((item) => (
            <div key={item.id} style={styles.partnerCard}>

              <div style={styles.partnerHeader}>

                <div style={styles.partnerIcon}>
                  {activeTab === 'distributors'
                    ? <Building2 size={27} />
                    : <Store size={27} />}
                </div>

                <div>
                  <h3 style={styles.partnerName}>
                    {item.name}
                  </h3>

                  <span style={styles.activeBadge}>
                    ● {item.status}
                  </span>
                </div>

              </div>

              <div style={styles.infoRow}>
                <strong>ID</strong>
                <span>{item.id}</span>
              </div>

              <div style={styles.infoRow}>
                <MapPin size={16} />
                <span>{item.location}</span>
              </div>

              <div style={styles.infoRow}>
                <Phone size={16} />
                <span>{item.phone}</span>
              </div>

              <div style={styles.infoRow}>
                <Mail size={16} />
                <span>{item.email}</span>
              </div>

              <div style={styles.stockBox}>
                <Package size={18} />

                <div>
                  <span style={styles.stockLabel}>
                    Current Stock
                  </span>

                  <strong>
                    {item.stock}
                  </strong>
                </div>
              </div>

              <button style={styles.viewButton}>
                VIEW DETAILS
              </button>

            </div>
          ))}

        </div>

      </div>
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
    margin: '0 0 5px',
    color: '#45b65a',
    fontSize: '12px',
    fontWeight: '600'
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
    color: '#fff',
    border: 'none',
    padding: '11px 17px',
    borderRadius: '7px',
    fontWeight: '600',
    cursor: 'pointer'
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
    gap: '13px',
    alignItems: 'center'
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

  contentCard: {
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid #e8ede8',
    overflow: 'hidden'
  },

  tabs: {
    display: 'flex',
    borderBottom: '1px solid #e8ede8'
  },

  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    padding: '15px 25px',
    background: '#fff',
    color: '#777',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600'
  },

  activeTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    padding: '15px 25px',
    background: '#45b85a',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600'
  },

  toolbar: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  sectionTitle: {
    margin: 0,
    fontSize: '18px'
  },

  sectionSubtitle: {
    margin: '4px 0 0',
    fontSize: '12px',
    color: '#929992'
  },

  searchBox: {
    minWidth: '280px',
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    border: '1px solid #e1e7e2',
    padding: '9px 12px',
    borderRadius: '8px'
  },

  searchInput: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '14px'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '17px',
    padding: '0 20px 22px'
  },

  partnerCard: {
    border: '1px solid #e7ece7',
    borderRadius: '10px',
    overflow: 'hidden',
    background: '#fff'
  },

  partnerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '18px'
  },

  partnerIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: '#edf9ef',
    color: '#45b65a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  partnerName: {
    margin: '0 0 4px',
    fontSize: '15px'
  },

  activeBadge: {
    color: '#42b658',
    fontSize: '11px'
  },

  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '7px 18px',
    fontSize: '12px',
    color: '#606860'
  },

  stockBox: {
    margin: '13px 18px',
    padding: '11px',
    background: '#f3f9f4',
    borderRadius: '7px',
    display: 'flex',
    gap: '10px',
    color: '#46b65a'
  },

  stockLabel: {
    display: 'block',
    fontSize: '10px',
    color: '#929992'
  },

  viewButton: {
    width: '100%',
    border: 'none',
    background: '#50bd62',
    color: '#fff',
    padding: '10px',
    fontSize: '10px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default SupplyChain;