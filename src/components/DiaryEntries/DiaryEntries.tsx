import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { removeDiaryEntry } from '../../utils';
import { ConfirmDialog } from '../ConfirmDialog';
import { DiaryEntriesProps } from './types';

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
        {entries.length > 0 ? (
          entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-lg bg-white p-6 shadow-md"
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {entry.title}
              </h3>
              <p className="mb-2 text-sm text-gray-500">
                {new Date(entry.date).toLocaleString()}
              </p>
              {entry.picture && (
                <img
                  src={entry.picture}
                  alt="Entry"
                  className="mb-4 h-auto w-full rounded-md"
                />
              )}
              <p className="mb-4 whitespace-pre-wrap text-gray-700">
                {entry.content}
              </p>
              <div className="mb-2 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">Mood: {entry.mood}</p>
              <button
                onClick={() => handleRemoveEntry(entry.id)}
                className="absolute right-4 top-4 p-2 text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Delete entry"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-600">
            No entries found. Start writing your first entry!
          </div>
        )}
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
