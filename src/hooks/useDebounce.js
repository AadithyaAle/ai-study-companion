import { useState, useEffect } from 'react';

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: clears the timer if the value changes before the delay finishes
    // This is what prevents the update from happening on every keystroke!
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};