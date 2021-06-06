import styled from "styled-components";

const LeftSide = (props) => {
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo />
            <Link>Welcome there!</Link>
          </a>
          <a>
            <AddPhotoText>Add a photo</AddPhotoText>
          </a>
        </UserInfo>

        <Widget>
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src="/images/widget-icon.svg" />
          </a>
        </Widget>

        <Item>
          <span>
            <img src="/images/item-icon.svg" />
            My incredible item
          </span>
        </Item>
      </ArtCard>
      <CommunityCard>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src="/images/plus-icon.svg" />
          </span>
        </a>
        <a>
          <span>Folow hastags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </CommunityCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside; // LE NOM QUI LON A DONNE A NOTRE GRID TEMPLATE
`;
const ArtCard = styled.div`
  text-align: center;
  background-color: #fff;
  overflow: hidden;
  margin-bottom: 8px;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 1px rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word; //ACHERCHER
  word-break: break-word;
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0; // POUR ENLEVER LA MARGE ET QUELLE SADAPTE SUR TOUT LE DESSUS
`;

const Photo = styled.div`
  box-sizing: border-box;
  box-shadow: none;
  background-image: url("/images/photo.svg");
  width: 72px;
  height: 72px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
  background-clip: content-box; //DETERMINE LA ZONE QUI SERA COLORE
  background-size: 60%;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const AddPhotoText = styled.div`
  /* border : solid red 1px; */
  color: #0a66c2;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
`;

const Widget = styled.div`
  border-bottom: solid 1px rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between; //IMAGE ET LA DIV A LINTERIEUR
    align-items: center;
    padding: 4px 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left; // POUR METTRE LE TEXT A LINTERIEUR A LA MEME POSITION
      span {
        font-size: 14px;
        line-height: 1.4;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }

  svg {
    color: rgba(0, 0, 0, 1);
  }
`;

const Item = styled.a`
  display: block; // SINON LES TEXT ALIGN ET LE PADDING NE MARCHERA PAS
  font-size: 12px;
  text-align: left;
  padding: 12px;

  span {
    display: flex;
    align-items: center; //POUR AVOIR LIMAGE ET LE TEXT ALIGNER
    color: rgba(0, 0, 0, 1);
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const CommunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;

  a {
    /* border : solid red 1px; */
    color: black;
    padding: 4px 12px;
    font-size: 12px;
    /* LE & DANS UNE PROPRIETE CSS ICI FAIT REFERENCE A ELLE MEME  */
    &:hover {
      color: #0a66c2;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

export default LeftSide;
