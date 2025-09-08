export default function OtpVerificationForm({ onSwitch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: verify OTP API
    alert("OTP Verified Successfully! Welcome! (demo)");

    // After OTP verification, log the user in
    sessionStorage.setItem("auth", "true");

    if (onSwitch) {
      onSwitch("login");
    }
  };

  const handleBackToSignup = () => {
    if (onSwitch) {
      onSwitch("signup");
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 text-center mb-4">
        We've sent a verification code to your email address. Please enter it
        below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          maxLength="6"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-lg font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600 transition"
        >
          Verify OTP
        </button>
        <button
          type="button"
          onClick={handleBackToSignup}
          className="w-full rounded-lg bg-gray-200 py-2 font-semibold text-gray-700 hover:bg-gray-300 transition"
        >
          Back to Sign Up
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">
        Didn't receive the code?{" "}
        <button className="text-orange-500 hover:underline font-medium">
          Resend OTP
        </button>
      </div>
    </div>
  );
}
