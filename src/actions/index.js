import { auth, provider, storage } from "../firebase";
import db from "../firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionTypes";
import Axios from "axios";

// setUser est mon createur d'action
export const setUser = (payload) => {
	return {
		type: SET_USER,
		user: payload, //payload is an objet that contain the information about the user we take this in firebase.js
	};
};

export const getArticles = (payload) => {
	return {
		type: GET_ARTICLES,
		payload: payload,
	};
};
//oauth/accesstoken?grant_type=authorization_code -X POST -d 'client_id=bBGAQrXgivA9lKu7NMPyoYpVKNhGar6K&client_secret=hAr4Gn0gA9vAyvI4'
export function signInAPI() {
	//dispatch for the async function
	return (dispatch) => {
		Axios.get("http://localhost:3002/")
			.then((rep) => {
				console.log(rep.data);
				window.location.assign(rep.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// return (dispatch) => {
	// 	//quand le firebase va repondre : then
	// 	auth
	// 		.signInWithPopup(provider)
	// 		//notre payload sera un objet contenant tous les informations sur l'utilisateur son mail , photo .. que l'on utilisera dans notre application
	// 		.then((payload) => {
	// 			dispatch(setUser(payload.user)); //L'objet payload.user est envoyé au créateur d'evenemetn setUser
	// 		})
	// 		.catch((error) => {
	// 			alert(error.message);
	// 		});
	// };
}
//Action qui va aller chercher les données du user dans la base de données firebase

//signIn est notre createur d'action asynchrone

// une action est asynchrone lorsque son créateur retourne une fonction

export function getUserAuth() {
	return (dispatch) => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				dispatch(setUser(user));
			}
		});
	};
}

