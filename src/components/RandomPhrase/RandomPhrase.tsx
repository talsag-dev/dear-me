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
    const interval = setInterval(fetchPhrase, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-700">
        Thought of the Moment
      </h2>
      <AnimatePresence mode="wait">
        <motion.p
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg italic text-gray-600"
        >
          {phrase}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
