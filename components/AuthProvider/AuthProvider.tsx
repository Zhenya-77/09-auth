"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuth((state) => state.setUser);
  const clearAuth = useAuth((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchSession = async () => {
      const isAuth = await checkSession();
      if (isAuth) {
        const user = await getMe();
        setUser(user);
      } else {
        clearAuth();
      }
    };
    fetchSession();
  }, [clearAuth, setUser]);

  return children;
}

export default AuthProvider;
