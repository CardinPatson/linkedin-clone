//USERREDUCER(LE FICHIER EST NOTRE 1ER REDUCER )

import { SET_USER } from "../actions/actionTypes"; // SET_USER EST LE TYPE DE NOTRE ACTION

//NB CEST DANS LE DOSSIER REDUCER QUE LON METTRA TOUT NOS REDUCER ( CEUX LA QUI GERE NOS ACTIONS ET MET A JOUR LETAT DE NOTRE STORE)
//ET DANS LINDEX ON FERA LA LIAISON DE NOS REDUCER DU DOSSIER REDUCERS

//NB ET DANS LE FICHIER STORE QUE LON RETROUVERA NOTRE REDUX.CREATESTRORE(NOTRE MAGASIN REDUX)

const INITIAL_STATE = {
	user: null,
};

//INITIAL_STATE EST LETAT PAR DEFAUT DE NOTRE APP QUI SUBIRA DES MODIFICATIONS DANS NOTRE REDUCER
const userReducer = (state = INITIAL_STATE, action) => {
	//action.type est le type de notre créateur d'évenements qui n'a pas encore été déclaré
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};

// USERREDUCER EST NOTRE REDUCER QUI VA APPORTER DES MODIFICATIONS A LETAT INITIAL EN FONCTION DE LACTION QUON LUI PASSE

export default userReducer;
