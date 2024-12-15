import { Textarea } from "../ui/textarea";
import { FormField, FormLabel, FormControl, FormMessage, FormItem } from "../ui/form";
import { Control } from "react-hook-form";
import React from "react";

interface TextAreaProps {
  control: Control<any>,
  name: string,
  label: string,
  placeholder?:string
}

export const TextAreaField: React.FC<TextAreaProps> = ({control, name, label, placeholder } : TextAreaProps) => (
  <FormField
  control={control}
  name={name}
  render={({ field }) => (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea
          placeholder={placeholder} 
          className="resize-y w-full"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
)