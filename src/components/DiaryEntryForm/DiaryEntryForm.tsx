'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, X } from 'lucide-react';
import { saveDiaryEntry } from '../../utils';

interface DiaryEntryFormProps {
  onEntryAdded: () => void;
  currentMood: string | null;
}

export function DiaryEntryForm({
  onEntryAdded,
  currentMood,
}: DiaryEntryFormProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [picture, setPicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        picture: picture || undefined,
      };
      saveDiaryEntry(newEntry);
      setContent('');
      setTitle('');
      setTags([]);
      setPicture(null);
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

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    setPicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-card text-card-foreground rounded-lg p-4 shadow-md sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry Title (optional)"
        className="border-input focus:ring-ring bg-background text-foreground mb-4 w-full rounded-md border p-2 focus:outline-none focus:ring-2"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Dear me..."
        className="border-input focus:ring-ring bg-background text-foreground mb-4 w-full resize-none rounded-md border p-2 focus:outline-none focus:ring-2"
        rows={8}
      />
      <div className="mb-4">
        <div className="mb-2 flex">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="Add a tag"
            className="border-input focus:ring-ring bg-background text-foreground flex-grow rounded-l-md border p-2 focus:outline-none focus:ring-2"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/70 focus:ring-ring rounded-r-md px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-secondary text-secondary-foreground flex items-center rounded-full px-2.5 py-0.5"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-secondary-foreground hover:text-primary ml-1 focus:outline-none"
                aria-label={`Remove tag ${tag}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handlePictureUpload}
          className="hidden"
          ref={fileInputRef}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-ring flex w-full items-center justify-center rounded-md px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <Camera className="mr-2" />
          {picture ? 'Change Picture' : 'Add Picture'}
        </button>
        {picture && (
          <div className="relative mt-2">
            <img
              src={picture}
              alt="Uploaded"
              className="h-auto max-w-full rounded-md"
            />
            <button
              type="button"
              onClick={handleRemovePicture}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-ring absolute right-2 top-2 rounded-full p-1 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              aria-label="Remove picture"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring w-full rounded-md px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Save Entry
      </button>
    </motion.form>
  );
}
