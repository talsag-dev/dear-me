'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DiaryEntryFormProps } from './types';
import { saveDiaryEntry } from '../../utils';

export function DiaryEntryForm({
  onEntryAdded,
  currentMood,
}: DiaryEntryFormProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        title: title.trim() || 'Untitled',
        content,
        mood: currentMood || 'Not specified',
        tags,
      };
      saveDiaryEntry(newEntry);
      setContent('');
      setTitle('');
      setTags([]);
      onEntryAdded();
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-4 shadow-md sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry Title (optional)"
        className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Dear me..."
        className="mb-4 w-full resize-none rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={8}
      />
      <div className="mb-4">
        <div className="mb-2 flex">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="Add a tag"
            className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="rounded-r-md bg-indigo-500 px-4 py-2 text-white transition duration-200 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                aria-label={`Remove tag ${tag}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-indigo-500 px-4 py-2 text-white transition duration-200 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-700"
      >
        Save Entry
      </button>
    </motion.form>
  );
}
