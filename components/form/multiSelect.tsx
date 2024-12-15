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
import { ChevronsUpDown as CaretSortIcon, CheckIcon } from "lucide-react"

interface MultiSelectProps {
  control: Control<any>
  name: string
  label: string,
  noValueMsg?: string
  placeholder?: string
  isSelected: (val: string) => {id: any, value: any}[]
  dropdownArray: { id: any, value: any }[]
  setValue: UseFormSetValue<any>
}

export const MultiSelect: React.FC<MultiSelectProps> = ({control, name, label, isSelected, setValue, placeholder = "Select Value",  noValueMsg = "No Value found", dropdownArray }: MultiSelectProps) =>{
  return (
    <FormField
    control={control}
    name="projects"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className="w-[200px] justify-between text-gray-500 font-normal"
              >
                {"Add Project"}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder="Search Project..."
                className="h-9"
              />
              <CommandEmpty>No value found.</CommandEmpty>
              <CommandGroup>
                {dropdownArray.map((val) => {
                  const projectExist = !!isSelected(name)?.find(el => el.id == val.id) ;
                  return <CommandItem
                    value={val.value}
                    key={val.id}
                    disabled={projectExist}
                    onSelect={() => {
                      const array = isSelected(name);
                      setValue(name, array ? [ ...array, val] : [])
                    }}
                    className={cn(projectExist ? " text-gray-500" : "")}
                  >
                    {val.value}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4", projectExist ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}