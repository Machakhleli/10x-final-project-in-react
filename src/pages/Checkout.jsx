import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { cart, placeOrder } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "card",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      alert("Please fill in all fields.");
      return;
    }
    const order = placeOrder(form);
    alert(`✅ Order placed successfully!\nOrder ID: ${order.id}`);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow space-y-6">
        <h1 className="text-2xl font-bold mb-4">🛒 Checkout</h1>

        {/* Order Summary */}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>${item.price * item.qty}</span>
                </li>
              ))}
              <li className="flex justify-between font-bold border-t pt-2">
                <span>Total</span>
                <span>${total}</span>
              </li>
            </ul>
          )}
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Method
            </label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={cart.length === 0}
            className="w-full py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            ✅ Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
