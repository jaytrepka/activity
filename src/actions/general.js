export const toggleMenu = () => ({
  type: "TOGGLE_MENU"
});

export const loadGameScreen = () => ({
  type: "LOAD_GAME_SCREEN"
});

export const setScreen = (screen) => ({
  type: "SET_GAME_SCREEN",
  payload: {
    screen,
  }
});

export const clearError = () => ({
  type: "CLEAR_ERROR"
});