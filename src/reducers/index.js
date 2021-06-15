import { combineReducers } from "redux"; //NOUS PERMET DUTILISER COMBINEREDUCERS AU LIEU DE Redux.combineReducers

import userReducer from "./userReducers";

const rootReducer = combineReducers({
  userState: userReducer,
});
//rootReducer est notre objet que l'on passera en paramètre à createStore()
//dans combineReducer on peut avoir plusieurs clés dont les propriétés sont les reducers
// userReducer est notre reducer

export default rootReducer;
