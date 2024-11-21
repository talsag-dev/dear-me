'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { saveMoodEntry, getMoodEntries } from '../../utils';

interface MoodTrackerProps {
  onMoodChange: (mood: string) => void;
}

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
    <div className="bg-card text-card-foreground mb-8 rounded-lg p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">How are you feeling today?</h2>
      <div className="flex justify-center space-x-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.label}
            onClick={() => handleMoodSelect(mood.label)}
            className={`rounded-full p-2 text-3xl transition-all duration-200 ${
              selectedMood === mood.label
                ? 'bg-primary text-primary-foreground ring-primary ring-2'
                : 'hover:bg-secondary active:bg-secondary'
            }`}
          >
            {mood.emoji}
          </motion.button>
        ))}
      </div>
      {selectedMood && (
        <p className="text-muted-foreground mt-4 text-center">
          You're feeling <span className="font-semibold">{selectedMood}</span>{' '}
          today.
        </p>
      )}
    </div>
  );
}
