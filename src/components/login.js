import styled from "styled-components"; // APRES AVOIT INSTALLER NOS COMPONENTS ( NPM INSTALL STYLED-COMPONENTS )

import { connect } from "react-redux";
//NOTE : NOTRE FONCTION VA NOUS RENVOYER DU JSX ATTENTION LE JSX DOIT RETOURNER UNE SEUL BALISE AVEC LES ENFANTS IMBRIQUE A LINTERIEUR

import { signInAPI } from "../actions";
//EN JSX ON NE PEUT PAS UTILISER LE MOT CLASS DANS LE HTML :  CEST UN MOT RESERVE EN JS UTILISER PLUTOT (CLASSNAME)

import { Redirect } from "react-router";
const Login = (props) => {
  return (
    <Container>
      {props.user && <Redirect to="/home" />}
      <Nav>
        <a href="/">
          {/*Nous permet de mettre des commentaires sur des blocs */}
          <img src="/images/login-logo.svg"></img>
        </a>
        <div>
          <Join>Join now</Join>
          <Sign onClick={() => props.signIn()}>Sign in</Sign>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professionnal community</h1>
          <img src="/images/login-hero.svg"></img>
        </Hero>
        <Form>
          <Google onClick={() => props.signIn()}>
            <img src="/images/google.svg" alt=""></img>
            Sign in with Google
          </Google>
        </Form>
      </Section>
    </Container>
  ); //va nous servir dans le router de notre app.js
};
const Container = styled.div`
  padding: 0px;
`; //On peut déclarer des styles à l'intérieur grace à la bibliotheque préinstaller styled-components

const Nav = styled.nav`
  max-width: 1168px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  //border : solid red 1px;

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      paddiing: 120px 50px;
    }
  }
`;

//align-items to have a vertical align de nos elt aà l'interieur
//&>a  :: tous ce qui est a l'interieur du  tag a
//& definit l'element actuelle ou on se trouve

const Join = styled.a`
  text-decoration: none;
  font-size: 20px;
  padding: 10px 16px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;

const Sign = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  font-size: 16px;
  transition-duration: 167ms;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;

  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

//remarque le box-shadow et le border radius qui ont fait la forme du button

const Section = styled.section`
  /* border : solid red 1px; */
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1168px;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;
//flex-wrap demande d'aller a la ligne au elt qui ne peuvent pas va nous servir pour le media de la page principale

const Hero = styled.div`
  width: 100%;
  h1 {
    width: 55%;
    min-height: 0;
    font-weight: 200;
    color: #2977c9;
    font-size: 56px;
    line-height: 70px;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }

  img {
    /* z-index : -1;  */
    width: 700px;
    height: 670px;
    position: absolute; // ENLEVE DU FLUC NORMAL (LES AUTRES ELTS LIGNORENT )
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 230px;
      position: initial;
      width: initial;
      height: initial;
    }
  }
`;
//Le media c'est pour les téléphones
//le z-index sur l'image pour que le texte soit toujours au dessus

const Form = styled.div`
  /* border : solid red 1px; */
  margin-top: 100px;
  width: 500px;

  @media (max-width: 768px) {
    margiin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center; //si flex-direction sur la row aligne sur l'horizontale
  background-color: #fff;
  align-items: center; // si flex-direction en row , align sur la vertical
  width: 100%;
  height: 56px;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%),
    inset 0 0 0 1px rgb(0 0 0 / 0%);

  /**BOX SHADOW INSET NOUS PERMET DAVOIR UN EFFET INTERIEUR SUR LES BORDURE */
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

const mapStateToProps = (state) => {
  return {
    user : state.userState.user, //user sera accessible dans notre composant via props.user et state.userState.user
  };
};


//TODO: Use google authentification with atlas mongo db realm instead of firebase authentication
//COMMENT FIREBASE AUTHENTIFICATION AND SET UP OAUTH

// dispatch = envoie (cest le repartisseur daction) ; quand on clique sur le signin de googel , 
const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()), //signIn sera utilisé dans notre composant via props.signIn()
});

// const mapDispatchToProps = (dispatch)=>{
//   return {
//     signIn : ()=> dispatch(signInAPI())
//   }
// }
export default connect(mapStateToProps, mapDispatchToProps)(Login); 

// la fonction connect a été importé de redux , 
//le nouveau login component sera donc la connexion entre le mapStateToProps et le mapDispatchToProps sur le login




//export default Login // POUR POUVOIR UTILISER LA FONCTION LOGIN DANS LES AUTRES FICHIERS
