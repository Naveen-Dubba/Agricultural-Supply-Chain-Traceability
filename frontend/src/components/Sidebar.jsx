import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Sprout,
  ClipboardCheck,
  Truck,
  Warehouse,
  Network,
  QrCode,
  FileText,
  Settings
} from 'lucide-react';

import styles from './Sidebar.module.css';

const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Farmers',
    path: '/farmers',
    icon: Users
  },
  {
    name: 'Produce',
    path: '/produce',
    icon: Sprout
  },
  {
    name: 'Inspections',
    path: '/inspections',
    icon: ClipboardCheck
  },
  {
    name: 'Shipments',
    path: '/shipments',
    icon: Truck
  },
  {
    name: 'Warehouses',
    path: '/warehouses',
    icon: Warehouse
  },
  {
    name: 'Supply Chain',
    path: '/supply-chain',
    icon: Network
  },
  {
    name: 'Traceability',
    path: '/traceability',
    icon: QrCode
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: FileText
  }
];

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>

      {/* Logo */}
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>🌾</div>
        <span>AgriTrace</span>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${styles.menuItem} ${
                  isActive ? styles.active : ''
                }`
              }
            >
              <Icon size={23} strokeWidth={1.7} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Settings */}
      <div className={styles.bottomSection}>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${styles.menuItem} ${
              isActive ? styles.active : ''
            }`
          }
        >
          <Settings size={23} strokeWidth={1.7} />
          <span>Settings</span>
        </NavLink>
      </div>

    </aside>
  );
};

export default Sidebar;