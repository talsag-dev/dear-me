'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DiaryEntry,
  getDiaryEntries,
  getMoodEntries,
  searchEntries,
} from './utils';
import { DiaryEntries, DiaryEntryForm, RandomPhrase } from './components';
import { MoodTracker } from './components/MoodTracker';
import { SearchBar } from './components/SearchBar/SearchBar';
import { MoodStats } from './components/MoodStats/MoodStats';

export default function DearMeDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [currentView, setCurrentView] = useState<'write' | 'entries' | 'stats'>(
    'write',
  );
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<DiaryEntry[] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setEntries(getDiaryEntries());
    const todaysMood = getMoodEntries()[0]?.mood;
    setCurrentMood(todaysMood || null);
  }, []);

  const handleEntryAdded = () => {
    setEntries(getDiaryEntries());
    setSearchResults(null);
  };

  const handleSearch = (query: string) => {
    const results = searchEntries(query);
    setSearchResults(results);
  };

  const handleViewChange = (view: 'write' | 'entries' | 'stats') => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-gray-800"
            >
              Dear Me Diary
            </motion.h1>
            <div className="hidden space-x-4 sm:flex">
              <button
                onClick={() => handleViewChange('write')}
                className={`rounded-md px-3 py-2 text-sm font-medium transition duration-200 ${
                  currentView === 'write'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100 active:bg-indigo-200'
                }`}
              >
                Write
              </button>
              <button
                onClick={() => handleViewChange('entries')}
                className={`rounded-md px-3 py-2 text-sm font-medium transition duration-200 ${
                  currentView === 'entries'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100 active:bg-indigo-200'
                }`}
              >
                Entries
              </button>
              <button
                onClick={() => handleViewChange('stats')}
                className={`rounded-md px-3 py-2 text-sm font-medium transition duration-200 ${
                  currentView === 'stats'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100 active:bg-indigo-200'
                }`}
              >
                Stats
              </button>
            </div>
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
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
                <button
                  onClick={() => handleViewChange('write')}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition duration-200 ${
                    currentView === 'write'
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-600 hover:bg-indigo-100 active:bg-indigo-200'
                  }`}
                >
                  Write
                </button>
                <button
                  onClick={() => handleViewChange('entries')}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition duration-200 ${
                    currentView === 'entries'
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-600 hover:bg-indigo-100 active:bg-indigo-200'
                  }`}
                >
                  Entries
                </button>
                <button
                  onClick={() => handleViewChange('stats')}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition duration-200 ${
                    currentView === 'stats'
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-600 hover:bg-indigo-100 active:bg-indigo-200'
                  }`}
                >
                  Stats
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <RandomPhrase />
        <MoodTracker onMoodChange={setCurrentMood} />
        {currentView === 'write' && (
          <DiaryEntryForm
            onEntryAdded={handleEntryAdded}
            currentMood={currentMood}
          />
        )}
        {currentView === 'entries' && (
          <>
            <SearchBar onSearch={handleSearch} />
            <DiaryEntries entries={searchResults || entries} />
          </>
        )}
        {currentView === 'stats' && <MoodStats />}
      </main>
    </div>
  );
}
