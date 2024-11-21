'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMoodEntries, saveMoodEntry } from '../../utils';
import { MoodTrackerProps } from './types';

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
];

export function MoodTracker({ onMoodChange }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    const todaysMood = getMoodEntries()[0]?.mood;
    if (todaysMood) {
      setSelectedMood(todaysMood);
    }
  }, []);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    saveMoodEntry(mood);
    onMoodChange(mood);
  };

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-700">
        How are you feeling today?
      </h2>
      <div className="flex justify-center space-x-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodSelect(mood.label)}
            className={`rounded-full p-2 text-3xl ${
              selectedMood === mood.label
                ? 'bg-indigo-100 ring-2 ring-indigo-500'
                : 'hover:bg-gray-100'
            }`}
          >
            {mood.emoji}
          </motion.button>
        ))}
      </div>
      {selectedMood && (
        <p className="mt-4 text-center text-gray-600">
          You're feeling <span className="font-semibold">{selectedMood}</span>{' '}
          today.
        </p>
      )}
    </div>
  );
}
