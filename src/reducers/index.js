import cards from "./cards";
import { combineReducers } from "redux";
import game from "./game";
import general from "./general";

export default combineReducers({ cards, game, general });
