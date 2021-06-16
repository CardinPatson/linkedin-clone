import { combineReducers } from "redux"; //NOUS PERMET DUTILISER COMBINEREDUCERS AU LIEU DE Redux.combineReducers

import userReducer from "./userReducers";
import articleReducer from "./articleReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  articleState: articleReducer, 
});
//rootReducer est notre objet que l'on passera en paramètre à createStore()
//dans combineReducer on peut avoir plusieurs clés dont les propriétés sont les reducers
// userReducer est notre reducer

export default rootReducer;
