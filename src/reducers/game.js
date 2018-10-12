let initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_GAME_SUCCESS":
    case "LOAD_GAME_SUCCESS": {
      return action.payload;
    }
    case "MOVE_TEAM_SUCCESS": {
      const { teamName, fieldsNumber } = action.payload;
      // let key = database.ref(`/cards/${id}`).push().key;
      const teamIndex = state.teams.findIndex(team => team.name === teamName);
      const updatedTeam = {
        ...state.teams[teamIndex],
        position: state.teams[teamIndex].position + Number(fieldsNumber)
      };
      const teams = [
        ...state.teams.slice(0, teamIndex),
        updatedTeam,
        ...state.teams.slice(teamIndex + 1)
      ];
      return { ...state, teams };
    }
    case "NEW_GAME": {
      return initialState;
    }
    default:
      return state;
  }
};
