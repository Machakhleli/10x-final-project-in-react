import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import { useCart } from "../context/CartContext";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { orders } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({
        name: "Local Account User",
        email: "example@email.com",
        picture: null,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const totalOrders = orders.length;
  const totalSpent = orders
    .reduce((sum, order) => sum + order.total, 0)
    .toFixed(2);
  const recentOrders = orders.slice(-3);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center gap-4 mb-8">
        {user && user.picture ? (
          <img
            src={user.picture}
            alt="Profile"
            className="w-16 h-16 rounded-full border-4 border-white shadow-md"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-2xl">
            {user?.name.charAt(0) || "U"}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {user ? user.name.split(" ")[0] : "Guest"}!
          </h1>
          <p className="text-gray-500">Your personal dashboard.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Spent</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${totalSpent}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Items in Cart</h2>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {/* You'll need to use useCart here too if you want this to be live, but for now it's fine */}
            N/A
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">Order ID: {order.id}</h3>
                  <p className="text-sm text-gray-500">
                    {order.date} – ${order.total.toFixed(2)}
                  </p>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no recent orders.</p>
        )}
      </div>

      <Profile onLogout={handleLogout} />
    </div>
  );
}
