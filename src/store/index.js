import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//STORE est notre magasin redux qui contiendra l'etat en genérale de notre application

//ROOTREDUCER est notre reducer qui va gere les actions

//LOGIQUE !

//1. ON PEUT CREER UNE ACTION QUI NEST RIEN DAUTRE QUUN OBJET JS QUI CONTIENT DES INFOS SUR LEVENEMENT QUI VA SE PASSE
//2. ON CREE UN CREATEUR DACTION QUI EST UNE FONCTION JS QUI VA NOUS RETOURNER UNE ACTION

//3.DANS LE REDUCER(rootReducer) ON TRAITE LETAT DE NOTRE APPLI . root Reducer est une fonction qui doit prendre en argument le status de l'appli et l'action  et nous renvoie un nouveau status
//LACTION QUE LE REDUCER PREND EST CELUI RENVOYER PAR LE CREATEUR DACTION

// const REQUESTING_DATA = "REQUESTING_DATA";
// const RECEIVED_DATA = "RECEIVED_DATA";

// /**DEBUT CREATEUR DACTION  */
// const requestingData = () => {
//   return { type: REQUESTING_DATA };
// };

// const receivedData = (data) => {
//   return { type: RECEIVED_DATA, users: data.users };
// };
// /**FIN CREATEUR DACTION */

// const handleAsync = () => {
//   return function (dispatch) {
//     // Dispatch request action here

//     setTimeout(function () {
//       let data = {
//         users: ["Jeff", "William", "Alice"],
//       };
//       // Dispatch received data action here
//     }, 2500);
//   };
// };

// /**DEBUT ETAT */

// const defaultState = {
//   fetching: false,
//   users: [],
// };
// /**FIN ETAT */

// /**DEBUT REDUCER */

// const asyncDataReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case REQUESTING_DATA:
//       return {
//         fetching: true,
//         users: [],
//       };
//     case RECEIVED_DATA:
//       return {
//         fetching: false,
//         users: action.users,
//       };
//     default:
//       return state;
//   }
// };

// /**FIN REDUCER */

// /**DEBUT STORE */
// const store = Redux.createStore(
//   asyncDataReducer,
//   Redux.applyMiddleware(ReduxThunk.default)
// );
export default store;
// /**FIN STORE */
