import { useAuth } from "../../Hooks/auth";
import { Card } from "./Components/Card";
import * as S from "./style";
import { useState } from "react";
import { toast } from "react-toastify";

export function SignIn() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleLogin({ email, senha }: { email: string; senha: string }) {
    setLoading(true);
    try {
      await signIn({ email, senha });
    } catch {
      toast.error("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <S.Container>
      <Card handleLogin={handleLogin} loading={loading} />
    </S.Container>
  );
}