'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getMoodEntries, MoodEntry } from '../../utils';

const moodToValue: { [key: string]: number } = {
  Happy: 5,
  Neutral: 3,
  Sad: 1,
  Angry: 2,
  Tired: 2,
};

interface ChartData {
  date: string;
  moodValue: number;
}

interface MoodTrendProps {
  updateTrigger: number;
}

export function MoodTrend({ updateTrigger }: MoodTrendProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const moodEntries = getMoodEntries();
    const data = moodEntries.map((entry: MoodEntry) => ({
      date: new Date(entry.date).toLocaleDateString(),
      moodValue: moodToValue[entry.mood] || 3,
    }));
    setChartData(data.reverse().slice(0, 14)); // Show last 14 days
  }, [updateTrigger]);

  return (
    <div className="bg-card text-card-foreground mb-8 rounded-lg p-4 shadow-md sm:p-6">
      <h2 className="mb-4 text-xl font-semibold">Mood Trend (Last 14 Days)</h2>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="moodValue"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-muted-foreground mt-4 text-sm">
        <p>5 = Happy, 4 = Not used, 3 = Neutral, 2 = Angry/Tired, 1 = Sad</p>
      </div>
    </div>
  );
}
