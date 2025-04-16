import api from "@/lib/axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/utils/types";
import constant from "@/utils/constants";

interface AuthContextProps {
  user?: User | null;
  loading: boolean;
  login: (accessToken: string, user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Fetch the user details if a refresh token is present
  const {
    isLoading,
    data: userData,
    isError,
  } = useQuery<User>({
    queryKey: ["auth", "profile"],
    queryFn: async () => {
      const res = await api.get("/api/v1/auth/profile");
      return res.data;
    },
    retry: false,
  });

  const login = (accessToken: string, user: User) => {
    Cookies.set(constant.ACCESS_TOKEN_KEY, accessToken, {
      expires: constant.ACCESS_TOKEN_EXPIRE,
    });
    setUser(user);
    queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
    queryClient.setQueriesData({ queryKey: ["auth", "profile"] }, user);
  };

  const logout = async () => {
    setUser(null);
    Cookies.remove(constant.ACCESS_TOKEN_KEY);
    queryClient.removeQueries({ queryKey: ["auth", "profile"] });
    queryClient.invalidateQueries();
  };

  useEffect(() => {
    if (!isLoading && !!userData) {
      setUser(userData);
    }
    if (isError) {
      setUser(null);
    }
  }, [userData, isLoading, isError]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
}
