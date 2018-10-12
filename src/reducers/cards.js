import { getCardPoints } from "./helpers";

let initialState = {
  easyPantomime: [],
  hardPantomime: [],
  easyDrawing: [],
  hardDrawing: [],
  easySpeaking: [],
  hardSpeaking: [],
  activeCard: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_CARDS_SUCCESS": {
      return action.payload;
    }
    case "TAKE_CARD": {
      const { activity, difficulty } = action.payload;

      let changedArrayName;
      switch (`${difficulty}${activity}`) {
        case "00":
          changedArrayName = "easySpeaking";
          break;
        case "01":
          changedArrayName = "easyDrawing";
          break;
        case "02":
          changedArrayName = "easyPantomime";
          break;
        case "10":
          changedArrayName = "hardSpeaking";
          break;
        case "11":
          changedArrayName = "hardDrawing";
          break;
        case "12":
          changedArrayName = "hardPantomime";
          break;
      }

      const [first, ...rest] = state[changedArrayName];
      const modifiedCards = [...rest, first];
      console.log("her");
      return {
        ...state,
        [changedArrayName]: modifiedCards,
        activeCard: { text: first.text, value: getCardPoints() }
      };
    }
    default:
      return state;
  }
};
// activity meaning:
// 0 - speaking
// 1 -  drawing
// 2 - showing

// difficulty meaning:
// 0 - easy
// 1 - hard
