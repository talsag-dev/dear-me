import { useEffect, useState } from 'react';
import { getMoodEntries, MoodEntry } from '../../utils';
import { MoodTrend } from '../MoodTrend';

interface MoodStatsProps {
  updateTrigger: number;
}

export function MoodStats({ updateTrigger }: MoodStatsProps) {
  const [moodStats, setMoodStats] = useState<Record<string, number>>({});
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    const entries = getMoodEntries();
    const stats: Record<string, number> = {};
    entries.forEach((entry: MoodEntry) => {
      stats[entry.mood] = (stats[entry.mood] || 0) + 1;
    });
    setMoodStats(stats);
    setTotalEntries(entries.length);
  }, [updateTrigger]);

  const getMoodPercentage = (mood: string) => {
    return (((moodStats[mood] || 0) / totalEntries) * 100).toFixed(1);
  };

  const moodEmoji: Record<string, string> = {
    Happy: '😊',
    Neutral: '😐',
    Sad: '😢',
    Angry: '😠',
    Tired: '😴',
  };

  return (
    <div className="space-y-8">
      <MoodTrend updateTrigger={updateTrigger} />
      <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">
          Your Mood Statistics
        </h2>
        {totalEntries > 0 ? (
          <div className="space-y-2">
            {Object.entries(moodStats).map(([mood]) => (
              <div key={mood} className="flex items-center justify-between">
                <span className="text-gray-600">
                  {moodEmoji[mood]} {mood}
                </span>
                <div className="flex items-center">
                  <div className="mr-2 h-2.5 w-48 rounded-full bg-gray-200">
                    <div
                      className="h-2.5 rounded-full bg-indigo-500"
                      style={{ width: `${getMoodPercentage(mood)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {getMoodPercentage(mood)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No mood data available yet. Start tracking your mood!
          </p>
        )}
      </div>
    </div>
  );
}
