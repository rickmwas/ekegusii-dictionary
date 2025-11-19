import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { DictionaryCard } from "@/components/DictionaryCard";
import { InstallPrompt } from "@/components/InstallPrompt";
import { FilterPanel } from "@/components/FilterPanel";
import { useDictionary } from "@/hooks/useDictionary";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { DictionaryEntry } from "@/hooks/useDictionary";
import { Sparkles, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const {
    filteredEntries,
    searchQuery,
    setSearchQuery,
    favorites,
    toggleFavorite,
    addToHistory,
    posFilter,
    setPosFilter,
    languageFilter,
    setLanguageFilter,
    sortOption,
    setSortOption,
    posOptions,
  } = useDictionary();
  
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [wordOfTheDay, setWordOfTheDay] = useState<DictionaryEntry | null>(null);

  // Set word of the day
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('enchengeria-wotd');
    
    if (stored) {
      const { date, word } = JSON.parse(stored);
      if (date === today) {
        setWordOfTheDay(word);
        return;
      }
    }
    
    // Pick random word for today
    const randomIndex = Math.floor(Math.random() * filteredEntries.length);
    const word = filteredEntries[randomIndex];
    setWordOfTheDay(word);
    localStorage.setItem('enchengeria-wotd', JSON.stringify({ date: today, word }));
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      addToHistory(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <InstallPrompt />
      
      {/* Hero section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-12">
            <h1 className="text-5xl md:text-8xl font-bold bg-gradient-accent bg-clip-text text-transparent animate-pulse">
              ENCHENGERIA
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground px-4">
              Official Ekegusii Dictionary • Kiswahili • English
            </p>
          </div>

          {/* Search bar */}
          <div className="flex justify-center mb-6 md:mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>

          {/* Word of the day */}
          {wordOfTheDay && !searchQuery && (
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <Sparkles className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold text-accent">Word of the Day</h3>
              </div>
              <DictionaryCard
                entry={wordOfTheDay}
                isFavorite={favorites.includes(wordOfTheDay.ekegusii)}
                onToggleFavorite={toggleFavorite}
                onClick={() => setSelectedEntry(wordOfTheDay)}
              />
            </div>
          )}
        </div>
      </section>

      {/* Idioms Section (Coming Soon) */}
      {!searchQuery && (
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-2 border-accent/50 p-6 md:p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-accent/20 p-3 rounded-full">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">Ekegusii Idioms & Proverbs</h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Traditional wisdom and sayings from the Abagusii people
              </p>
              <div className="mt-4 inline-block px-4 py-2 bg-accent/10 rounded-full">
                <span className="text-accent font-semibold text-sm">Coming Soon</span>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Results section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {searchQuery && (
            <>
              <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-muted-foreground text-sm md:text-base">
                  Found {filteredEntries.length} result{filteredEntries.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              </div>

              <FilterPanel
                posFilter={posFilter}
                setPosFilter={setPosFilter}
                languageFilter={languageFilter}
                setLanguageFilter={setLanguageFilter}
                sortOption={sortOption}
                setSortOption={setSortOption}
                posOptions={posOptions}
              />
              
              <div className="grid gap-3 md:gap-4">
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12 md:py-16">
                    <p className="text-lg md:text-xl text-muted-foreground px-4">
                      No results found. Try adjusting your filters or search terms.
                    </p>
                  </div>
                ) : (
                  filteredEntries.map((entry, index) => (
                    <DictionaryCard
                      key={`${entry.ekegusii}-${index}`}
                      entry={entry}
                      isFavorite={favorites.includes(entry.ekegusii)}
                      onToggleFavorite={toggleFavorite}
                      onClick={() => setSelectedEntry(entry)}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="max-w-2xl bg-gradient-card border-accent">
          {selectedEntry && (
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-accent">{selectedEntry.ekegusii}</h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground font-mono">{selectedEntry.ipa}</p>
                <div className="space-y-3">
                  <p className="text-lg">
                    <span className="text-sm text-muted-foreground uppercase tracking-wide">Kiswahili:</span>{" "}
                    <span className="font-medium text-foreground">{selectedEntry.sw}</span>
                  </p>
                  <p className="text-lg">
                    <span className="text-sm text-muted-foreground uppercase tracking-wide">English:</span>{" "}
                    <span className="font-medium text-foreground">{selectedEntry.en}</span>
                  </p>
                </div>
                {selectedEntry.ex && (
                  <p className="text-base text-muted-foreground italic border-l-4 border-accent pl-4 py-2">
                    {selectedEntry.ex}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
