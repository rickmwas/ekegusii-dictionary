import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Users, BookOpen, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              About Enchengeria
            </h1>
            <p className="text-xl text-muted-foreground">
              The official trilingual Ekegusii Dictionary
            </p>
          </div>

          <Card className="p-8 bg-gradient-card border-border">
            <div className="flex items-start gap-4">
              <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">The Dictionary</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Enchengeria is the official Ekegusii dictionary, providing comprehensive translations 
                  between Ekegusii, Kiswahili, and English. This project aims to preserve and promote 
                  the Ekegusii language (Omogusii dialect - Ekerogoro) for current and future generations.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-card border-border">
            <div className="flex items-start gap-4">
              <Users className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Lexicographers</h2>
                <p className="text-muted-foreground mb-4">
                  This dictionary was compiled by expert lexicographers from Kisii University:
                </p>
                <ul className="space-y-2 text-foreground">
                  <li>• Prof. John S. Akama</li>
                  <li>• Dr. Evans Mecha</li>
                  <li>• Dr. Peter N. Otieno</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-card border-border">
            <div className="flex items-start gap-4">
              <Award className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Features</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✨ Trilingual search (Ekegusii, Kiswahili, English)</li>
                  <li>🔊 Human pronunciation audio (Ekerogoro dialect)</li>
                  <li>📖 IPA transcriptions for accurate pronunciation</li>
                  <li>⭐ Save your favorite words</li>
                  <li>📋 Copy and share definitions</li>
                  <li>🌐 Works 100% offline</li>
                  <li>🎨 Beautiful cultural design inspired by Gusii heritage</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-primary border-accent">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-accent">Cultural Pride</h2>
              <p className="text-foreground leading-relaxed">
                The design of Enchengeria celebrates Gusii culture with colors inspired by 
                traditional symbolism - deep royal purple representing wisdom and heritage, 
                and amber gold representing prosperity and the warmth of our community.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
