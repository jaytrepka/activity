// activity meaning:
// 0 - speaking
// 1 -  drawing
// 2 - showing

// difficulty meaning:
// 0 - easy
// 1 - hard
export const plan = [
  {
    activity: 0,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 0
  },
  {
    activity: 1,
    difficulty: 0
  },
  {
    activity: 0,
    difficulty: 0
  },
  {
    activity: 2,
    difficulty: 1
  },
  {
    activity: 0,
    difficulty: 1
  },
  {
    activity: 0,
    difficulty: 1
  },
  {
    activity: 1,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 0
  },
  {
    activity: 1,
    difficulty: 0
  },
  {
    activity: 1,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 0
  },
  {
    activity: 0,
    difficulty: 0
  },
  {
    activity: 2,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 1
  },
  {
    activity: 1,
    difficulty: 0
  },
  {
    activity: 1,
    difficulty: 1
  },
  {
    activity: 1,
    difficulty: 0
  },
  {
    activity: 0,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 1
  },
  {
    activity: 0,
    difficulty: 0
  },
  {
    activity: 2,
    difficulty: 0
  },
  {
    activity: 0,
    difficulty: 1
  },
  {
    activity: 1,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 1
  },
  {
    activity: 1,
    difficulty: 1
  },
  {
    activity: 1,
    difficulty: 0
  },
  {
    activity: 1,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 0
  },
  {
    activity: 2,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 0
  },
  {
    activity: 0,
    difficulty: 0
  },
  {
    activity: 1,
    difficulty: 0
  },
  {
    activity: 2,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 0
  },
  {
    activity: 1,
    difficulty: 0
  },
  {
    activity: 0,
    difficulty: 1
  },
  {
    activity: 1,
    difficulty: 1
  },
  {
    activity: 0,
    difficulty: 0
  },
  {
    activity: 2,
    difficulty: 0
  },
  {
    activity: 1,
    difficulty: 1
  },
  {
    activity: 0,
    difficulty: 1
  },
  {
    activity: 2,
    difficulty: 1
  },
  {
    activity: 0,
    difficulty: 0
  },
  {
    activity: 0,
    difficulty: 0
  },
  {
    activity: 2,
    difficulty: 0
  },
  {
    activity: 1,
    difficulty: 0
  },
  {
    activity: 0,
    difficulty: 0
  },
  {
    activity: 0,
    difficulty: 0
  }
].reverse();

export const computePlayerPosition = position => {
  let left = 90;
  switch (position % 10) {
    case 4:
    case 5:
      left = 10;
      break;
    case 3:
    case 6:
      left = 30;
      break;
    case 2:
    case 7:
      left = 50;
      break;
    case 1:
    case 8:
      left = 70;
      break;
    case 0:
    case 9:
    default:
      left = 90;
      break;
  }

  return {
    left: `calc(${left}% - 20px)`,
    top: `calc(${Math.floor(position / 5) * 10 + 5}% - 20px)`
  };
};
