import FormButton, { FormButtonProps } from "@/components/layout/button/ButtonLayout";
import FormLayout, { FormLayoutProps } from "@/components/layout/form/FormLayout";
import InputLayout, { InputLayoutProps } from "@/components/layout/form/InputLayout";
import FormSelect, { SelectLayoutProps as SelectLayoutProps } from "@/components/layout/form/SelectLayout";
import { FormEvent } from "react";

export const Form = {
  Container: (props: FormLayoutProps) => <FormLayout {...props} className="gap-3" />,
  Input: (props: InputLayoutProps) => <InputLayout {...props} className="p-2 rounded text-sm" />,
  Select: (props: SelectLayoutProps) => <FormSelect {...props} className="p-2 rounded w-full text-sm" />,
  Button: (props: FormButtonProps) => <FormButton {...props} className="py-2 rounded w-full text-sm" />,
};
