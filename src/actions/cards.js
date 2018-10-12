import { getCards } from "../javascripts/firebase";

export const loadCards = () => {
  return async dispatch => {
    try {
      dispatch({
        type: "LOAD_CARDS_START"
      });
      const game = await getCards();
      dispatch({
        type: "LOAD_CARDS_SUCCESS",
        payload: game.val()
      });
    } catch (error) {
      return {
        type: "LOAD_CARDS_ERROR",
        payload: error
      };
    }
  };
};

export const newGame = () => ({
  type: "NEW_GAME"
});

export const takeCard = (activity, difficulty) => ({
  type: "TAKE_CARD",
  payload: {
    activity,
    difficulty
  }
});
