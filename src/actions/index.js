import { auth, provider } from "../firebase";

export function signInAPI() {
  return (dispatch) => {
    //quand le firebase va repondre : then
    auth
      .signInWithPopup(provider)  
      //notre payload sera un objet contenant tous les informations sur l'utilisateur son mail , photo .. que l'on utilisera dans notre application 
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

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