
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input, type InputProps } from "@/components/ui/input";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { AsYouType, isValidPhoneNumber, type CountryCode } from "libphonenumber-js";

interface Country {
  value: CountryCode;
  label: string;
  dialCode: string;
  flag: string;
}

const countries: Country[] = [
    { value: "SN", label: "Sénégal", dialCode: "+221", flag: "🇸🇳" },
    { value: "CI", label: "Côte d'Ivoire", dialCode: "+225", flag: "🇨🇮" },
    { value: "ML", label: "Mali", dialCode: "+223", flag: "🇲🇱" },
    { value: "BJ", label: "Bénin", dialCode: "+229", flag: "🇧🇯" },
    { value: "BF", label: "Burkina Faso", dialCode: "+226", flag: "🇧🇫" },
    { value: "NE", label: "Niger", dialCode: "+227", flag: "🇳🇪" },
    { value: "TG", label: "Togo", dialCode: "+228", flag: "🇹🇬" },
    { value: "GW", label: "Guinée-Bissau", dialCode: "+245", flag: "🇬🇼" },
    { value: "FR", label: "France", dialCode: "+33", flag: "🇫🇷" },
    { value: "US", label: "United States", dialCode: "+1", flag: "🇺🇸" },
    { value: "GB", label: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
];

interface PhoneNumberInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  value: string; // Should be the full E.164 number, e.g., "+221771234567"
  onChange: (value: string) => void;
}

const PhoneNumberInput = React.forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    
    // Determine selected country and national number from the E.164 value
    const getCountryAndNationalNumber = (e164Number: string) => {
        const asYouType = new AsYouType();
        asYouType.input(e164Number);
        const country = asYouType.getCountry();
        const nationalNumber = asYouType.getNationalNumber();
        const selected = countries.find(c => c.value === country);
        return { selected, nationalNumber };
    };
    
    const { selected: initialCountry, nationalNumber: initialNationalNumber } = getCountryAndNationalNumber(value);

    const [selectedCountry, setSelectedCountry] = React.useState<Country>(initialCountry || countries.find(c => c.value === 'SN')!);
    const [nationalNumber, setNationalNumber] = React.useState(initialNationalNumber || '');

    // Update internal state if the external value changes
    React.useEffect(() => {
        const { selected, nationalNumber } = getCountryAndNationalNumber(value);
        if (selected) {
            setSelectedCountry(selected);
        }
        setNationalNumber(nationalNumber);
    }, [value]);


    const handleCountrySelect = (country: Country) => {
      setSelectedCountry(country);
      const newE164Number = `${country.dialCode}${nationalNumber.replace(/\D/g, '')}`;
      onChange(newE164Number);
      setOpen(false);
    };

    const handleNationalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = new AsYouType(selectedCountry.value).input(e.target.value);
      setNationalNumber(formatted);
      const newE164Number = `${selectedCountry.dialCode}${e.target.value.replace(/\D/g, '')}`;
      onChange(newE164Number);
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
        <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                {selectedCountry.dialCode}
            </div>
            <Input
              ref={ref}
              type="tel"
              className={cn("rounded-l-none pl-16", className)} // Adjust padding for the dial code
              value={nationalNumber}
              onChange={handleNationalNumberChange}
              placeholder="77 123 45 67"
              {...props}
            />
        </div>
      </div>
    );
  }
);
PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;
