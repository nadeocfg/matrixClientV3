const isEmailValid = (str: string) => {
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
};

export default isEmailValid;
