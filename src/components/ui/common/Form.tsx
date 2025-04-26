import FormLayout, { FormLayoutProps } from "@/components/layout/form/FormLayout";
import InputLayout, { InputLayoutProps } from "@/components/layout/form/InputLayout";
import SelectLayout, { SelectLayoutProps } from "@/components/layout/form/SelectLayout";
import clsx from "clsx";

export const Form = {
  Container: (props: FormLayoutProps) => <FormLayout {...props} className={clsx(props.className)} />,
  Input: (props: InputLayoutProps) => (
    <InputLayout {...props} className={clsx("p-2 rounded border focus:border-primary text-sm", props.className)} />
  ),
  Select: (props: SelectLayoutProps) => (
    <SelectLayout {...props} className={clsx("p-2 rounded w-full text-sm", props.className)} />
  ),
};
