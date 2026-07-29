import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-zinc-400">
          Your cart is empty.{" "}
          <Link to="/shop" className="text-orange-500 hover:underline">
            Go Shopping
          </Link>
        </p>
      ) : (
        <div className="flex flex-col md:flex-row gap-10 mt-6">
          {/* Cart Items */}
          <div className="flex-2 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center bg-zinc-900 p-5 rounded-xl shadow-lg border border-white/5 transition-transform hover:translate-x-1 hover:border-orange-500/30"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg mr-8"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-3">{item.name}</h4>
                  <p className="text-orange-500 font-bold mb-3">₹{item.price}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      onClick={() => handleUpdateQty(item, item.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-zinc-800 text-white border border-zinc-700 hover:bg-orange-500 hover:border-orange-500 transition"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-white">{item.qty}</span>
                    <button
                      onClick={() => handleUpdateQty(item, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-zinc-800 text-white border border-zinc-700 hover:bg-orange-500 hover:border-orange-500 transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="px-4 py-2 rounded-md font-semibold bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="flex-1 bg-zinc-900 p-8 rounded-xl shadow-lg border border-white/5 h-fit sticky top-24">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
              Total: ₹{totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 text-lg font-medium tracking-wide rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
