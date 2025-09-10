import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Header() {
  const { cart, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center relative">
      <Link to="/" className="text-xl font-bold text-blue-600">
        🛍️ Usho's Store
      </Link>

      <nav className="flex items-center gap-6">
        <Link to="/shop" className="hover:text-blue-500">
          Shop
        </Link>

        {/* User profile icon and link */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:text-blue-500"
        >
          {user && user.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-gray-500 hover:text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </Link>

        {/* Cart with Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Link to="/cart" className="relative hover:text-blue-500">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {open && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4">
              {cart.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">
                  Your cart is empty.
                </p>
              ) : (
                <div>
                  {cart.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between pb-2 mb-2 border-b last:border-b-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} × {item.qty}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-xs hover:underline ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {cart.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{cart.length - 3} more item(s)…
                    </p>
                  )}

                  <div className="flex justify-between font-semibold text-gray-800 pt-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Link
                      to="/cart"
                      className="flex-1 text-center px-3 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition"
                    >
                      View Cart
                    </Link>
                    <Link
                      to="/checkout"
                      className="flex-1 text-center px-3 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
