import { FormEvent } from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function FormContainer({ onSubmit, children }: FormProps) {
  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

interface FormInputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormInput({ value, onChange, placeholder }: FormInputProps) {
  return (
    <input className="border p-2 rounded w-full text-sm" value={value} onChange={onChange} placeholder={placeholder} />
  );
}

interface FormSelectProps {
  children: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function FormSelect({ children, value, onChange }: FormSelectProps) {
  return (
    <select className="border p-2 rounded w-full text-sm" value={value} onChange={onChange}>
      {children}
    </select>
  );
}

function FormButton({ children }: FormProps) {
  return (
    <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 text-sm">
      {children}
    </button>
  );
}

export const Form = {
  Container: FormContainer,
  Input: FormInput,
  Select: FormSelect,
  Button: FormButton,
};
