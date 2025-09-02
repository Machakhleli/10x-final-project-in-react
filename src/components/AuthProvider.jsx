import React, { createContext, useContext, useState } from "react";

/**
 * AuthProvider
 * - saves registered users in localStorage key: "users" (array)
 * - saves currently logged-in user under:
 *     - localStorage "user" if remember = true
 *     - sessionStorage "user" if remember = false
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const local = localStorage.getItem("user");
      const session = sessionStorage.getItem("user");
      return JSON.parse(local || session || "null");
    } catch {
      return null;
    }
  });

  const _getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  };

  function login(email, password, remember = false) {
    const users = _getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return false;

    setUser(found);
    if (remember) {
      localStorage.setItem("user", JSON.stringify(found));
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("user", JSON.stringify(found));
      localStorage.removeItem("user");
    }
    return true;
  }

  function signup(email, password, remember = false) {
    const users = _getUsers();
    if (users.some((u) => u.email === email)) return false;

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setUser(newUser);
    if (remember) {
      localStorage.setItem("user", JSON.stringify(newUser));
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("user", JSON.stringify(newUser));
      localStorage.removeItem("user");
    }
    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
