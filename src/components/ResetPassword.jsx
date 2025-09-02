import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

        {!submitted ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Send Reset Link
            </button>

            <p className="text-sm text-center mt-3">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </p>
          </>
        ) : (
          <p className="text-green-600 text-center">
            ✅ Password reset link has been sent to <b>{email}</b>
          </p>
        )}
      </form>
    </div>
  );
}
