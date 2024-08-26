import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  function debouncedFunction(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }

  // Adding a cancel method to clear the timeout
  debouncedFunction.cancel = () => {
    if (timeout) clearTimeout(timeout);
  };

  return debouncedFunction;
}
