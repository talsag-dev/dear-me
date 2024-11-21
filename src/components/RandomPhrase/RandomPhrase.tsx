'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function RandomPhrase() {
  const [phrase, setPhrase] = useState('');
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setPhrase(data.content);
        setKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error('Error fetching phrase:', error);
        setPhrase('Write your thoughts for today...');
        setKey((prevKey) => prevKey + 1);
      }
    };

    fetchPhrase();
    const interval = setInterval(fetchPhrase, 30000); // Change phrase every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card text-card-foreground mb-8 rounded-lg p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Thought of the Moment</h2>
      <AnimatePresence mode="wait">
        <motion.p
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground text-center text-lg italic"
        >
          {phrase}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
