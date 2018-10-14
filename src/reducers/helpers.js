export const getCardPoints = () => {
  const randomNum = Math.floor(Math.random() * 10 + 1);
  return randomNum % 2 === 0 ? 3 : randomNum > 5 ? 5 : 4;
};

export const getChangedCardsName = (difficulty, activity) => {
  switch (`${difficulty}${activity}`) {
    case "00":
      return "easySpeaking";
    case "01":
      return "easyDrawing";
    case "02":
      return "easyPantomime";
    case "10":
      return "hardSpeaking";
    case "11":
      return "hardDrawing";
    case "12":
    default:
      return "hardPantomime";
  }
};
