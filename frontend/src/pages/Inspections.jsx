import React, { useState } from 'react';
import {
  Search,
  ClipboardCheck,
  BadgeCheck,
  CalendarDays,
  FlaskConical,
  Eye,
  FileText
} from 'lucide-react';

const inspections = [
  {
    id: 'INSP-001',
    batchId: 'AGRI-2026-0001',
    product: 'Wheat',
    grade: 'Grade A',
    result: 'Approved',
    date: '9/1/2026',
    inspector: 'Quality Team 1'
  },
  {
    id: 'INSP-002',
    batchId: 'AGRI-2026-0002',
    product: 'Tomato',
    grade: 'Grade A',
    result: 'Approved',
    date: '9/1/2026',
    inspector: 'Quality Team 2'
  },
  {
    id: 'INSP-003',
    batchId: 'AGRI-2026-0003',
    product: 'Cotton',
    grade: 'Grade B',
    result: 'Pending',
    date: '8/31/2026',
    inspector: 'Quality Team 1'
  }
];

const Inspections = () => {
  const [search, setSearch] = useState('');

  const filteredInspections = inspections.filter((item) =>
    item.id.toLowerCase().includes(search.toLowerCase()) ||
    item.batchId.toLowerCase().includes(search.toLowerCase()) ||
    item.product.toLowerCase().includes(search.toLowerCase()) ||
    item.result.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div>
          <p style={styles.breadcrumb}>Quality / Inspections</p>
          <h1 style={styles.title}>Quality Inspections</h1>
          <p style={styles.subtitle}>
            Manage and monitor produce quality inspections
          </p>
        </div>

        <button style={styles.addButton}>
          + New Inspection
        </button>
      </div>

      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <ClipboardCheck size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Total Inspections</span>
            <h2 style={styles.summaryNumber}>128</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <BadgeCheck size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Approved</span>
            <h2 style={styles.summaryNumber}>112</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <FlaskConical size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Pending</span>
            <h2 style={styles.summaryNumber}>10</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <CalendarDays size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Today</span>
            <h2 style={styles.summaryNumber}>6</h2>
          </div>
        </div>
      </div>

      <div style={styles.card}>

        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>Inspection Records</h2>
            <p style={styles.cardSubtitle}>
              View quality grading and inspection results
            </p>
          </div>

          <div style={styles.searchBox}>
            <Search size={19} color="#8b948c" />
            <input
              type="text"
              placeholder="Search inspections..."
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
                <th style={styles.th}>Inspection ID</th>
                <th style={styles.th}>Batch ID</th>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Quality Grade</th>
                <th style={styles.th}>Result</th>
                <th style={styles.th}>Inspector</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInspections.map((item) => (
                <tr key={item.id} style={styles.tr}>

                  <td style={styles.td}>
                    <strong>{item.id}</strong>
                  </td>

                  <td style={styles.td}>
                    {item.batchId}
                  </td>

                  <td style={styles.td}>
                    <div style={styles.productCell}>
                      <div style={styles.productIcon}>
                        <FlaskConical size={22} />
                      </div>

                      <div>
                        <strong>{item.product}</strong>
                        <span style={styles.smallText}>
                          Quality checked
                        </span>
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>
                    <span
                      style={
                        item.grade === 'Grade A'
                          ? styles.gradeA
                          : styles.gradeB
                      }
                    >
                      {item.grade}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <div
                      style={
                        item.result === 'Approved'
                          ? styles.approvedRow
                          : styles.pendingRow
                      }
                    >
                      <BadgeCheck size={17} />
                      {item.result}
                    </div>
                  </td>

                  <td style={styles.td}>
                    {item.inspector}
                  </td>

                  <td style={styles.td}>
                    {item.date}
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button style={styles.iconButton} title="View">
                        <Eye size={17} />
                      </button>

                      <button style={styles.iconButton} title="Report">
                        <FileText size={17} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {filteredInspections.length === 0 && (
            <div style={styles.empty}>
              No inspection records found.
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
    color: '#45b65a',
    fontWeight: '600',
    fontSize: '12px'
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
    cursor: 'pointer',
    fontWeight: '600'
  },

  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '22px'
  },

  summaryCard: {
    background: '#ffffff',
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

  card: {
    background: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e8ede8',
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
    minWidth: '1050px'
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
    gap: '10px'
  },

  productIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '9px',
    background: '#eef9f0',
    color: '#46b85a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  smallText: {
    display: 'block',
    color: '#959d96',
    fontSize: '10px',
    marginTop: '2px'
  },

  gradeA: {
    display: 'inline-block',
    background: '#dcf8e4',
    color: '#139447',
    padding: '6px 10px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '11px'
  },

  gradeB: {
    display: 'inline-block',
    background: '#fff2cd',
    color: '#b97a00',
    padding: '6px 10px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '11px'
  },

  approvedRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#10ae72',
    fontWeight: '600'
  },

  pendingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#d49711',
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

export default Inspections;