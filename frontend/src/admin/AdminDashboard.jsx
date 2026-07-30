import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate('/login');
          }
          setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [user, navigate]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <img 
          src="/ShopNestLogo.png" 
          alt="Logo" 
          className="h-10 w-10 rounded-lg object-cover drop-shadow-[0_0px_10px_rgba(249,115,22,0.3)]" 
        />
        <h2 className="text-white text-2xl font-bold">Admin Dashboard</h2>
      </div>
      <p className="text-zinc-400 mb-8 text-lg">
        Welcome back, <span className="text-white">{user?.name}</span>
      </p>
      
      {/* Stats */}
      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-zinc-900 border border-white/5 rounded-xl shadow-lg text-center flex flex-col gap-2">
            <h4 className="text-zinc-400 text-sm">Total Orders</h4>
            <div className="text-orange-500 text-3xl font-bold">{stats.totalOrders}</div>
          </div>
          <div className="p-6 bg-zinc-900 border border-white/5 rounded-xl shadow-lg text-center flex flex-col gap-2">
            <h4 className="text-zinc-400 text-sm">Total Products</h4>
            <div className="text-orange-500 text-3xl font-bold">{stats.totalProducts}</div>
          </div>
          <div className="p-6 bg-zinc-900 border border-white/5 rounded-xl shadow-lg text-center flex flex-col gap-2">
            <h4 className="text-zinc-400 text-sm">Total Users</h4>
            <div className="text-orange-500 text-3xl font-bold">{stats.totalUsers}</div>
          </div>
          <div className="p-6 bg-zinc-900 border border-white/5 rounded-xl shadow-lg text-center flex flex-col gap-2">
            <h4 className="text-zinc-400 text-sm">Total Revenue</h4>
            <div className="text-orange-500 text-3xl font-bold">₹{stats.totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div className="text-center my-12 text-orange-500 text-lg font-semibold">Loading metrics...</div>
      )}

      {/* Admin Controls */}
      <div className="mt-10 p-8 bg-zinc-900 rounded-xl border border-white/5">
        <h3 className="text-orange-500 text-xl font-bold mb-6">Administrative Controls</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition-all"
            onClick={() => navigate('/admin/add-product')}
          >
            + Add Product
          </button>
          <button 
            className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-5 py-3 rounded-lg transition-all"
            onClick={() => navigate('/admin/products')}
          >
            📦 Manage Products
          </button>
          <button 
            className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-5 py-3 rounded-lg transition-all"
            onClick={() => navigate('/admin/orders')}
          >
            🚚 Manage Orders
          </button>
          <button 
            className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-5 py-3 rounded-lg transition-all"
            onClick={() => navigate('/admin/users')}
          >
            👥 Users Directory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
