import { InputComponent } from "../../../../Components/Input";
import * as S from "./style";
import { useForm } from "../../../../Hooks/useForm";

interface CardProps {
  handleLogin: (values: { email: string; senha: string }) => void;
  loading: boolean;
}

export function Card({ handleLogin, loading }: CardProps) {
  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm(
    {
      email: "",
      senha: ""
    },
    handleLogin
  );

  return (
    <S.Container $isloading={loading?.toString()}>
      <div>
        <h2>Login</h2>

        <S.Form onSubmit={handleSubmit}>
          <InputComponent
            label="Email"
            nameInput="email"
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputComponent
            label="Senha"
            nameInput="senha"
            name="senha"
            type="password"
            placeholder="Senha"
            value={values.senha}
            onChange={handleChange}
            error={errors.senha}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </S.Form>
      </div>
    </S.Container>
  );
}
