import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { mockUsers } from "../utils/mockUsers.js";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (username, password) => {
    setIsLoading(true);
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Usuario y contrasena son obligatorios");
      setIsLoading(false);
      return { success: false };
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const user = mockUsers.find(
        (candidate) => candidate.username === username && candidate.password === password
      );

      if (user) {
        setUser(user);
        setIsLoading(false);
        return { success: true };
      }

      setError("Credenciales incorrectas");
      setIsLoading(false);
      return { success: false };
    } catch (err) {
      console.log("Error de login:", err.message);
      setError("Error en el servidor. Intentalo de nuevo.");
      setIsLoading(false);
      return { success: false };
    }
  };

  const logout = () => {
    setTimeout(() => {
      setUser(null);
      navigate("/");
    }, 400);
  };

  return {
    login,
    logout,
    isLoading,
    error,
    clearError: () => setError(""),
  };
}
