'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search entries..."
          className="border-input focus:ring-ring bg-background text-foreground flex-grow rounded-l-md border p-2 focus:outline-none focus:ring-2"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring rounded-r-md px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </motion.form>
  );
}
