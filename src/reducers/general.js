let initialState = {
  cardsLoaded: false,
  cardTaken: false,
  error: '',
  isError: false,
  isLoading: false,
  menuOpened: false,
  screen: "home", // 'home', 'create', 'load', 'play', 'results'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_GAME_START": {
      return { ...state, isLoading: true };
    }
    case "CREATE_GAME_SUCCESS": {
      return { ...state, isLoading: false, screen: "play" };
    }
    case "CREATE_GAME_ERROR": {
      return { ...state, isLoading: false, isError: true };
    }
    case "LOAD_GAME_START": {
      return { ...state, isLoading: true };
    }
    case "LOAD_GAME_SUCCESS": {
      return { ...state, isLoading: false, screen: "play", cardTaken: false };
    }
    case "LOAD_GAME_ERROR": {
      return { ...state, isLoading: false, isError: true, error: action.payload };
    }
    case "LOAD_CARDS_SUCCESS": {
      return { ...state, cardsLoaded: true };
    }
    case "NEW_GAME": {
      return initialState;
    }
    case "TOGGLE_MENU": {
      return { ...state, menuOpened: !state.menuOpened };
    }
    case "TAKE_CARD": {
      return { ...state, cardTaken: true };
    }
    case "MOVE_TEAM_SUCCESS": {
      const { position } = action.payload;
      if (position === 50) {
        return { ...state, cardTaken: false, screen: 'results' };
      }
      return { ...state, cardTaken: false };
    }
    case "NEXT_TEAM": {
      return { ...state, cardTaken: false };
    }
    case "LOAD_GAME_SCREEN": {
      return { ...state, isLoading: false, screen: "load", menuOpened: false };
    }
    default:
      return state;
  }
};
