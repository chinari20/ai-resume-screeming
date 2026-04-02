import { createContext, useContext, useEffect, useState } from "react";
import { authApi, setAuthToken } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("hireai_auth");
    if (!stored) {
      setLoading(false);
      return;
    }

    const parsed = JSON.parse(stored);
    setAuthToken(parsed.token);
    authApi
      .me()
      .then(({ data }) => setUser({ ...data, token: parsed.token }))
      .catch(() => {
        localStorage.removeItem("hireai_auth");
        setAuthToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const persistAuth = (data) => {
    localStorage.setItem("hireai_auth", JSON.stringify(data));
    setAuthToken(data.token);
    setUser(data);
  };

  const login = async (payload) => {
    const { data } = await authApi.login(payload);
    persistAuth(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await authApi.register(payload);
    persistAuth(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("hireai_auth");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
