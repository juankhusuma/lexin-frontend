import { getCookie } from "cookies-next";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getCookie('access_token')?.valueOf() ?? null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
