"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser,
} from "@/lib/auth-service";
import { useToast } from "@/components/ui/use-toast";

type UserData = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: Date;
};

interface AuthContextType {
  user: UserData | null;
  userData: UserData | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setUserData(currentUser);
    }
    setLoading(false);
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Simulate Google sign in with mock data
      const mockUser = {
        uid: `user-${Date.now()}`,
        email: "test@example.com",
        displayName: "Test User",
        photoURL: null,
        createdAt: new Date(),
      };

      setCurrentUser(mockUser);
      setUser(mockUser);
      setUserData(mockUser);

      toast({
        title: "登入成功",
        description: "歡迎回來",
      });
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast({
        variant: "destructive",
        title: "登入失敗",
        description: error.message,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      removeCurrentUser();
      setUser(null);
      setUserData(null);
      toast({
        title: "登出成功",
      });
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "登出失敗",
        description: error.message,
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userData, loading, signInWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
