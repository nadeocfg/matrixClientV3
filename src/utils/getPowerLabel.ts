const getPowerLabel = (powerLevel: number) => {
  if (powerLevel > 100) {
    return 'founder';
  }

  if (powerLevel === 100) {
    return 'admin';
  }

  if (powerLevel > 0) {
    return 'moderator';
  }

  return null;
};

export default getPowerLabel;
