import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/reset-password" element={<AuthPage />} />
        <Route path="/verify-otp" element={<AuthPage />} />

        {/* Dashboard (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Separate Profile route (optional - for standalone profile page) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Profile Settings
                      </h1>
                      <p className="text-sm text-gray-600 mt-1">
                        Manage your account information and preferences
                      </p>
                    </div>
                    <Profile />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Orders page (optional - for standalone orders page) */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Order History
                      </h1>
                      <p className="text-sm text-gray-600 mt-1">
                        Track and manage your orders
                      </p>
                    </div>
                    <div className="p-6">
                      {/* You can create a separate Orders component or reuse Profile with default orders tab */}
                      <Profile />
                    </div>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-lg text-gray-600 mb-8">Page Not Found</p>
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
                >
                  ← Go Back
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
