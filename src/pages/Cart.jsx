import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Back to Shop
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  {item.category} – ${item.price} × {item.qty}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-lg text-gray-700">
            Total: ${total}
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={clearCart}
              className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
            >
              Clear Cart
            </button>
            <button className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition">
              ✅ Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
