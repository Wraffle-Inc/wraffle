import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/ui/form";

import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

export interface RHFInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
}

const RHFInput = ({
  name,
  label,
  placeholder,
  description,
  type,
}: RHFInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="mb-2">
            <FormLabel>{label}</FormLabel>
          </div>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="min-h-6" />
        </FormItem>
      )}
    />
  );
};

export { RHFInput };
