import FormLayout, { FormLayoutProps } from "@/components/layout/form/FormLayout";
import InputLayout, { InputLayoutProps } from "@/components/layout/form/InputLayout";
import SelectLayout, { SelectLayoutProps } from "@/components/layout/form/SelectLayout";

export const Form = {
  Container: (props: FormLayoutProps) => <FormLayout {...props} className="gap-3" />,
  Input: (props: InputLayoutProps) => <InputLayout {...props} className="p-2 rounded text-sm" />,
  Select: (props: SelectLayoutProps) => <SelectLayout {...props} className="p-2 rounded w-full text-sm" />,
};
