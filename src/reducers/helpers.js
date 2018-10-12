export const getCardPoints = () => {
  const randomNum = Math.floor(Math.random() * 10 + 1);
  return randomNum % 2 === 0 ? 3 : randomNum > 5 ? 5 : 4;
};
