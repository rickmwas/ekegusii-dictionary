import { useState } from "react";
import { Volume2, Star, Copy, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { DictionaryEntry } from "@/hooks/useDictionary";

interface DictionaryCardProps {
  entry: DictionaryEntry;
  isFavorite: boolean;
  onToggleFavorite: (word: string) => void;
  onClick: () => void;
}

export function DictionaryCard({ entry, isFavorite, onToggleFavorite, onClick }: DictionaryCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // For now, show a toast since we don't have real audio files yet
    toast.info("Audio file not yet available. Add real audio recordings to /public/audio/");
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000);
    
    // When real audio files are added:
    // const audio = new Audio(`/audio/${entry.audio}`);
    // audio.play();
    // audio.onended = () => setIsPlaying(false);
  };

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${entry.ekegusii} [${entry.ipa}]\nKiswahili: ${entry.sw}\nEnglish: ${entry.en}`;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(entry.ekegusii);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <Card
      onClick={onClick}
      className="group relative p-4 md:p-6 bg-gradient-card border-border hover:border-accent cursor-pointer transition-all duration-300 hover:shadow-elevated hover:scale-[1.02]"
    >
      {/* Favorite button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleFavorite}
        className="absolute top-3 right-3 md:top-4 md:right-4 hover:bg-accent/20 h-8 w-8 md:h-10 md:w-10"
      >
        <Star
          className={`h-4 w-4 md:h-5 md:w-5 ${isFavorite ? "fill-amber-gold text-amber-gold" : "text-muted-foreground"}`}
        />
      </Button>

      <div className="space-y-2 md:space-y-3 pr-8 md:pr-10">
        {/* Ekegusii headword */}
        <div className="flex items-center gap-2 md:gap-3">
          <h3 className="text-2xl md:text-3xl font-bold text-accent break-words">{entry.ekegusii}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={playAudio}
            className="hover:bg-accent/20 hover:scale-110 transition-transform h-8 w-8 md:h-10 md:w-10 flex-shrink-0"
          >
            <Volume2 className={`h-4 w-4 md:h-5 md:w-5 text-accent ${isPlaying ? "animate-pulse" : ""}`} />
          </Button>
        </div>

        {/* IPA and POS */}
        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground flex-wrap">
          <span className="font-mono">{entry.ipa}</span>
          <span className="px-2 py-0.5 md:py-1 bg-primary/20 rounded text-xs">{entry.pos}</span>
        </div>

        {/* Definitions */}
        <div className="space-y-1.5 md:space-y-2">
          <p className="text-sm md:text-base text-foreground">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Kiswahili:</span>{" "}
            <span className="font-medium">{entry.sw}</span>
          </p>
          <p className="text-sm md:text-base text-foreground">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">English:</span>{" "}
            <span className="font-medium">{entry.en}</span>
          </p>
        </div>

        {/* Example */}
        {entry.ex && (
          <p className="text-xs md:text-sm text-muted-foreground italic border-l-2 border-accent/30 pl-2 md:pl-3 py-1">
            {entry.ex}
          </p>
        )}
      </div>

      {/* Action buttons on hover - visible on mobile, hidden on desktop until hover */}
      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-1 md:gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="hover:bg-accent/20 h-8 w-8 md:h-10 md:w-10"
        >
          <Copy className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
        <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-accent" />
      </div>
    </Card>
  );
}
