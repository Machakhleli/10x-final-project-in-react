import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import ResetPasswordForm from "../components/ResetPasswordForm";
import OtpVerificationForm from "../components/OtpVerificationForm";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("auth") === "true" ||
      sessionStorage.getItem("auth") === "true";

    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Set mode based on URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/signup") setMode("signup");
    else if (path === "/reset-password") setMode("reset");
    else if (path === "/verify-otp") setMode("otp");
    else setMode("login");
  }, [location.pathname]);

  const handleSwitch = (newMode) => {
    setMode(newMode);
    // Update URL to match mode
    if (newMode === "login") navigate("/login", { replace: true });
    else if (newMode === "signup") navigate("/signup", { replace: true });
    else if (newMode === "reset")
      navigate("/reset-password", { replace: true });
    else if (newMode === "otp") navigate("/verify-otp", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Show tabs only for login/signup */}
        {(mode === "login" || mode === "signup") && (
          <div className="mb-6 flex justify-around">
            <button
              onClick={() => handleSwitch("login", false)}
              className={`px-4 py-2 font-semibold transition ${
                mode === "login"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleSwitch("signup", false)}
              className={`px-4 py-2 font-semibold transition ${
                mode === "signup"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Show title for other modes */}
        {mode === "reset" && (
          <h2 className="mb-6 text-xl font-semibold text-center text-gray-800">
            Reset Password
          </h2>
        )}
        {mode === "otp" && (
          <h2 className="mb-6 text-xl font-semibold text-center text-gray-800">
            Verify OTP
          </h2>
        )}

        {/* Render forms */}
        {mode === "login" && <LoginForm onSwitch={handleSwitch} />}
        {mode === "signup" && <SignupForm onSwitch={handleSwitch} />}
        {mode === "reset" && <ResetPasswordForm onSwitch={handleSwitch} />}
        {mode === "otp" && <OtpVerificationForm onSwitch={handleSwitch} />}
      </div>
    </div>
  );
}
