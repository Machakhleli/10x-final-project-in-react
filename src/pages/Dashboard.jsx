import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50 gap-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-green-700">
          ✅ Welcome to Dashboard
        </h1>
        <p className="text-green-600">You are successfully logged in!</p>
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
