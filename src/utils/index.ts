export interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
}

export interface MoodEntry {
  date: string;
  mood: string;
}

export const saveDiaryEntry = (entry: DiaryEntry) => {
  const entries = getDiaryEntries();
  entries.unshift(entry);
  localStorage.setItem('diaryEntries', JSON.stringify(entries));
};

export const getDiaryEntries = (): DiaryEntry[] => {
  const entries = localStorage.getItem('diaryEntries');
  return entries ? JSON.parse(entries) : [];
};

export const saveMoodEntry = (mood: string) => {
  const moodEntries = getMoodEntries();
  const today = new Date().toISOString().split('T')[0];
  const existingEntryIndex = moodEntries.findIndex(
    (entry) => entry.date === today,
  );

  if (existingEntryIndex !== -1) {
    moodEntries[existingEntryIndex].mood = mood;
  } else {
    moodEntries.unshift({ date: today, mood });
  }

  localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
};

export const getMoodEntries = (): MoodEntry[] => {
  const entries = localStorage.getItem('moodEntries');
  return entries ? JSON.parse(entries) : [];
};

export const searchEntries = (query: string): DiaryEntry[] => {
  const entries = getDiaryEntries();
  return entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(query.toLowerCase()) ||
      entry.content.toLowerCase().includes(query.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
  );
};
