import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you strictly sure you want to delete this?')) {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-orange-500 text-2xl font-semibold">Manage Products</h2>
        <Link 
          to="/admin/add-product" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left text-zinc-400 text-sm">ID</th>
              <th className="p-4 text-left text-zinc-400 text-sm">NAME</th>
              <th className="p-4 text-left text-zinc-400 text-sm">PRICE</th>
              <th className="p-4 text-left text-zinc-400 text-sm">CATEGORY</th>
              <th className="p-4 text-left text-zinc-400 text-sm">STOCK</th>
              <th className="p-4 text-left text-zinc-400 text-sm">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b border-white/10">
                <td className="p-4">{product._id.substring(0, 8)}...</td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">₹{product.price.toFixed(2)}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <Link 
                    to={`/admin/edit-product/${product._id}`} 
                    className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700 transition"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product._id)} 
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
