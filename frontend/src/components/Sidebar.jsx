import React from 'react';
import styles from './Sidebar.module.css';
import { X, LogOut, LayoutDashboard, Users, Sprout, BadgeCheck, Warehouse, Truck, Network, BarChart3, Leaf } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['Admin', 'Farmer', 'CollectionCenterManager', 'QualityInspector', 'WarehouseManager', 'LogisticsProvider', 'Distributor', 'Retailer'] },
    { label: 'Farmers', icon: Users, path: '/farmers', roles: ['Admin'] },
    { label: 'Produce', icon: Sprout, path: '/produce', roles: ['Admin', 'Farmer'] },
    { label: 'Quality Inspection', icon: BadgeCheck, path: '/inspections', roles: ['Admin', 'QualityInspector'] },
    { label: 'Warehouses', icon: Warehouse, path: '/warehouses', roles: ['Admin', 'WarehouseManager'] },
    { label: 'Shipments', icon: Truck, path: '/shipments', roles: ['Admin', 'LogisticsProvider'] },
    { label: 'Supply Chain', icon: Network, path: '/supply-chain', roles: ['Admin', 'Distributor', 'Retailer'] },
    { label: 'Reports', icon: BarChart3, path: '/reports', roles: ['Admin'] },
  ];

  const visibleMenuItems = menuItems.filter((item) => item.roles.includes(user?.role));
  const initials = (user?.fullName || 'AT').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.brandMark}><Leaf size={22} /></div>
          <div className={styles.brandText}>
            <h1>AgriTrace</h1>
            <span>Supply Intelligence</span>
          </div>
          <button className={styles.closeBtn} onClick={toggleSidebar} aria-label="Close navigation"><X size={22} /></button>
        </div>

        <div className={styles.sectionLabel}>WORKSPACE</div>
        <nav className={styles.nav}>
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => isOpen && toggleSidebar()}
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.iconWrap}><Icon size={19} strokeWidth={1.9} /></span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className={styles.systemCard}>
          <div className={styles.systemDot}></div>
          <div><strong>System operational</strong><span>All services connected</span></div>
        </div>

        <div className={styles.userSection}>
          <div className={styles.avatar}>{initials}</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user?.fullName || 'AgriTrace User'}</p>
            <p className={styles.userRole}>{user?.role || 'User'}</p>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout} title="Logout"><LogOut size={18} /></button>
        </div>
      </aside>
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar} />}
    </>
  );
};

export default Sidebar;
