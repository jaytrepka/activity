import { getCardPoints, getChangedCardsName } from "./helpers";

let initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_GAME_SUCCESS":
    case "LOAD_GAME_SUCCESS": {
      return action.payload;
    }
    case "MOVE_TEAM_SUCCESS": {
      const { teamName, fieldsNumber } = action.payload;
      const teamIndex = state.teams.findIndex(team => team.name === teamName);
      const updatedTeam = {
        ...state.teams[teamIndex],
        position: Math.min(state.teams[teamIndex].position + Number(fieldsNumber), 50)
      };
      const teams = [
        ...state.teams.slice(0, teamIndex),
        updatedTeam,
        ...state.teams.slice(teamIndex + 1)
      ];
      return { ...state, teams, playingTeam: (state.playingTeam + 1) % state.teams.length, activeCard: {} };
    }
    case "NEXT_TEAM": {
      return { ...state, playingTeam: (state.playingTeam + 1) % state.teams.length, activeCard: {} };
    }
    case "TAKE_CARD": {
      const { activity, difficulty } = action.payload;

      const changedArrayName = getChangedCardsName(difficulty, activity);

      const [first, ...rest] = state.cards[changedArrayName];
      const modifiedCards = [...rest, first];
      return {
        ...state,
        cards: {
          ...state.cards,
          [changedArrayName]: modifiedCards,
        },
        activeCard: { text: first.text, value: getCardPoints(), difficulty, activity }
      };
    }
    case "NEW_GAME": {
      return initialState;
    }
    default:
      return state;
  }
};
