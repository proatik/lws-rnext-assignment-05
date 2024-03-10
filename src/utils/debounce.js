/**
 * Creates a debounced function that delays invoking the provided function until after `delay` milliseconds have elapsed since the last time it was invoked.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} A debounced function.
 **/

export const debounce = (fn, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
