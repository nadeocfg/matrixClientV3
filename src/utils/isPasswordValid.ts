const isPasswordValid = (password: string): boolean => {
  const regexp =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,127}$/;

  return regexp.test(password);
};

export default isPasswordValid;
