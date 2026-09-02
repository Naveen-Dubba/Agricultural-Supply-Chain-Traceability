import React, { useState } from 'react';
import {
  Search,
  Eye,
  Download,
  Wheat,
  Package,
  CalendarDays,
  MapPin
} from 'lucide-react';

const batches = [
  {
    id: 'AGRI-2026-0001',
    product: 'Wheat',
    icon: <Wheat size={28} />,
    quantity: '500.00 kg',
    harvestDate: '6/15/2026',
    stage: 'Warehouse',
    location: 'Vijayawada',
    status: 'Processing'
  },
  {
    id: 'AGRI-2026-0002',
    product: 'Tomato',
    icon: <Package size={28} />,
    quantity: '300.00 kg',
    harvestDate: '8/20/2026',
    stage: 'Distributor',
    location: 'Guntur',
    status: 'Processing'
  },
  {
    id: 'AGRI-2026-0003',
    product: 'Cotton',
    icon: <Package size={28} />,
    quantity: '150.00 bales',
    harvestDate: '8/1/2026',
    stage: 'Collection',
    location: 'Nellore',
    status: 'Pending'
  }
];

const Produce = () => {
  const [search, setSearch] = useState('');

  const filteredBatches = batches.filter((batch) =>
    batch.id.toLowerCase().includes(search.toLowerCase()) ||
    batch.product.toLowerCase().includes(search.toLowerCase()) ||
    batch.stage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <p style={styles.breadcrumb}>Produce / Batch Management</p>
          <h1 style={styles.title}>Produce Batches</h1>
          <p style={styles.subtitle}>
            Track and manage agricultural produce batches
          </p>
        </div>

        <button style={styles.addButton}>
          + Add Produce Batch
        </button>
      </div>

      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Wheat size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Total Batches</span>
            <h2 style={styles.summaryNumber}>524</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Package size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>In Processing</span>
            <h2 style={styles.summaryNumber}>32</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <CalendarDays size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Harvested This Month</span>
            <h2 style={styles.summaryNumber}>86</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <MapPin size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Active Locations</span>
            <h2 style={styles.summaryNumber}>18</h2>
          </div>
        </div>
      </div>

      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <div>
            <h2 style={styles.tableTitle}>Produce Inventory</h2>
            <p style={styles.tableSubtitle}>
              View current batch and supply chain information
            </p>
          </div>

          <div style={styles.searchBox}>
            <Search size={19} color="#8f9891" />
            <input
              type="text"
              placeholder="Search batches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Batch ID</th>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Harvest Date</th>
                <th style={styles.th}>Current Stage</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBatches.map((batch) => (
                <tr key={batch.id} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{batch.id}</strong>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.productCell}>
                      <div style={styles.productImage}>
                        {batch.icon}
                      </div>

                      <div>
                        <strong>{batch.product}</strong>
                        <span style={styles.productSub}>
                          Agricultural Produce
                        </span>
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>{batch.quantity}</td>

                  <td style={styles.td}>
                    {batch.harvestDate}
                  </td>

                  <td style={styles.td}>
                    <span style={styles.stageBadge}>
                      {batch.stage}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.locationCell}>
                      <MapPin size={15} />
                      {batch.location}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <span
                      style={
                        batch.status === 'Processing'
                          ? styles.processing
                          : styles.pending
                      }
                    >
                      {batch.status}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button style={styles.iconButton} title="View">
                        <Eye size={17} />
                      </button>

                      <button style={styles.iconButton} title="Download">
                        <Download size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBatches.length === 0 && (
            <div style={styles.empty}>
              No produce batches found.
            </div>
          )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '22px'
  },

  breadcrumb: {
    margin: '0 0 5px',
    fontSize: '12px',
    color: '#45b65a',
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
    border: 'none',
    background: '#46b85a',
    color: '#ffffff',
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
    background: '#ffffff',
    border: '1px solid #e9eee9',
    borderRadius: '11px',
    padding: '17px',
    display: 'flex',
    alignItems: 'center',
    gap: '13px'
  },

  summaryIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '10px',
    background: '#eaf8ed',
    color: '#45b65a',
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

  tableCard: {
    background: '#ffffff',
    border: '1px solid #e8ede8',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 3px 15px rgba(38, 79, 45, 0.04)'
  },

  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '18px',
    gap: '20px'
  },

  tableTitle: {
    margin: 0,
    fontSize: '18px'
  },

  tableSubtitle: {
    margin: '4px 0 0',
    fontSize: '12px',
    color: '#909791'
  },

  searchBox: {
    minWidth: '290px',
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    border: '1px solid #e2e7e2',
    padding: '9px 12px',
    borderRadius: '8px',
    background: '#fafbfa'
  },

  searchInput: {
    width: '100%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px'
  },

  tableWrapper: {
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '1000px'
  },

  th: {
    textAlign: 'left',
    padding: '13px',
    background: '#f4f8f4',
    borderBottom: '1px solid #e8ede8',
    fontSize: '12px',
    color: '#59615b'
  },

  tr: {
    borderBottom: '1px solid #edf0ed'
  },

  td: {
    padding: '14px 13px',
    fontSize: '13px',
    verticalAlign: 'middle'
  },

  productCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px'
  },

  productImage: {
    width: '48px',
    height: '48px',
    borderRadius: '9px',
    background: '#eff9f0',
    color: '#43b758',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #dceede'
  },

  productSub: {
    display: 'block',
    fontSize: '10px',
    color: '#959d96',
    marginTop: '2px'
  },

  stageBadge: {
    background: '#edf8ef',
    color: '#3eaa51',
    padding: '6px 9px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '600'
  },

  locationCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },

  processing: {
    display: 'inline-block',
    background: '#e8f2ff',
    color: '#1474bd',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '600'
  },

  pending: {
    display: 'inline-block',
    background: '#fff5d9',
    color: '#c88b00',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '600'
  },

  actions: {
    display: 'flex',
    gap: '7px'
  },

  iconButton: {
    width: '34px',
    height: '34px',
    border: '1px solid #e2e7e2',
    background: '#ffffff',
    color: '#4aaf59',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  empty: {
    padding: '30px',
    textAlign: 'center',
    color: '#959d96'
  }
};

export default Produce;