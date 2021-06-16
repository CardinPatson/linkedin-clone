import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import PostModal from "./postModal";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions"; //On ne precise pas index car c'est la porte d'entré

const Main = (props) => {
  const [showModal, setShowModal] = useState("close"); // pour fermer le post

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
    }
  };

  return (
    <>
      {props.articles.length === 0 ? (
        <p>Aucun article trouvé</p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} />
              ) : (
                <img src="/images/user.svg" />
              )}
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Start a post
              </button>
            </div>

            <div>
              <button>
                <img src="/images/main-photo.svg" />
                <span>Photos</span>
              </button>

              <button>
                <img src="/images/main-video.svg" />
                <span>Video</span>
              </button>

              <button>
                <img src="/images/main-event.svg" />
                <span>Event</span>
              </button>
              <button>
                <img src="/images/main-article.svg" />
                <span>Write article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && <img src="./images/spin-loading.svg" />}

            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    {/* creation de lien wrap inside our SharedActor  */}
                    <a>
                      <img src={article.actor.image} />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="/images/three-dot.svg" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImg && <img src={article.sharedImg} />
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" />
                        <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" />
                        <span>75 </span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments} commments</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    {/**/}
                    <button>
                      <img src="/images/like-icon.svg" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comment-icon.svg" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src="/images/share-icon.svg" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src="/images/send-icon.svg" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>

          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  background-color: #fff;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      img {
        width: 25px;
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
        color: #0a66f8;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: center;
      }
    }
    &:nth-child(2) {
      display: flex; // POUR QUE LES ELTS SOIT SUR LA LIGNE
      flex: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex; //FLEX ENTRE NOTRE A ET LE BUTTON

  a {
    margin-right: 12px;
    flex-grow: 1; // CONTROLLE LA TAILLE DES ELTS LORSQUE LE CONTENEUR PARENT SE DEVELOPPE
    display: flex; //FLEX ENTRE NOTRE IMG ET LA DIV
    overflow: hidden;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      //border : solid red 1px;
      display: flex;
      flex-direction: column;
      //align-items : center;
      flex-grow: 1; //AUGMENTE LA TAILLE DU CONTENEUR
      flex-basis: 0; //SPECIFIE LA TAILLE INITIALE DE ELT AVANT QUE LAJUSTEMENT FLEX GROW ET FLEX SHRINJ
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain; //
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border : none ; 
      background-color : white; 
      cursor : pointer; 
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    border : none ; 
    background-color : white ; 
    img {
      width: 16px;
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
// export default Main;
