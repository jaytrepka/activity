import { addGame, changeTeamPosition, getGame } from "../javascripts/firebase";
// import actionType from 'constants'

export const loadGame = gameName => async ({ dispatch }) => {
  // export const loadGame = (gameName) => async (dispatch) => {

  // export const loadGame = (gameName) => {
  //  return async dispatch => {
  try {
    dispatch({
      type: "LOAD_GAME_START" // actionType.LOAD_SECTIONS_REQUEST
    });
    const game = await getGame(gameName);
    console.log("gettingHovno", game.val());

    return {
      type: "LOAD_GAME_SUCCESS", //actionType.LOAD_SECTIONS_SUCCESS,
      payload: game.val()
    };
  } catch (error) {
    return {
      type: "LOAD_GAME_ERROR", //actionType.LOAD_SECTIONS_FAILED,
      payload: error
    };
  }
};

const loadGameByName = async gameName => {
  const game = await getGame(gameName);
  return game.val();
};

export const createGame = (gameName, teams, timePerRound) => {
  return async dispatch => {
    try {
      dispatch({
        type: "CREATE_GAME_START"
      });
      await addGame(gameName, teams, timePerRound);
      const game = await loadGameByName(gameName); //refresh the data to keep up-to-date
      dispatch({
        type: "CREATE_GAME_SUCCESS",
        payload: game
      });
    } catch (error) {
      return {
        type: "CREATE_GAME_ERROR",
        payload: error
      };
    }
  };
};

export const moveTeam = (gameName, teamName, fieldsNumber) => {
  return async dispatch => {
    try {
      dispatch({
        type: "MOVE_TEAM_START"
      });
      await changeTeamPosition(gameName, teamName, fieldsNumber);
      dispatch({
        type: "MOVE_TEAM_SUCCESS",
        payload: {
          teamName,
          fieldsNumber
        }
      });
    } catch (error) {
      return {
        type: "MOVE_TEAM_ERROR",
        payload: error
      };
    }
  };
};

export const newGame = () => ({
  type: "NEW_GAME"
});
