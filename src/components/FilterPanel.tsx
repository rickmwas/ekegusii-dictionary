import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { SortOption, LanguageFilter } from "@/hooks/useDictionary";

interface FilterPanelProps {
  posFilter: string;
  setPosFilter: (value: string) => void;
  languageFilter: LanguageFilter;
  setLanguageFilter: (value: LanguageFilter) => void;
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
  posOptions: string[];
}

export function FilterPanel({
  posFilter,
  setPosFilter,
  languageFilter,
  setLanguageFilter,
  sortOption,
  setSortOption,
  posOptions,
}: FilterPanelProps) {
  const resetFilters = () => {
    setPosFilter('');
    setLanguageFilter('all');
    setSortOption('alphabetical');
  };

  const hasActiveFilters = posFilter || languageFilter !== 'all' || sortOption !== 'alphabetical';

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="font-medium">Filters:</span>
        </div>
        
        <Select value={languageFilter} onValueChange={(v) => setLanguageFilter(v as LanguageFilter)}>
          <SelectTrigger className="w-[160px] bg-card border-border">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="ekegusii">Ekegusii</SelectItem>
            <SelectItem value="kiswahili">Kiswahili</SelectItem>
            <SelectItem value="english">English</SelectItem>
          </SelectContent>
        </Select>

        <Select value={posFilter} onValueChange={setPosFilter}>
          <SelectTrigger className="w-[180px] bg-card border-border">
            <SelectValue placeholder="Part of Speech" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            {posOptions.map((pos) => (
              <SelectItem key={pos} value={pos}>{pos}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
          <SelectTrigger className="w-[160px] bg-card border-border">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="popular">Most Searched</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-accent hover:text-accent/80">
            Reset
          </Button>
        )}
      </div>

      {/* Mobile Filters Sheet */}
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full relative">
              <Filter className="h-4 w-4 mr-2" />
              Filters & Sort
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-gradient-card border-accent">
            <SheetHeader>
              <SheetTitle className="text-accent">Filters & Sorting</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Language</label>
                <Select value={languageFilter} onValueChange={(v) => setLanguageFilter(v as LanguageFilter)}>
                  <SelectTrigger className="w-full bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="ekegusii">Ekegusii</SelectItem>
                    <SelectItem value="kiswahili">Kiswahili</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Part of Speech</label>
                <Select value={posFilter} onValueChange={setPosFilter}>
                  <SelectTrigger className="w-full bg-card border-border">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {posOptions.map((pos) => (
                      <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
                <Select value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
                  <SelectTrigger className="w-full bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    <SelectItem value="recent">Recently Added</SelectItem>
                    <SelectItem value="popular">Most Searched</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
