export const getSecondsDifferenceOfDate = (date: number): number => {
  const diff = Date.now() - date;
  return Math.floor(diff / 1000)
};
