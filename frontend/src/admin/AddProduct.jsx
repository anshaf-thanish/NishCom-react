import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');
    
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data
      });
      const responseData = await res.json();
      
      if (res.ok) {
        alert('Product created successfully with Cloudinary Image URL!');
        navigate('/shop');
      } else {
        alert(responseData.message || 'Error creating product');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-zinc-900 p-10 rounded-xl border border-white/5">
      <h2 className="text-orange-500 text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input 
          type="text" 
          placeholder="Product Name" 
          required 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          className="p-3 bg-zinc-950 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all"
        />

        <textarea 
          placeholder="Description" 
          required 
          rows="4"
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
          className="p-3 bg-zinc-950 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all"
        />

        <input 
          type="number" 
          placeholder="Price" 
          required 
          onChange={(e) => setFormData({...formData, price: e.target.value})} 
          className="p-3 bg-zinc-950 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all"
        />

        <input 
          type="text" 
          placeholder="Category" 
          required 
          onChange={(e) => setFormData({...formData, category: e.target.value})} 
          className="p-3 bg-zinc-950 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all"
        />

        <input 
          type="number" 
          placeholder="Stock Quantity" 
          required 
          onChange={(e) => setFormData({...formData, stock: e.target.value})} 
          className="p-3 bg-zinc-950 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all"
        />
        
        {/* Image Upload */}
        <div className="p-4 border-2 border-dashed border-orange-500 rounded-lg">
          <label className="block mb-2 text-zinc-400">Upload Product Image (Cloudinary)</label>
          <input 
            type="file" 
            accept="image/*" 
            required 
            onChange={(e) => setImage(e.target.files[0])} 
            className="text-white"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all mt-2"
        >
          {loading ? 'Uploading & Creating...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
