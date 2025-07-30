import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * TextAnimation Component
 *
 * A reusable React component for cycling through a list of words with
 * smooth entrance and exit animations using Framer Motion.
 * It provides a predefined visual style and animation behavior,
 * focusing on easy content and timing customization.
 *
 * Inputs (Props):
 * - `words`: (Array of strings, required) The array of words to display and animate through.
 * - `intervalTime`: (Number, optional, default: 2000ms) The time in milliseconds to wait before changing to the next word.
 *
 * Outputs:
 * - Renders an animated word that cycles through the provided `words` array,
 * with a consistent ease-in/ease-out effect and a subtle vertical shift.
 */


export default function TextAnimation({
  words = ["Hello", "World", "React", "Animation", "Awesome"], // Default words
  intervalTime = 3000, // Default interval
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, intervalTime);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [words, intervalTime]); // Depend on words and intervalTime to re-initialize if they change

  const currentWord = words[currentWordIndex];

  // Define animation variants with hardcoded values for fixed style
  const variants = {
    enter: { opacity: 0, y: -20 }, // Initial state for entering
    center: { opacity: 1, y: 0 },  // State when fully visible
    exit: { opacity: 0, y: 20 },   // State when exiting
  };

  return (
    <div
      /* style={{
        fontSize: '3em',      // Hardcoded style
        fontWeight: 'bold',   // Hardcoded style
        minHeight: '1.2em',   // Ensures stable height during transitions
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Necessary for absolute positioning of children
      }} */
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord} // Crucial for Framer Motion to detect word changes
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 }, // Hardcoded spring transition for Y
            opacity: { duration: 0.5, ease: "easeOut" },       // Hardcoded opacity transition
          }}
          className=" bg-gradient-to-r to-brand-primary from-brand-accent 
                    bg-clip-text text-transparent p-5 pt-5 text-4xl text-brand-primary font-bold"
          //style={{ position: 'absolute' }} // Helps manage overlapping during transition
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}