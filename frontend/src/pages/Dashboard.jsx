import React from 'react';
import {
  Users,
  Sprout,
  Package,
  MapPin,
  Warehouse,
  Truck,
  Search,
  RefreshCcw
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import './Dashboard.css';

const COLORS = ['#43b654', '#ffb52e', '#9ca3af', '#ef4444'];

const activityData = [
  { name: 'Completed', value: 38 },
  { name: 'Overdue', value: 28 },
  { name: 'Planned', value: 22 },
  { name: 'Cancelled', value: 12 }
];

const deviationData = [
  { name: 'On Schedule', value: 78 },
  { name: 'Deviation', value: 22 }
];

const cropData = [
  { name: 'Rice', value: 28 },
  { name: 'Tomato', value: 22 },
  { name: 'Mango', value: 10 },
  { name: 'Chilli', value: 45 },
  { name: 'Others', value: 25 }
];

const Dashboard = () => {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Welcome back!</h1>
          <p>AgriTrace Supply Chain Monitoring Dashboard</p>
        </div>

        <div className="year-box">
          <label>Select Year</label>
          <select>
            <option>2026-27</option>
            <option>2025-26</option>
            <option>2024-25</option>
          </select>
        </div>
      </div>

      <div className="summary-row">

        <div className="summary-item">
          <Users size={20} />
          <span>Farmers</span>
          <strong>248</strong>
        </div>

        <div className="summary-item">
          <Sprout size={20} />
          <span>Crops</span>
          <strong>34</strong>
        </div>

        <div className="summary-item">
          <Package size={20} />
          <span>Produce</span>
          <strong>524</strong>
        </div>

        <div className="summary-item">
          <MapPin size={20} />
          <span>Mapped Area</span>
          <strong>88.37 Ha</strong>
        </div>

        <div className="summary-item">
          <Warehouse size={20} />
          <span>Warehouses</span>
          <strong>18</strong>
        </div>

        <div className="summary-item">
          <Truck size={20} />
          <span>Shipments</span>
          <strong>37</strong>
        </div>

      </div>

      <div className="chart-row">

        <div className="dashboard-card">
          <h3>Activity Progress</h3>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={activityData}
                dataKey="value"
                innerRadius={42}
                outerRadius={65}
              >
                {activityData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h3>Supply Chain Status</h3>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={deviationData}
                dataKey="value"
                innerRadius={42}
                outerRadius={65}
              >
                <Cell fill="#43b654" />
                <Cell fill="#ffb52e" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h3>Total Crops (%)</h3>

          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={cropData}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" fill="#43b654" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="monitor-card">

        <div className="monitor-header">
          <div>
            <h2>Supply Chain Monitoring</h2>
            <p>Live produce movement and farm activity</p>
          </div>

          <div className="monitor-actions">
            <button>
              <Search size={18} />
            </button>

            <button>
              <RefreshCcw size={18} />
            </button>
          </div>
        </div>

        <div className="map-placeholder">

          <div className="map-content">
            <h2>AgriTrace Network Map</h2>
            <p>
              Farm, warehouse and shipment locations will appear here.
            </p>

            <div className="map-points">
              <span>📍 Farm 01</span>
              <span>📍 Warehouse</span>
              <span>📍 Distributor</span>
              <span>📍 Retailer</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;