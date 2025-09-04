import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50 gap-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-green-700">
          ✅ Welcome to Dashboard
        </h1>
        <p className="text-green-600">You are successfully logged in!</p>

        {user && (
          <div className="mt-4">
            <img
              src={user.picture}
              alt={user.name}
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleGoBack}
          className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 transition"
        >
          ← Go Back
        </button>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 max-w-md text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Browser Navigation Test
        </h2>
        <p className="text-sm text-gray-600">
          Try using your browser's back/forward buttons or the "Go Back" button
          above. The app should maintain your navigation history properly.
        </p>
      </div>
    </div>
  );
}
