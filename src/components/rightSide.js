import styled from "styled-components"; // CEST UN MODULE DE NODE JS

const RightSide = (props) => {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src="/images/feed-icon.svg" />
        </Title>

        <FeedList>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#linkedin</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </FeedList>

      <Recommandation>
        View all Recommandation
        <img src="images/right-icon.svg" />
      </Recommandation>
      </FollowCard>
      <BannerCard>
        <img src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300×250_v1.jpg" />
      </BannerCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside; //NOM donné dans grid template
`;

const FollowCard = styled.div`
  position: relative;
  text-align: center;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 8px;
  background-color: #fff;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 1px rgb(0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
  font-size: 16px;
  justify-content: space-between; //COMME LES AUTRES POUR QUILS SOIT ESPACE
  color: rgba(0, 0, 0, 0.6);
`;

const FeedList = styled.div`
  margin-top: 16px;

  li {
    display: flex; //REND LES ELTS A LINTERIEUR FLEXIBLE
    align-items: center; //ALIGNEMENT VERTICALE
    position: relative;
    margin: 12px 0;
    font-size: 14px;
    /* list-style  : none ; */
    & > div {
      display: flex; //REND LES ELTS A LINTERIEUR DES LI FLEXIBLE
      flex-direction: column; //POSITIONEMENT EN COLONNE
    }
  }

  button {
    box-sizing: border-box; //REGLE LE PADDING ET LE BORDER SUR LA WIDTH BIEN UTILE SUR LE BOUTON
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
    max-height: 32px;
    max-width: 480px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center; // ASSUSER LALIGNEMENT DU TEXTE DANS LE BUTTON
    font-weight: 600px;
    border-radius: 15px;
    padding: 16px;
    outline: none;
  }
`;

const Avatar = styled.div`
  background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;

const Recommandation = styled.a`
  color : #0a66c2;
  display : flex ; 
  align-items : center ; //DEJA CONNU UN POUVOIR ENTRE LES MAINS
  font-size : 14px;
`;
const BannerCard = styled(FollowCard)`
  img{
    width : 100%;
    height : 100%;
  }
`;
export default RightSide;
