import type { IconType } from "react-icons";
import { Container, Input, Span } from "./style";
import type { InputHTMLAttributes } from "react";

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  nameInput: string;
  label?: string;
  icon?: IconType;
  error?: {
    error: boolean;
    name: string;
  } | null;
}

export function InputComponent({
  nameInput,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  icon,
  error,
  ...rest
}: InputComponentProps) {

  const IconComponent = icon;

  const hasError = error?.error === true;

  return (
    <Container $error={hasError.toString()}>
      {IconComponent && <IconComponent color="gray" size={24} />}

      <label htmlFor={nameInput}>{label}</label>

      <div>
        <Input
          id={nameInput}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          $error={hasError.toString()}
          {...rest}
        />
      </div>

      {hasError && (
        <Span>Preencha o campo {error?.name} para continuar</Span>
      )}
    </Container>
  );
}

