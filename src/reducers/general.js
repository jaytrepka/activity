let initialState = {
  cardTaken: false,
  error: '',
  isError: false,
  isLoading: false,
  menuOpened: false,
  screen: "init", // 'home', 'create', 'load', 'play', 'results'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_GAME_START": {
      return { ...state, isLoading: true, error: '', isError: false };
    }
    case "CREATE_GAME_SUCCESS": {
      return { ...state, isLoading: false, screen: "play" };
    }
    case "CREATE_GAME_ERROR": {
      return { ...state, isLoading: false, isError: true, error: action.payload  };
    }
    case "LOAD_GAME_START": {
      return { ...state, isLoading: true, error: '', isError: false };
    }
    case "LOAD_GAME_SUCCESS": {
      return { ...state, isLoading: false, screen: "play", cardTaken: false };
    }
    case "LOAD_GAME_ERROR": {
      return { ...state, isLoading: false, isError: true, error: action.payload };
    }
    case "NEW_GAME": {
      return {...initialState, screen: 'home' };
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
    case 'CLEAR_ERROR': {
      return { ...state, isError: false, error: '' };
    }
    case 'persist/REHYDRATE': {
      if (action.payload.general.screen === 'init') {
        return { ...state, ...action.payload.general, screen: 'home' };
      }
      return { ...state, ...action.payload.general };
    }
    default:
      return state;
  }
};
