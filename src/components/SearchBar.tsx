import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 md:h-5 md:w-5" />
      <Input
        type="text"
        placeholder="Search in Ekegusii, Kiswahili, or English..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
        className="w-full h-12 md:h-14 pl-10 md:pl-12 pr-4 md:pr-6 text-base md:text-lg bg-card border-border focus:border-accent focus:ring-accent rounded-2xl shadow-card transition-all"
      />
    </div>
  );
}
