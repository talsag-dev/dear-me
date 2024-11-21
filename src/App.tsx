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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-gray-800"
            >
              Dear Me
            </motion.h1>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentView('write')}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  currentView === 'write'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100'
                }`}
              >
                Write
              </button>
              <button
                onClick={() => setCurrentView('entries')}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  currentView === 'entries'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100'
                }`}
              >
                Entries
              </button>
              <button
                onClick={() => setCurrentView('stats')}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  currentView === 'stats'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100'
                }`}
              >
                Stats
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto max-w-4xl px-6 py-8">
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
