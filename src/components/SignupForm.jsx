import GoogleButton from "./GoogleButton";

export default function SignupForm({ onSwitch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
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
        placeholder="Password"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        required
      />

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
