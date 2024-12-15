import { FormField, FormLabel, FormItem, FormControl, FormMessage } from "../ui/form"
import { Control, UseFormSetValue } from "react-hook-form"
import { Button } from "../ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { ChevronsUpDown, CheckIcon } from "lucide-react"

interface DropDownSearchProps {
  control: Control<any>
  name: string
  label: string,
  noValueMsg?: string
  placeholder?: string
  dropdownArray?: { id: number, value: string }[]
  setValue: UseFormSetValue<any>
}

export const DropDownSearch: React.FC<DropDownSearchProps> = ({control, name, label, setValue, placeholder = "Select Value",  noValueMsg = "No Value found", dropdownArray }: DropDownSearchProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel>{label}</FormLabel>
        <div className="w-full">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between font-normal",
                    !field.value && "text-gray-500"
                  )}
                >
                  {field.value
                    ? dropdownArray?.find(
                      (val) => val.id === field.value
                    )?.value
                    : placeholder }
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search client..."
                  className="h-9"
                />
                <CommandEmpty>{noValueMsg}</CommandEmpty>
                <CommandGroup>
                  {dropdownArray?.map((val) => (
                    <CommandItem
                      value={val.value}
                      key={val.id}
                      onSelect={() => {
                        setValue(name,val.id)
                      }}
                    >
                      {val.value}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          val.id === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
)