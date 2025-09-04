export default function ResetPasswordForm({ onSwitch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: password reset API
    alert("Reset link sent to your email! (demo)");
    if (onSwitch) {
      onSwitch("login");
    }
  };

  const handleBackToLogin = () => {
    if (onSwitch) {
      onSwitch("login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Enter your email address"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        required
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-purple-500 py-2 font-semibold text-white hover:bg-purple-600 transition"
      >
        Send Reset Link
      </button>
      <button
        type="button"
        onClick={handleBackToLogin}
        className="w-full rounded-lg bg-gray-200 py-2 font-semibold text-gray-700 hover:bg-gray-300 transition"
      >
        Back to Login
      </button>
    </form>
  );
}
