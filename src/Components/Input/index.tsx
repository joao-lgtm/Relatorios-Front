import { Container, Input } from "./style";

type inputComponet = {
    id?: string;
    type?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputComponent({ type, value, onChange }: any) {
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />;
}
