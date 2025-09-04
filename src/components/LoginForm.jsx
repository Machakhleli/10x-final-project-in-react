import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import GoogleButton from "./GoogleButton";

export default function LoginForm({ onSwitch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("auth", "true");
    } else {
      sessionStorage.setItem("auth", "true");
    }

    // clear any Google user info
    localStorage.removeItem("user");

    const from = location.state?.from?.pathname || "/dashboard";
    navigate(from, { replace: true });
  };

  const handleForgotPassword = () => {
    if (onSwitch) {
      onSwitch("reset");
    } else {
      navigate("/reset-password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        required
      />

      <div className="flex justify-between items-center text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded"
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600 transition"
      >
        Login
      </button>

      {/* Google Login */}
      <GoogleButton />
    </form>
  );
}
