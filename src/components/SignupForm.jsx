import { useState } from "react";
import GoogleButton from "./GoogleButton";

export default function SignupForm({ onSwitch }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    // fake signup → redirect to OTP verification
    if (onSwitch) {
      onSwitch("otp");
    }
  };

  const handleLoginClick = () => {
    if (onSwitch) {
      onSwitch("login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        required
      />
      <input
        type="password"
        placeholder="Password (min 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        required
      />

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full rounded-lg bg-green-500 py-2 font-semibold text-white hover:bg-green-600 transition cursor-pointer"
      >
        Sign Up
      </button>

      {/* Google Sign Up */}
      <GoogleButton />

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={handleLoginClick}
          className="text-blue-500 hover:underline font-medium cursor-pointer"
        >
          Login
        </button>
      </p>
    </form>
  );
}
