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
      return { ...state, teams, playingTeam: (state.playingTeam + 1) % state.teams.length };
    }
    case "NEXT_TEAM": {
      return { ...state, playingTeam: (state.playingTeam + 1) % state.teams.length };
    }
    case "NEW_GAME": {
      return initialState;
    }
    default:
      return state;
  }
};
