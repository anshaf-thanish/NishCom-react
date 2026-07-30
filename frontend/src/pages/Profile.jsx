import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
             logout();
             navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-100">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-white/10 pb-8 mb-8">
        <div>
          <h2 className="text-white text-3xl font-bold mb-2">My Profile</h2>
          <p className="text-zinc-400 text-lg mb-1"><strong>Name:</strong> {user.name}</p>
          <p className="text-zinc-400 text-lg mb-4"><strong>Email:</strong> {user.email}</p>
          <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-md text-sm font-bold inline-block">
            Account Type: {user.role.toUpperCase()}
          </span>
        </div>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition-all"
        >
          Logout
        </button>
      </div>

      {/* Orders */}
      <h3 className="text-orange-500 text-xl font-semibold mb-5">Order History</h3>
      {loading ? (
        <p className="text-zinc-400">Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div className="bg-zinc-950 p-8 rounded-lg text-center border border-zinc-700">
          <p className="text-zinc-400 mb-4">You haven't placed any orders yet.</p>
          <Link 
            to="/shop" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-5">
          {orders.map(order => (
            <div 
              key={order._id} 
              className="bg-zinc-950 p-6 rounded-xl border border-zinc-700 flex flex-wrap justify-between items-center gap-5"
            >
              <div>
                <p className="text-zinc-400 text-sm mb-1">
                  Order ID: <span className="text-white">{order._id}</span>
                </p>
                <p className="text-zinc-400 text-sm mb-1">
                  Placed On: <span className="text-white">{new Date(order.createdAt).toLocaleDateString()}</span>
                </p>
                <p className="text-zinc-400 text-sm">
                  Total: <strong className="text-green-500">₹{order.totalAmount.toFixed(2)}</strong>
                </p>
              </div>
              <div>
                <span
                  className={`px-4 py-2 rounded-full font-bold ${
                    order.status === 'Delivered'
                      ? 'bg-green-500/10 text-green-500'
                      : order.status === 'Shipped'
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
