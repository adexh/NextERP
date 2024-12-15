import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { Control } from "react-hook-form"

interface TextInputProps {
  control:Control<any>,
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const InputField: React.FC<TextInputProps> = ({ control, name, label, placeholder, type = "text" }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
