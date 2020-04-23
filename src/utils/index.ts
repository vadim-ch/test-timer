export const getSecondsDifferenceOfDate = (date: number): number => {
  return Math.floor((Date.now() - date) / 1000)
};
