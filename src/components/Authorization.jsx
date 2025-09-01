import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("authUser");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  async function login({ email, password, remember }) {
    // Fake credentials
    const demoUser = { email: "demo@example.com", password: "password123" };

    if (email === demoUser.email && password === demoUser.password) {
      const loggedInUser = { email };
      setUser(loggedInUser);
      if (remember) {
        localStorage.setItem("authUser", JSON.stringify(loggedInUser));
      }
    } else {
      throw new Error("Invalid credentials");
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("authUser");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
