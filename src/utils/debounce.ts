export const debounce = (callback: (...args: any) => void, delay: number) => {
  let timer = setTimeout(() => {});

  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};
