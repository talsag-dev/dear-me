import { motion, AnimatePresence } from 'framer-motion';
import { DiaryEntriesProps } from './types';

export function DiaryEntries({ entries }: DiaryEntriesProps) {
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
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {entry.title}
              </h3>
              <p className="mb-2 text-sm text-gray-500">
                {new Date(entry.date).toLocaleString()}
              </p>
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
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-white p-6 shadow-md"
          >
            <p className="text-gray-600">No entries found. Start writing!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
