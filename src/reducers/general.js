let initialState = {
  screen: "home", // 'home', 'create', 'load', 'play', 'results'
  isLoading: false,
  isError: false,
  menuOpened: false,
  cardTaken: false,
  cardsLoaded: false
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
      return { ...state, isLoading: false, screen: "play" };
    }
    case "LOAD_GAME_ERROR": {
      return { ...state, isLoading: false, isError: true };
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
    default:
      return state;
  }
};
