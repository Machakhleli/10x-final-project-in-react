import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({
        name: "Local Account User",
        email: "example@email.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, City, State 12345",
        picture: null,
      });
    }

    // Enhanced order data
    setOrders([
      {
        id: 1,
        item: "Office Chair",
        date: "2025-08-01",
        status: "Delivered",
        price: "$299.99",
        trackingNumber: "TRK123456789",
        estimatedDelivery: "2025-08-01",
        image: "🪑",
      },
      {
        id: 2,
        item: "Laptop Desk",
        date: "2025-08-10",
        status: "Processing",
        price: "$159.99",
        trackingNumber: "TRK987654321",
        estimatedDelivery: "2025-09-15",
        image: "🖥️",
      },
      {
        id: 3,
        item: "Bookshelf",
        date: "2025-09-01",
        status: "Shipped",
        price: "$89.99",
        trackingNumber: "TRK456789123",
        estimatedDelivery: "2025-09-08",
        image: "📚",
      },
    ]);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);

    // Show success notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300";
    notification.textContent = "✅ Profile updated successfully!";
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => notification.remove(), 300);
    }, 2700);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveSection("profile")}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeSection === "profile"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            👤 Profile Settings
          </button>
          <button
            onClick={() => setActiveSection("orders")}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeSection === "orders"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            📦 Order History
          </button>
        </nav>
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6 lg:mb-0">
            {user?.picture ? (
              <img
                src={user.picture}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-sm">
                {user?.name?.charAt(0) || "?"}
              </div>
            )}
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Change Photo
            </button>
          </div>

          {/* Profile Form */}
          <div className="flex-1">
            {!isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md border">
                      {user?.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md border">
                      {user?.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md border">
                      {user?.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md border">
                      {user?.address || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    ✏️ Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user?.name || ""}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={user?.phone || ""}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={user?.address || ""}
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders Section */}
      {activeSection === "orders" && (
        <div className="space-y-6">
          {/* Order Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {orders.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Total Orders
              </div>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {orders.filter((order) => order.status === "Delivered").length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Delivered</div>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {orders.filter((order) => order.status === "Shipped").length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Shipped</div>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border">
              <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                {orders.filter((order) => order.status === "Processing").length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Processing</div>
            </div>
          </div>

          {/* Orders List */}
          <div className="border border-gray-200 rounded-lg">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h4 className="text-lg font-medium text-gray-900">Your Orders</h4>
              <p className="text-sm text-gray-600 mt-1">
                Track and manage your order history
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{order.image}</div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-base font-medium text-gray-900 truncate">
                          {order.item}
                        </h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            Order #{order.id} • {order.date}
                          </p>
                          <p className="break-all">
                            Tracking:{" "}
                            <span className="font-mono text-blue-600 text-xs">
                              {order.trackingNumber}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                        <div className="text-lg font-semibold text-gray-900">
                          {order.price}
                        </div>
                        <span
                          className={`inline-flex px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="flex space-x-3 text-sm">
                        <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                          View Details
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 font-medium transition-colors">
                          Track Package
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600">
                      Expected delivery: {order.estimatedDelivery}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
