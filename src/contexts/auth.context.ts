"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoged: boolean;
  setLoged: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("isLoged");
    if (storedUser === "true") setIsLoged(true);
  }, []);

  const setLoged = (status: boolean) => {
    setIsLoged(status);
    localStorage.setItem("isLoged", status.toString());
  };

  return (
    <AuthContext.Provider value={{ isLoged, setLoged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
