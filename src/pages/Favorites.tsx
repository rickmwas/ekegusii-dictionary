import { useState } from "react";
import { Header } from "@/components/Header";
import { DictionaryCard } from "@/components/DictionaryCard";
import { useDictionary } from "@/hooks/useDictionary";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { DictionaryEntry } from "@/hooks/useDictionary";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { favoriteEntries, favorites, toggleFavorite } = useDictionary();
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-accent fill-accent" />
            <h2 className="text-4xl font-bold text-accent">Your Favorites</h2>
          </div>

          {favoriteEntries.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                No favorites yet. Star some words to save them here!
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {favoriteEntries.map((entry, index) => (
                <DictionaryCard
                  key={`${entry.ekegusii}-${index}`}
                  entry={entry}
                  isFavorite={favorites.includes(entry.ekegusii)}
                  onToggleFavorite={toggleFavorite}
                  onClick={() => setSelectedEntry(entry)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

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
}
