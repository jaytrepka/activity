import { addGame, changeTeamPosition, getGame } from "../javascripts/firebase";
// import actionType from 'constants'

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
      return {
        type: "LOAD_GAME_ERROR",
        payload: error
      };
    }
  }
};

const loadGameByName = async gameName => {
  const game = await getGame(gameName);
  return game;
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
  return async (dispatch) => { 
    try {
      dispatch({
        type: "MOVE_TEAM_START",
      });
      const team = await changeTeamPosition(gameName, teamName, fieldsNumber);
      dispatch({
        type: "MOVE_TEAM_SUCCESS",
        payload: {
          teamName,
          fieldsNumber,
          position: team.position,
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

export const nextTeam = () => ({
  type: "NEXT_TEAM"
});


export const newGame = () => ({
  type: "NEW_GAME"
});

