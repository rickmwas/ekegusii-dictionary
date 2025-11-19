import { useState, useEffect, useMemo } from 'react';
import dictionaryData from '@/data/dictionary.json';

export interface DictionaryEntry {
  ekegusii: string;
  ipa: string;
  pos: string;
  sw: string;
  en: string;
  ex: string;
  audio: string;
}

export type SortOption = 'alphabetical' | 'recent' | 'popular';
export type LanguageFilter = 'all' | 'ekegusii' | 'kiswahili' | 'english';

export function useDictionary() {
  const [entries] = useState<DictionaryEntry[]>(dictionaryData);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchCounts, setSearchCounts] = useState<Record<string, number>>({});
  const [posFilter, setPosFilter] = useState<string>('');
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('alphabetical');

  // Load favorites, search history, and search counts from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('enchengeria-favorites');
    const storedHistory = localStorage.getItem('enchengeria-history');
    const storedCounts = localStorage.getItem('enchengeria-search-counts');
    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
    if (storedCounts) {
      setSearchCounts(JSON.parse(storedCounts));
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (word: string) => {
    const newFavorites = favorites.includes(word)
      ? favorites.filter(f => f !== word)
      : [...favorites, word];
    
    setFavorites(newFavorites);
    localStorage.setItem('enchengeria-favorites', JSON.stringify(newFavorites));
  };

  // Add to search history and track counts
  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 20);
    setSearchHistory(newHistory);
    localStorage.setItem('enchengeria-history', JSON.stringify(newHistory));
    
    // Track search counts
    const newCounts = { ...searchCounts, [query.toLowerCase()]: (searchCounts[query.toLowerCase()] || 0) + 1 };
    setSearchCounts(newCounts);
    localStorage.setItem('enchengeria-search-counts', JSON.stringify(newCounts));
  };

  // Fuzzy search with filters and sorting
  const filteredEntries = useMemo(() => {
    let results = entries;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      
      results = results.filter(entry => {
        if (languageFilter === 'ekegusii') {
          return entry.ekegusii.toLowerCase().includes(query) || entry.ex.toLowerCase().includes(query);
        } else if (languageFilter === 'kiswahili') {
          return entry.sw.toLowerCase().includes(query);
        } else if (languageFilter === 'english') {
          return entry.en.toLowerCase().includes(query);
        }
        return (
          entry.ekegusii.toLowerCase().includes(query) ||
          entry.sw.toLowerCase().includes(query) ||
          entry.en.toLowerCase().includes(query) ||
          entry.ex.toLowerCase().includes(query)
        );
      });
    }

    // Apply POS filter
    if (posFilter) {
      results = results.filter(entry => entry.pos === posFilter);
    }

    // Apply sorting
    if (sortOption === 'alphabetical') {
      results = [...results].sort((a, b) => a.ekegusii.localeCompare(b.ekegusii));
    } else if (sortOption === 'popular') {
      results = [...results].sort((a, b) => {
        const countA = searchCounts[a.ekegusii.toLowerCase()] || 0;
        const countB = searchCounts[b.ekegusii.toLowerCase()] || 0;
        return countB - countA;
      });
    }
    // 'recent' keeps the original order from dictionary

    return results;
  }, [searchQuery, entries, posFilter, languageFilter, sortOption, searchCounts]);

  // Get favorite entries
  const favoriteEntries = useMemo(() => {
    return entries.filter(entry => favorites.includes(entry.ekegusii));
  }, [favorites, entries]);

  // Get unique POS values for filter
  const posOptions = useMemo(() => {
    const uniquePos = new Set(entries.map(e => e.pos));
    return Array.from(uniquePos).sort();
  }, [entries]);

  return {
    entries,
    searchQuery,
    setSearchQuery,
    filteredEntries,
    favorites,
    favoriteEntries,
    toggleFavorite,
    searchHistory,
    addToHistory,
    posFilter,
    setPosFilter,
    languageFilter,
    setLanguageFilter,
    sortOption,
    setSortOption,
    posOptions,
  };
}
