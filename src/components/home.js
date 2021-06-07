import styled from "styled-components";
import Main from "./main";
import RightSide from "./rightSide";
import LeftSide from "./leftSide";

const Home = (props) => {
  return (
    <Container>
      <Section>
        <h5>
          {" "}
          <a>Copyright?- </a>{" "}
        </h5>
        <p>
          Made By Patson with cleverProgrammer the super Fullstack developper
        </p>
      </Section>
      {/* CONSTRUCTION DES 03 PARTIES LEFT MIDDLE RIGHT  */}
      <Layout>
        <LeftSide />
        <Main />
        <RightSide />
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  /* border : solid red 1px; */
  padding-top: 52px;
  max-width: 100%; // Aura la taille de son conteneur
`;
const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`;
const Section = styled.section`
  /* border : solid red 1px; */
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;

  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #436449;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  /* border : solid red 1px; */
  display: grid;
  grid-template-areas: "leftside main rightside"; //VA CREER 03 PARTIE ET LES NOMME AVEC LES NOMS DONNES
  /* max-width : 100%; */
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(0, 7fr); //APPLIQUE UNE LARGEUR MIN ET MAX A NOS COLONNES fr EST UNE UNITE DE FRACTION DE LA LIGNES
  column-gap: 25px;
  row-gap: 25px; //ESPACE ENTRE LES LIGNES DES GRILLES
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
export default Home;
