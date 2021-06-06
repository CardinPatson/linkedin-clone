import styled from "styled-components";

const Header = (props) => {
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/home-logo.svg" />{" "}
            {/**Provient de l'extension svg search icon */}
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src="/images/search-icon.svg" alt="" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a>
                <img src="/images/nav-home.svg" />
                <span>Home</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-network.svg" />
                <span>My networks</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-jobs.svg" />
                <span>jobs</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-messaging.svg" />
                <span>Messagers</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-notifications.svg" />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a href="">
                <img src="/images/user.svg" />
                <span>Me</span>
                <img src="/images/down-icon.svg" />
              </a>
              <SignedOut>
                {/* Pour qu'au hover il affiche  signed out */}
                <a> Sign Out</a>
              </SignedOut>
            </User>

            <Work>
              <a>
                <img src="/images/nav-work.svg" />
                <span>
                  work
                  <img src="/images/down-icon.svg" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  /* border : solid blue 1px; */
  background: white;
  border-bottom: solid 1px rgba(0, 0, 0, 0.08);
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  padding: 0 24px;
  z-index: 100;
`;

const Content = styled.div`
  /* border : solid red 1px; */
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;
const Logo = styled.span`
  /* border : solid red 1px; */
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative; //car l'icone sera en absolute
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75; // pour plus d'espace
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.div`
  /* border : solid red 1px; */
  width: 40px; //car le padding left de input = 40px
  position: absolute;
  top: 10px;
  left: 2px;
  z-index: 1;
  border-radius: 0 2px 2px 0;
  pointer-events: none; //pour pouvoir enlever le poiteur du cursor
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.15s;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;

  @media (max-width: 768px) {
    //RAMMENER LA NAV MENU EN BAS
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  /* border : solid red 1px; */
  display: flex;
  flex-wrap: nowrap; //POUR QUE LES ELTS DE LA LISTE NE VONT PAS A LA LIGNE
  list-style-type: none; //POUR ENLEVER LES STYLE PAR DEFAUT DE LISTE

  .active {
    //CEUX QUI ONT LA CLASSE ACTIVE DANS LE NAVLISTWRAP
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;
const NavList = styled.li`
  display: flex;
  align-items: center; // CENTRE SUR LA VERTICALE
  a {
    /* border : solid red 1px; */
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column; // POUR QUE LE TEXTE ET LICONE SOIT SUR LA MEME COLONNE
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      min-width: 70px;
    }
  }

  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignedOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  transition-duration: 167ms;
  text-align: center;
  display: none; // POUR QUI APPARAISSE AU HOVER
`;

const User = styled(NavList)`
  //IMPORTE LE STYLE DE NAVLIST

  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${SignedOut} {
      //    SELECTIONNE LE SIGNEOOUT A LINTERIEUR DE USER QUI DOIT ETRE HOVER
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.06);
`;

export default Header;
