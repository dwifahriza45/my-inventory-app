import type { ReactNode } from "react";

export type Login = {
    email: string,
    password: string
}

export type Register = {
    username: string,
    email: string,
    password: string
}

export type AuthUser = {
  id: number;
  username: string;
  email: string;
};

export type AuthContextType = {
  check: boolean;
  valid: boolean;
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  saveToken: (token: string | null) => void; // ⬅️ PENTING
  logout: () => void;
};

export type ChildrenProps = {
  children: ReactNode;
};
