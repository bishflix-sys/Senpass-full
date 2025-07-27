
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
    { value: "bj", label: "Bénin", dialCode: "+229", flag: "🇧🇯" },
    { value: "bf", label: "Burkina Faso", dialCode: "+226", flag: "🇧🇫" },
    { value: "ne", label: "Niger", dialCode: "+227", flag: "🇳🇪" },
    { value: "tg", label: "Togo", dialCode: "+228", flag: "🇹🇬" },
    { value: "gw", label: "Guinée-Bissau", dialCode: "+245", flag: "🇬🇼" },
    { value: "fr", label: "France", dialCode: "+33", flag: "🇫🇷" },
    { value: "us", label: "United States", dialCode: "+1", flag: "🇺🇸" },
    { value: "gb", label: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
];

interface PhoneNumberInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumberInput = React.forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    
    // Find the country that matches the start of the phone number value
    const countryFromValue = countries.find(c => value.startsWith(c.dialCode));
    const [selectedCountry, setSelectedCountry] = React.useState<Country>(countryFromValue || countries[0]);

    // Update selected country if the value changes from the outside (e.g. form reset)
    React.useEffect(() => {
        const newCountry = countries.find(c => value.startsWith(c.dialCode)) || countries[0];
        setSelectedCountry(newCountry);
    }, [value]);


    const handleCountrySelect = (country: Country) => {
      setSelectedCountry(country);
      const nationalNumber = value.replace(selectedCountry.dialCode, "");
      onChange(country.dialCode + nationalNumber);
      setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value.replace(/[^+\d]/g, ''); // Allow only digits and +
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
                            value={`${country.label} (${country.dialCode})`}
                            onSelect={() => handleCountrySelect(country)}
                        >
                            <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                selectedCountry.value === country.value ? "opacity-100" : "opacity-0"
                            )}
                            />
                            <span className="mr-2">{country.flag}</span>
                            <span>{country.label}</span>
                            <span className="text-muted-foreground ml-auto">{country.dialCode}</span>
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

