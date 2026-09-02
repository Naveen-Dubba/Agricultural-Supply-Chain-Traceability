import React, { useState } from 'react';
import {
  Search,
  Truck,
  MapPin,
  PackageCheck,
  Clock3,
  CalendarDays,
  Eye,
  Navigation
} from 'lucide-react';

const shipments = [
  {
    id: 'SHIP-001',
    batchId: 'AGRI-2026-0001',
    origin: 'Delhi',
    destination: 'Mumbai',
    status: 'Delivered',
    dispatchDate: '7/10/2026',
    vehicle: 'AP 16 AB 2456'
  },
  {
    id: 'SHIP-002',
    batchId: 'AGRI-2026-0002',
    origin: 'Delhi',
    destination: 'Bangalore',
    status: 'In Transit',
    dispatchDate: '9/1/2026',
    vehicle: 'TN 09 CD 7788'
  },
  {
    id: 'SHIP-003',
    batchId: 'AGRI-2026-0003',
    origin: 'Guntur',
    destination: 'Chennai',
    status: 'Scheduled',
    dispatchDate: '9/2/2026',
    vehicle: 'AP 07 EF 1204'
  }
];

const Shipments = () => {
  const [search, setSearch] = useState('');

  const filteredShipments = shipments.filter((item) =>
    item.id.toLowerCase().includes(search.toLowerCase()) ||
    item.batchId.toLowerCase().includes(search.toLowerCase()) ||
    item.origin.toLowerCase().includes(search.toLowerCase()) ||
    item.destination.toLowerCase().includes(search.toLowerCase()) ||
    item.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    if (status === 'Delivered') return styles.delivered;
    if (status === 'In Transit') return styles.inTransit;
    return styles.scheduled;
  };

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div>
          <p style={styles.breadcrumb}>Logistics / Shipments</p>
          <h1 style={styles.title}>Shipment Tracking</h1>
          <p style={styles.subtitle}>
            Track and manage produce shipments
          </p>
        </div>

        <button style={styles.addButton}>
          + Create Shipment
        </button>
      </div>

      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Truck size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Total Shipments</span>
            <h2 style={styles.summaryNumber}>37</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Navigation size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>In Transit</span>
            <h2 style={styles.summaryNumber}>12</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <PackageCheck size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Delivered</span>
            <h2 style={styles.summaryNumber}>21</h2>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Clock3 size={22} />
          </div>
          <div>
            <span style={styles.summaryLabel}>Scheduled</span>
            <h2 style={styles.summaryNumber}>4</h2>
          </div>
        </div>
      </div>

      <div style={styles.card}>

        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>Shipment Records</h2>
            <p style={styles.cardSubtitle}>
              Monitor transportation and delivery progress
            </p>
          </div>

          <div style={styles.searchBox}>
            <Search size={19} color="#8b948c" />
            <input
              type="text"
              placeholder="Search shipments..."
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
                <th style={styles.th}>Shipment ID</th>
                <th style={styles.th}>Batch ID</th>
                <th style={styles.th}>Route</th>
                <th style={styles.th}>Vehicle</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Dispatch Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredShipments.map((item) => (
                <tr key={item.id} style={styles.tr}>

                  <td style={styles.td}>
                    <strong>{item.id}</strong>
                  </td>

                  <td style={styles.td}>
                    {item.batchId}
                  </td>

                  <td style={styles.td}>
                    <div style={styles.routeCell}>
                      <div style={styles.routeIcon}>
                        <MapPin size={20} />
                      </div>

                      <div>
                        <strong>
                          {item.origin} → {item.destination}
                        </strong>
                        <span style={styles.smallText}>
                          Supply route
                        </span>
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.vehicleCell}>
                      <Truck size={16} />
                      {item.vehicle}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <span style={getStatusStyle(item.status)}>
                      {item.status}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.dateCell}>
                      <CalendarDays size={15} />
                      {item.dispatchDate}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button style={styles.iconButton} title="View shipment">
                        <Eye size={17} />
                      </button>

                      <button style={styles.iconButton} title="Track shipment">
                        <Navigation size={17} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {filteredShipments.length === 0 && (
            <div style={styles.empty}>
              No shipment records found.
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
    minWidth: '950px'
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

  routeCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },

  routeIcon: {
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
    fontSize: '10px',
    color: '#959d96',
    marginTop: '2px'
  },

  vehicleCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#59615b'
  },

  dateCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },

  delivered: {
    display: 'inline-block',
    background: '#dcf8e4',
    color: '#12964a',
    padding: '6px 10px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '11px'
  },

  inTransit: {
    display: 'inline-block',
    background: '#e0f6fb',
    color: '#0798bc',
    padding: '6px 10px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '11px'
  },

  scheduled: {
    display: 'inline-block',
    background: '#fff3d4',
    color: '#bd8300',
    padding: '6px 10px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '11px'
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

export default Shipments;