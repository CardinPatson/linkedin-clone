const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const http = require("https");

const Realm = require("realm");
const { google } = require("googleapis");

require("dotenv").config();
const PORT = process.env.PORT || 5500;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const REALM_APP_ID = process.env.REALM_APP_ID;
const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oauthConfig = {
	client_id: GOOGLE_CLIENT_ID,
	project_id: GOOGLE_PROJECT_ID,
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_secret: GOOGLE_CLIENT_SECRET,
	redirect_uris: [
		`${BASE_URL}/auth/google/callback`,
		`${BASE_URL}:3002/auth/google/callback`,
		`${BASE_URL}:3002/`,
	],
	JWTsecret: "secret",
	scopes: [
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
		"openid",
	],
};

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
	oauthConfig.client_id,
	oauthConfig.client_secret,
	oauthConfig.redirect_uris[0]
);

//instanciate realm app
const realmApp = new Realm.App({
	id: REALM_APP_ID,
});

//express application
const app = express();

app.set("view engine", "js");
app.set("src", __dirname);
app.use(methodOverride());

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Method",
		"POST, GET, PUT, DELETE, OPTIONS, PATCH"
	);
	next();
});

//generate oauth2 login
//si tu es déja logger , te redirige vers la page d'acceuil
//"https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid&response_type=code&client_id=46744351040-echhs2gb5oqg7flegus68sr9lkpc6acf.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3002%2Fauth%2Fgoogle%2Fcallback"
//https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=6731de76-14a6-49ae-97bc-6eba6914391e&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%2Fmyapp%2F&response_mode=query&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&state=12345
app.get("/", (req, res) => {
	const loginLink = oauth2Client.generateAuthUrl({
		access_type: "offline", //access data without the user constantly giving us consent
		scope: oauthConfig.scopes,
	});

	// http.get(loginLink.data);
	res.send(loginLink);
	// res.redirect("http://localhost:3002/auth/google/callback");

	// res.render("src/app", { loginLink });
});

app.get("/auth/google/callback/", function (req, res, errorHandler) {
	console.log(req.body);
	if (req.query.error) {
		// The user did not give us permission.
		return errorHandler(req.query.error);
	} else {
		console.log(req.query.code);
		const authCodeFromQueryString = req.query.code;
		// :code-block-start: login-with-token
		// Get Google token and use it to sign into Realm
		oauth2Client.getToken(
			authCodeFromQueryString,
			async function (error, token) {
				if (error) return errorHandler(error);
				try {
					const credential = Realm.Credentials.google({
						idToken: token.id_token,
					});
					const user = await realmApp.logIn(credential);
					console.log("signed in as Realm user", user.id);
					return res.render("src/login", { id: user.id }); // :remove:
				} catch (error) {
					errorHandler(error);
				}
			}
		);
		// :code-block-end:
	}
});

app.post("/logout", (req, res) => {
	res.redirect("/");
});
app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}`);
});

//DIFFERENCE PARAM AND QUERY
/**B
 * Given this route

app.get('/hi/:param1', function(req,res){} );
and given this URL http://www.google.com/hi/there?qs1=you&qs2=tube

You will have:

req.query

{
  qs1: 'you',
  qs2: 'tube'
}
req.params

{
  param1: 'there'
}
 */
