import { addGame, changeTeamPosition, getCards, getGame } from "../javascripts/firebase";
import shuffle from 'lodash/shuffle';

export const loadGame = gameName => {
  return async dispatch => {
    try {
      dispatch({
        type: "LOAD_GAME_START"
      });
      const game = await getGame(gameName);
      if (!game) {
        dispatch({
          type: "LOAD_GAME_ERROR",
          payload: 'Hra neexistuje'
        });
      } else {
        dispatch({
          type: "LOAD_GAME_SUCCESS",
          payload: game
        });
      }
    } catch (error) {
      dispatch({
        type: "LOAD_GAME_ERROR",
        payload: error
      });
    }
  }
};

const loadGameByName = async gameName => {
  const game = await getGame(gameName);
  return game;
};

const loadCards = async (cardSet) => {
  const cards = await getCards(cardSet);
  let shuffledCards = cards.val();
  for (const [key, value] of Object.entries(shuffledCards)) {
    shuffledCards[key] = shuffle(value);
  }
  return shuffledCards;
};

export const createGame = (gameName, teams, timePerRound, cardSet, drawing) => {
  return async dispatch => {
    try {
      dispatch({
        type: "CREATE_GAME_START"
      });
      const cards = await loadCards(cardSet)
      await addGame(gameName, teams, cards, timePerRound, drawing);
      const game = await loadGameByName(gameName); //refresh the data to keep up-to-date
      dispatch({
        type: "CREATE_GAME_SUCCESS",
        payload: game
      });
    } catch (error) {
      dispatch({
        type: "CREATE_GAME_ERROR",
        payload: error.message,
      });
    }
  };
};

export const moveTeam = (gameName, teamName, fieldsNumber, dontChangePlayer = false, gameEnd = false) => {
  return async (dispatch) => { 
    try {
      dispatch({
        type: "MOVE_TEAM_START",
      });
      const team = await changeTeamPosition(gameName, teamName, fieldsNumber, gameEnd);
      dispatch({
        type: "MOVE_TEAM_SUCCESS",
        payload: {
          teamName,
          fieldsNumber,
          position: Math.max(team.position, 49),
          dontChangePlayer,
          gameEnd,
        }
      });
    } catch (error) {
      dispatch({
        type: "MOVE_TEAM_ERROR",
        payload: error
      });
    }
  };
};

export const takeCard = (activity, difficulty) => ({
  type: "TAKE_CARD",
  payload: {
    activity,
    difficulty,
  }
});

export const takeSpecialCard = () => ({
  type: "TAKE_SPECIAL_CARD"
});

export const selectSpecialCard = (index) => ({
  type: "SELECT_SPECIAL_CARD",
  payload: {
    index,
  }
});

export const nextTeam = () => ({
  type: "NEXT_TEAM"
});


export const newGame = () => ({
  type: "NEW_GAME"
});