export function signOutAPI() {
	return (dispatch) => {
		auth
			.signOut()
			.then(() => {
				dispatch(setUser(null));
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
}
export const setLoading = (status) => {
	return { type: SET_LOADING_STATUS, status: status };
};

export function postArticleAPI(payload) {
	return (dispatch) => {
		dispatch(setLoading(true));
		if (payload.image !== "") {
			const upload = storage
				.ref(`images/${payload.image.name}`)
				.put(payload.image);
			upload.on(
				"state_change",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

					console.log(`Progress : ${progress}%`);
					if (snapshot.state === "RUNNING") {
						console.log(`Progress : ${progress}%`);
					}
				},
				(error) => console.log(error.code),
				async () => {
					const downloadURL = await upload.snapshot.ref.getDownloadURL();
					db.collection("articles").add({
						actor: {
							description: payload.user.email,
							title: payload.user.displayName,
							date: payload.timestamp,
							image: payload.user.photoURL,
						},
						video: payload.video,
						sharedImg: downloadURL,
						comments: 0,
						description: payload.description,
					});
					dispatch(setLoading(false)); //LORSQUE CE QUI EST EN HAUT AURA FINI SON EXECUTION ON VEUT ARRETER LE CHARGEMENT
				}
			);
		} else if (payload.video) {
			db.collection("articles").add({
				actor: {
					description: payload.user.email,
					title: payload.user.displayName,
					date: payload.timestamp,
					image: payload.user.photoURL,
				},
				video: payload.video,
				sharedImg: "",
				comments: 0,
				description: payload.description,
			});
			dispatch(setLoading(false));
		}
	};
}

export function getArticlesAPI() {
	return (dispatch) => {
		let payload;

		db.collection("articles")
			.orderBy("actor.date", "desc")
			.onSnapshot((snapshot) => {
				payload = snapshot.docs.map((doc) => doc.data());
				console.log(payload);
				dispatch(getArticles(payload));
				console.log(getArticles(payload));
			});
	};
}
//I DONT KNOW WHAT SNAPSHOT MEANS
//PAYLOAD cardin.tiako@gmail.com
/*{
    "user": {
        "uid": "9IkY97cPQyMiwxC5oOe3ArdFvq52",
        "displayName": "Cardin Tiako",
        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GimadObA7sJaow6LQrxN3IVjnUmah40jlC8O94l=s96-c",
        "email": "cardin.tiako@gmail.com",
        "emailVerified": true,
        "phoneNumber": null,
        "isAnonymous": false,
        "tenantId": null,
        "providerData": [
            {
                "uid": "109153511831849486655",
                "displayName": "Cardin Tiako",
                "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GimadObA7sJaow6LQrxN3IVjnUmah40jlC8O94l=s96-c",
                "email": "cardin.tiako@gmail.com",
                "phoneNumber": null,
                "providerId": "google.com"
            }
        ],
        "apiKey": "AIzaSyD9pYFv4ziXNZSZG7jeB7t7dAmMLHh3LxE",
        "appName": "[DEFAULT]",
        "authDomain": "linkedin-clone-7b5b5.firebaseapp.com",
        "stsTokenManager": {
            "apiKey": "AIzaSyD9pYFv4ziXNZSZG7jeB7t7dAmMLHh3LxE",
            "refreshToken": "AGEhc0BDv41Iw3NkhH4AB9qkez4LUd4hIoO_wuQSkhThFTCTp6szdCpZadMOpcXu_T4GfiQid-IaGnLFZLug0jXt2ZDCQTVazhyag0Aj6cZ_fuY-9bXnG2v6qgcoM7VgBQqq6kic6rop5n05WjfMDgIOnthcHw_z7zq_fyNsouSHspAKajrxvJ3NDEwYiWhldGQOEg8eBHbr3ucGeEPk9bNFvGEq5n6ZHlwZN7CJIkIR5tt-sIx0xSJdQZ0QcNOED943vB1_iKjby4CdL9HyFMw7_7CuFoGTECepZ888OLoemd2w1A9y9ts-C7_PUDdx-KMwNE-bHqaT6TLdpCv-HiWONyaPHk9yWhr5kk_IdFSjXQHDwT1fMQnpt56k6_pgVuxMQueEjFCNC-aGY7jOLtDAvuAbw3-tDkjn2RSWRgulRKPUD6BejpNBNhoF76b1NnGVv9RptGL5",
            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ2FyZGluIFRpYWtvIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpbWFkT2JBN3NKYW93NkxRcnhOM0lWam5VbWFoNDBqbEM4Tzk0bD1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9saW5rZWRpbi1jbG9uZS03YjViNSIsImF1ZCI6ImxpbmtlZGluLWNsb25lLTdiNWI1IiwiYXV0aF90aW1lIjoxNjIzMzUxNjYyLCJ1c2VyX2lkIjoiOUlrWTk3Y1BReU1pd3hDNW9PZTNBcmRGdnE1MiIsInN1YiI6IjlJa1k5N2NQUXlNaXd4QzVvT2UzQXJkRnZxNTIiLCJpYXQiOjE2MjMzNTE2NjIsImV4cCI6MTYyMzM1NTI2MiwiZW1haWwiOiJjYXJkaW4udGlha29AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDkxNTM1MTE4MzE4NDk0ODY2NTUiXSwiZW1haWwiOlsiY2FyZGluLnRpYWtvQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.Ok9xwZjZut15ZQh1vlnmebEsBTToQjmw7WXh5KM9RtzygpKK7H_XV7Ge0sFm7kGYWJoZvIGXy0ciOotrKGXFGjn_qx_MgBrCrdAd0YukKZstBxWdFgfbOR1oZ7FQPYxlwDIaZMBwNTJV33WJzucmdECGjt62CmxtZwQwdQhYbtJeX5G2GCO4TkudRZaSS_rY5POaqXfmHBezsky8HFAkbjl-znu5vycNjDQmhiU8SXJxjKJb4bLZBIVQAueY8CdR6zk5CUrDbscrqT-Qw0agvDK1N0OUN57xnvORWYEWqYoHucWqiDjc0YbNbKwzwAGkclrBKKG4ZlcnXquamMfFcw",
            "expirationTime": 1623355262616
        },
        "redirectEventId": null,
        "lastLoginAt": "1623351592461",
        "createdAt": "1623351592460",
        "multiFactor": {
            "enrolledFactors": []
        }
    },
    "credential": {
        "providerId": "google.com",
        "signInMethod": "google.com",
        "oauthIdToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhMWQyNmQ5OTJiZTdhNGI2ODliZGNlMTkxMWY0ZTlhZGM3NWQ5ZjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjE1MTI1NDA1MjY5LTNycHE4NTJ1Z2plN21rdG00bDhyYjhvdGRzazRmZ3V1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjE1MTI1NDA1MjY5LTNycHE4NTJ1Z2plN21rdG00bDhyYjhvdGRzazRmZ3V1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA5MTUzNTExODMxODQ5NDg2NjU1IiwiZW1haWwiOiJjYXJkaW4udGlha29AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ1NDk4ZThFMWRfVmh0NGJCWHZYWmpBIiwiaWF0IjoxNjIzMzUxNjYyLCJleHAiOjE2MjMzNTUyNjJ9.usKKDU2y6I0RxX5aXBsaczC-9PzOajvIhE30CR5D1JvFyxoY8Jh4uHMIX4Ng0NeziX5fK5JlZwnuvRG8Ok9wF5QnAoDSqsUfEW9jQV4QQFLXPpkDlKmGDdf6DD5x9XWx9-U6b2Xk2L_xJPgBFJ8W_ELwusn4MptumZKF7QoohCBQb3UBJFa3OAX-4PgY0oQf1Q_FEnsT6tGtGStC49CAXt6rjQ_ahjnkvEdPLjLi7kEvdRNJoHQws3EF87sUI1fkMDzgE-JAB853COvE07pxaqGFLkdWVhO-SsErJTuhWnGrBNZeZ5WawAqeeCU67OyKuEC6UoZULHMb_1elbKJv1w",
        "oauthAccessToken": "ya29.a0AfH6SMBKUIzUMaUGjMwFxLABCGT3a7fhlXWheAnwxwonMxHKDNYk7C-PXfqUtYQAeR9V8lb8QBglvAdRd39ghFZXdk2IvY-ZM6xPesaeicEEYKxzOj32CrrfQM9FU7poR-r5Ani5-eWhw015wuNKrKkB5zgE"
    },
    "additionalUserInfo": {
        "providerId": "google.com",
        "isNewUser": false,
        "profile": {
            "name": "Cardin Tiako",
            "granted_scopes": "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
            "id": "109153511831849486655",
            "verified_email": true,
            "given_name": "Cardin",
            "locale": "fr",
            "family_name": "Tiako",
            "email": "cardin.tiako@gmail.com",
            "picture": "https://lh3.googleusercontent.com/a-/AOh14GimadObA7sJaow6LQrxN3IVjnUmah40jlC8O94l=s96-c"
        }
    },
    "operationType": "signIn"
}*/
