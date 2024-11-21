'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DiaryEntry, removeDiaryEntry } from '../../utils';
import { ConfirmDialog } from '../ConfirmDialog';

interface DiaryEntriesProps {
  entries: DiaryEntry[];
  onEntryRemoved: () => void;
}

export function DiaryEntries({ entries, onEntryRemoved }: DiaryEntriesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

  const handleRemoveEntry = (id: string) => {
    setEntryToDelete(id);
    setIsDialogOpen(true);
  };

  const confirmRemoveEntry = () => {
    if (entryToDelete) {
      removeDiaryEntry(entryToDelete);
      onEntryRemoved();
    }
    setIsDialogOpen(false);
    setEntryToDelete(null);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-card text-card-foreground relative rounded-lg p-6 shadow-md"
          >
            <h3 className="mb-2 text-xl font-semibold">{entry.title}</h3>
            <p className="text-muted-foreground mb-2 text-sm">
              {new Date(entry.date).toLocaleString()}
            </p>
            {entry.picture && (
              <img
                src={entry.picture}
                alt="Entry"
                className="mb-4 h-auto w-full rounded-md"
              />
            )}
            <p className="text-foreground mb-4 whitespace-pre-wrap">
              {entry.content}
            </p>
            <div className="mb-2 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">Mood: {entry.mood}</p>
            <button
              onClick={() => handleRemoveEntry(entry.id)}
              className="text-destructive hover:text-destructive/90 absolute right-4 top-4 p-2 focus:outline-none"
              aria-label="Delete entry"
            >
              <Trash2 size={20} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmRemoveEntry}
        title="Delete Entry"
        description="Are you sure you want to delete this entry? This action cannot be undone."
      />
    </div>
  );
}
