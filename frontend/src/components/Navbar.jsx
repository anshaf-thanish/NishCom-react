import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-[rgba(9,9,11,0.8)] backdrop-blur-md border-b border-white/5 sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)] ml-4">
      {/* Inner container with horizontal padding */}
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12 py-4 ml-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2 text-white text-2xl font-bold tracking-tight drop-shadow-[0_2px_10px_rgba(249,115,22,0.3)] ">
          <Link to="/" className="flex items-center gap-2 ">
            <img
              src="/ShopNestLogo.png"
              alt="NishCom"
              className="h-9 w-9 rounded-md object-cover drop-shadow-[0_2px_8px_rgba(249,115,22,0.35)] "
            />
            NishCom<span className="text-orange-500 text-3xl">.</span>
          </Link>
        </div>

        {/* Links */}
        <ul className="flex items-center gap-8">
          <li>
            <Link
              to="/shop"
              className="text-sm font-medium text-zinc-400 relative hover:text-white after:content-[''] after:absolute after:w-0 after:h-[2px] after:-bottom-1.5 after:left-0 after:bg-orange-500 after:rounded-sm after:transition-all after:duration-300 hover:after:w-full"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-sm font-medium text-zinc-400 relative hover:text-white after:content-[''] after:absolute after:w-0 after:h-[2px] after:-bottom-1.5 after:left-0 after:bg-orange-500 after:rounded-sm after:transition-all after:duration-300 hover:after:w-full"
            >
              Cart ({cartItems.length})
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="text-sm font-medium text-zinc-400 hover:text-white"
                >
                  Hi, {user.name}
                </Link>
              </li>
              {user.role === 'admin' && (
                <li>
                  <Link
                    to="/admin"
                    className="text-sm font-medium text-zinc-400 hover:text-white"
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-transparent text-red-500 border border-red-500/30 px-4 py-2 rounded-md font-semibold transition-all duration-300 hover:bg-red-500/10 hover:border-red-500 hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="text-sm font-medium text-zinc-400 hover:text-white"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
