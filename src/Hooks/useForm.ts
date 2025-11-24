import { useState } from "react";

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  onSubmitCallback: (values: T) => void
) {
  const [values, setValues] = useState<T>(initialValues);

  const [errors, setErrors] = useState<
    Record<keyof T, { error: boolean; name: string }>
  >({} as any);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setValues(prev => ({ ...prev, [name]: value }));

    // remove erro corretamente
    setErrors(prev => ({
      ...prev,
      [name]: { error: false, name }
    }));
  }

  function validate() {
    const newErrors = {} as Record<
      keyof T,
      { error: boolean; name: string }
    >;

    (Object.keys(values) as (keyof T)[]).forEach(key => {
      const fieldValue = values[key];

      if (String(fieldValue).trim() === "") {
        newErrors[key] = { error: true, name: String(key) };
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    onSubmitCallback(values);
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
