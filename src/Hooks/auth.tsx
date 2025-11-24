import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "../Services/api";
import { toast } from "react-toastify";

interface User {
  id: number;
  nome: string;
  email: string;
  role_id: number;
}

interface AuthContextType {
  user: User | null;
  signed: boolean;
  signIn: (data: { email: string; senha: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/me/"); 
        setUser(response.data.data.user);
      } catch {
        setUser(null);
      }
    }

    loadUser();
  }, []);

  async function signIn({ email, senha }: { email: string; senha: string }) {
    try {
      const response = await api.post("/login/", { email, senha });
      setUser(response.data.data.user);
    } catch {
      toast.error("Usuário ou senha inválidos");
    }
  }

  async function signOut() {
    try {
      await api.post("/logout/");
      setUser(null);
    } catch {
      toast.error("Erro ao sair");
    }
  }

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
