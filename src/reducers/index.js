import cards from "./cards";
import game from "./game";
import general from "./general";
import { combineReducers } from "redux";

export default combineReducers({ cards, game, general });
