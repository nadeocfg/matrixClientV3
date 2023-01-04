const getPowerLabel = (powerLevel: number) => {
  if (powerLevel >= 100) {
    return 'admin';
  }

  return null;
};

export default getPowerLabel;
