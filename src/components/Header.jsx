import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Header() {
  const { cart, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center relative">
      <Link to="/" className="text-xl font-bold text-blue-600">
        🛍️ MyShop
      </Link>

      <nav className="flex items-center gap-6">
        <Link to="/shop" className="hover:text-blue-500">
          Shop
        </Link>
        <Link to="/dashboard" className="hover:text-blue-500">
          Dashboard
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
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {open && (
            <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
              <div className="p-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Cart Preview
                </h3>

                {cart.length === 0 ? (
                  <p className="text-gray-500 text-sm">Your cart is empty.</p>
                ) : (
                  <div className="space-y-3">
                    {cart.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            ${item.price} × {item.qty}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-xs hover:underline"
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
                      <span>${subtotal}</span>
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
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
