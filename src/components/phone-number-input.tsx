
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input, type InputProps } from "@/components/ui/input";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Country {
  value: string;
  label: string;
  dialCode: string;
  flag: string;
}

const countries: Country[] = [
    { value: "sn", label: "Sénégal", dialCode: "+221", flag: "🇸🇳" },
    { value: "ci", label: "Côte d'Ivoire", dialCode: "+225", flag: "🇨🇮" },
    { value: "ml", label: "Mali", dialCode: "+223", flag: "🇲🇱" },
    { value: "gn", label: "Guinée", dialCode: "+224", flag: "🇬🇳" },
    { value: "fr", label: "France", dialCode: "+33", flag: "🇫🇷" },
    { value: "us", label: "United States", dialCode: "+1", flag: "🇺🇸" },
    { value: "ca", label: "Canada", dialCode: "+1", flag: "🇨🇦" },
    { value: "gb", label: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
    { value: "de", label: "Germany", dialCode: "+49", flag: "🇩🇪" },
    { value: "ng", label: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
];

interface PhoneNumberInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumberInput = React.forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = React.useState<Country>(countries[0]);

    const handleCountrySelect = (country: Country) => {
      setSelectedCountry(country);
      onChange(country.dialCode);
      setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      // Ensure the dial code is always present at the start
      if (!inputValue.startsWith(selectedCountry.dialCode)) {
        inputValue = selectedCountry.dialCode + inputValue.replace(/\D/g, "");
      }
      onChange(inputValue);
    };

    return (
      <div className="flex items-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-[120px] rounded-r-none border-r-0"
            >
              {selectedCountry.flag}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
             <Command>
                 <CommandInput placeholder="Chercher pays..." />
                 <CommandList>
                    <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
                    <CommandGroup>
                        {countries.map((country) => (
                        <CommandItem
                            key={country.value}
                            value={country.label}
                            onSelect={() => handleCountrySelect(country)}
                        >
                            <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                selectedCountry.value === country.value ? "opacity-100" : "opacity-0"
                            )}
                            />
                            <span className="mr-2">{country.flag}</span>
                            <span>{country.label} ({country.dialCode})</span>
                        </CommandItem>
                        ))}
                    </CommandGroup>
                 </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          ref={ref}
          type="tel"
          className={cn("rounded-l-none", className)}
          value={value}
          onChange={handleInputChange}
          placeholder="Numéro de téléphone"
          {...props}
        />
      </div>
    );
  }
);
PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;
