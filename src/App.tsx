'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DiaryEntry,
  getDiaryEntries,
  getMoodEntries,
  searchEntries,
} from './utils';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';
import { DiaryEntries, DiaryEntryForm, RandomPhrase } from './components';
import { MoodTracker } from './components/MoodTracker';
import { SearchBar } from './components/SearchBar/SearchBar';
import { MoodStats } from './components/MoodStats';

export default function DearMeDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [currentView, setCurrentView] = useState<'write' | 'entries' | 'stats'>(
    'write',
  );
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<DiaryEntry[] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    setEntries(getDiaryEntries());
    const todaysMood = getMoodEntries()[0]?.mood;
    setCurrentMood(todaysMood || null);
  }, []);

  const handleEntryAdded = () => {
    setEntries(getDiaryEntries());
    setSearchResults(null);
  };

  const handleEntryRemoved = () => {
    setEntries(getDiaryEntries());
    setSearchResults(null);
    setUpdateTrigger((prev) => prev + 1);
  };

  const handleSearch = (query: string) => {
    const results = searchEntries(query);
    setSearchResults(results);
  };

  const handleViewChange = (view: 'write' | 'entries' | 'stats') => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const handleMoodChange = (mood: string) => {
    setCurrentMood(mood);
    setUpdateTrigger((prev) => prev + 1);
  };

  return (
    <ThemeProvider>
      <div className="bg-background text-foreground min-h-screen">
        <nav className="bg-card shadow-md">
          <div className="container mx-auto px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-card-foreground text-2xl font-semibold"
              >
                Dear Me Diary
              </motion.h1>
              <div className="hidden items-center space-x-4 sm:flex">
                {['write', 'entries', 'stats'].map((view) => (
                  <button
                    key={view}
                    onClick={() =>
                      handleViewChange(view as 'write' | 'entries' | 'stats')
                    }
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      currentView === view
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
                <ThemeSwitcher />
              </div>
              <div className="flex items-center space-x-2 sm:hidden">
                <ThemeSwitcher />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-card-foreground hover:text-muted-foreground focus:text-muted-foreground focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {isMenuOpen && (
              <div className="mt-4 sm:hidden">
                <div className="flex flex-col space-y-2">
                  {['write', 'entries', 'stats'].map((view) => (
                    <button
                      key={view}
                      onClick={() =>
                        handleViewChange(view as 'write' | 'entries' | 'stats')
                      }
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        currentView === view
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
        <main className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <RandomPhrase />
          <MoodTracker onMoodChange={handleMoodChange} />
          {currentView === 'write' && (
            <DiaryEntryForm
              onEntryAdded={handleEntryAdded}
              currentMood={currentMood}
            />
          )}
          {currentView === 'entries' && (
            <>
              <SearchBar onSearch={handleSearch} />
              <DiaryEntries
                entries={searchResults || entries}
                onEntryRemoved={handleEntryRemoved}
              />
            </>
          )}
          {currentView === 'stats' && (
            <MoodStats updateTrigger={updateTrigger} />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}
