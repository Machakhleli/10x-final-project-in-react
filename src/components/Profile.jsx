import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Profile({ onLogout }) {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { orders } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Ensure all fields exist with defaults if not present
      const completeUserData = {
        name: userData.name || "User",
        email: userData.email || "No email provided",
        phone: userData.phone || "No phone number",
        address: userData.address || "No address provided",
        picture: userData.picture || null,
      };
      setUser(completeUserData);
      setEditForm(completeUserData);
    } else {
      // Fallback if no user data exists
      const defaultUser = {
        name: "Guest User",
        email: "No email provided",
        phone: "No phone number",
        address: "No address provided",
        picture: null,
      };
      setUser(defaultUser);
      setEditForm(defaultUser);
    }
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      const updatedUser = { ...user, ...editForm };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100 border-green-200";
      case "Shipped":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "Processing":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4">User Profile</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveSection("profile")}
          className={`py-2 px-4 font-semibold ${
            activeSection === "profile"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveSection("orders")}
          className={`py-2 px-4 font-semibold ${
            activeSection === "orders"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Order History
        </button>
      </div>

      {activeSection === "profile" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Personal Information
            </h3>
            <button
              onClick={handleEditToggle}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                isEditing
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          {user && (
            <div className="space-y-4">
              {isEditing ? (
                // Edit mode
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      rows="2"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                // View mode
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Name:</span> {user.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {user.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {user.address}
                  </p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={onLogout}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      )}

      {activeSection === "orders" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Your Orders ({orders.length})
          </h3>
          {orders.length === 0 ? (
            <p className="text-gray-500">You have not placed any orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Order #{order.id}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Placed on: {order.date}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <p className="text-sm text-gray-700 font-semibold">
                        Total: ${order.total.toFixed(2)}
                      </p>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border mt-1 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <h5 className="text-sm font-semibold">Items:</h5>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} (x{item.qty})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
