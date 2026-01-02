import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import type { AuthContextType, ChildrenProps } from "../components/model/handler";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children } : ChildrenProps) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
