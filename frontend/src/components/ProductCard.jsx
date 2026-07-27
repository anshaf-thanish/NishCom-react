import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#18181b] rounded-xl overflow-hidden shadow-lg border border-white/5 flex flex-col relative transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-60 object-cover transition-transform duration-500 ease-in-out hover:scale-105"
      />
      <div className="p-5 text-left flex flex-col justify-between flex-grow bg-gradient-to-t from-[#18181b] to-transparent relative z-10">
        <h3 className="text-white text-base mb-2 truncate">{product.name}</h3>
        <p className="text-orange-500 text-xl font-bold mb-4">₹{product.price}</p>
        <Link
          to={`/product/${product._id}`}
          className="btn bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
