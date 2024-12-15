import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { Control } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RadioButtonProps {
  control: Control<any>,
  name: string;
  label: string;
  radioButtons: {
    label: string,
    value: string
  }[]
}

export const RadioButton: React.FC<RadioButtonProps> = ({ control, name, label, radioButtons, }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            className="flex space-x-6"
          >
            {radioButtons.map(rb => (
              <FormItem key={rb.value} className="space-x-1">
                <FormControl>
                  <RadioGroupItem value={rb.value} />
                </FormControl>
                <FormLabel className="font-normal">
                  {rb.label}
                </FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
