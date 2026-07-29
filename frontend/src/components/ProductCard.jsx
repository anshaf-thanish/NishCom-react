import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-white/5 flex flex-col transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-orange-500/30">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-60 object-cover transition-transform duration-500 ease-in-out hover:scale-105"
      />
      <div className="p-5 flex flex-col justify-between flex-grow bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent">
        <h3 className="text-white text-lg font-semibold truncate mb-2">{product.name}</h3>
        <p className="text-orange-500 text-xl font-bold mb-4">₹{product.price}</p>
        <Link
          to={`/product/${product._id}`}
          className="bg-orange-500 text-white px-4 py-2 rounded-md text-center font-medium hover:bg-orange-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
