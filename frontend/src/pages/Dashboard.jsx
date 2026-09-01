import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardService } from '../services/apiService';
import { Users, Package, Truck, Warehouse, Building2, Store, ArrowUpRight, Activity, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [qualityData, setQualityData] = useState([]);
  const [shipmentData, setShipmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboardData(); }, []);
  const fetchDashboardData = async () => {
    try {
      const [statsRes, categoryRes, qualityRes, shipmentRes] = await Promise.all([
        dashboardService.getStats(), dashboardService.getProduceByCategory(), dashboardService.getQualityGrades(), dashboardService.getShipmentStats(),
      ]);
      setStats(statsRes.data); setCategoryData(categoryRes.data); setQualityData(qualityRes.data); setShipmentData(shipmentRes.data);
    } catch (error) { console.error('Error fetching dashboard data:', error); }
    finally { setLoading(false); }
  };
  if (loading) return <div className="container"><div className="dashboard-loading"><span></span><p>Preparing your supply chain overview...</p></div></div>;

  const cards = [
    ['Total Farmers', stats?.total_farmers || 0, Users, 'Registered network'],
    ['Produce Batches', stats?.total_batches || 0, Package, 'Traceable inventory'],
    ['Active Shipments', stats?.active_shipments || 0, Truck, 'Currently in transit'],
    ['Warehouses', stats?.total_warehouses || 0, Warehouse, 'Storage locations'],
    ['Distributors', stats?.total_distributors || 0, Building2, 'Distribution partners'],
    ['Retailers', stats?.total_retailers || 0, Store, 'Retail endpoints'],
  ];
  const chartCard = (title, subtitle, data, dataKey, fill) => <section className="dash-panel"><div className="panel-heading"><div><h3>{title}</h3><p>{subtitle}</p></div><button className="panel-action"><ArrowUpRight size={16}/></button></div><ResponsiveContainer width="100%" height={260}><BarChart data={data} barSize={28}><CartesianGrid stroke="#edf1ef" vertical={false}/><XAxis dataKey={dataKey} axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#73837b'}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#73837b'}}/><Tooltip cursor={{fill:'#f5f8f6'}} contentStyle={{border:'1px solid #e3eae6',borderRadius:'10px',boxShadow:'0 8px 25px rgba(0,0,0,.07)'}}/><Bar dataKey="count" fill={fill} radius={[6,6,2,2]}/></BarChart></ResponsiveContainer></section>;

  return <div className="container dashboard-page">
    <div className="dashboard-hero"><div><div className="eyebrow"><Activity size={14}/> LIVE OPERATIONS</div><h1>Supply Chain Overview</h1><p>Monitor produce movement, quality, storage and distribution from one workspace.</p></div><div className="health-pill"><span></span><div><strong>Network healthy</strong><small>All services operational</small></div><ShieldCheck size={20}/></div></div>
    <div className="dashboard-stats">{cards.map(([label,value,Icon,note],i)=><div className="metric-card" key={label}><div className={`metric-icon metric-${i}`}><Icon size={20}/></div><div className="metric-top"><span>{label}</span><ArrowUpRight size={15}/></div><strong>{value}</strong><small>{note}</small></div>)}</div>
    <div className="dashboard-charts">{chartCard('Produce by Category','Batch distribution across produce categories',categoryData,'category','#16834a')}{chartCard('Quality Grades','Inspection outcomes across graded produce',qualityData,'grade','#2563eb')}{chartCard('Shipment Status','Current logistics pipeline status',shipmentData,'status','#d97706')}</div>
  </div>;
};
export default Dashboard;
