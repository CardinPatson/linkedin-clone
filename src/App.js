import { BrowserRouter as Router, Switch, Route } from "react-router-dom" //NOUS SERT A UTILISER LES BALISES ROUTER SWITCH ROUTE
import './App.css';
import Login from './components/login'  //IMPORT LA FONCTION EXPORTER DANS login
import Home from './components/home'
import Header from './components/header'


//LE NOM DE LA FONCTION EN JSX DOIT TOUJOURS COMMENCE PAR UNE MAJ
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {/* Ce path est le chemin de debut de notre application */}
             <Login />

             {/* <Login /> va nous afficher le return de la fonction Login dans le login.js */}

             {/** LA SYNTAXE <LOGIN /> EST UNE BALISE NON FERMENTE EN JSX QUI PEUT ETRE APPLIQUER A TOUTE LES BALISES CELA DANS LE BUT DE NE RIEN INCLURE DANS NOTRE BALISE RENDU */}
             
             {/** APPLIQUER CETTE SYNTAXE A TOUTE LES BALISES NON FERMENTE DU HTML */}

          </Route>
          <Route path = "/home">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
