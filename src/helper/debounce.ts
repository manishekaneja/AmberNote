function debounce<P extends any[]>(action: (...args: P) => any, time: number) {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: P) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      timeout = null;
      action(...args);
    }, time);
  };
}

export default debounce;
