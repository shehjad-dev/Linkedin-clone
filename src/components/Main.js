import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PostModal from "./PostModal";
import MediaModal from "./MediaModal";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";
import React from "react";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  //redo
  const [showMediaModal, setShowMediaModal] = useState("close");
  const [mediaResource, setMediaResource] = useState("./images/user.svg");
  const [bloggerName, setBloggerName] = useState("Name");
  const [bloggerImg, setBloggerImg] = useState("./images/user.svg");

  //end
  useEffect(() => {
    props.getArticles();
  }, []);

  //redo
  const handleMediaClick = (e) => {
    e.preventDefault();
    switch (showMediaModal) {
      case "open":
        setShowMediaModal("close");
        break;
      case "close":
        setShowMediaModal("open");
        break;
      default:
        setShowMediaModal("close");
        break;
    }

    switch (mediaResource) {
      case "./images/user.svg":
        setMediaResource(e.target.src);
        break;
      default:
        setMediaResource(e.target.src);
        break;
    }

    switch (bloggerImg) {
      case "Name":
        setBloggerImg(
          e.target.parentElement.parentElement.parentElement.parentElement
            .firstChild.firstChild.firstChild.src
        );
        break;
      default:
        setBloggerImg(
          e.target.parentElement.parentElement.parentElement.parentElement
            .firstChild.firstChild.firstChild.src
        );
        break;
    }

    switch (bloggerName) {
      case "Name":
        setBloggerName(
          e.target.parentElement.parentElement.parentElement.parentElement
            .firstChild.firstChild.lastChild.firstChild.innerHTML
        );
        break;
      default:
        setBloggerName(
          e.target.parentElement.parentElement.parentElement.parentElement
            .firstChild.firstChild.lastChild.firstChild.innerHTML
        );
        break;
    }

    /* console.log(
      e.target.parentElement.parentElement.parentElement.parentElement
        .firstChild.firstChild.lastChild.firstChild.innerHTML
    ); */
  };
  //end

  const handleClick = (e) => {
    e.preventDefault();

    /*     if (e.target !== e.currentTarget) {
      return;
    } */

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      {props.articles.length === 0 ? (
        <p>There are no articles</p>
      ) : (
        <Container>
          <ShareBox>
            {/* Share */}
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
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
                <img src="/images/photo-icon.svg" alt="" />
                <span>Photo</span>
              </button>

              <button>
                <img src="/images/video-icon.svg" alt="" />
                <span>Video</span>
              </button>

              <button>
                <img src="/images/event-icon.svg" alt="" />
                <span>Event</span>
              </button>

              <button>
                <img src="/images/article-icon.svg" alt="" />
                <span>Write article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && <img src="/images/spinning-icon.svg" alt="" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="/images/ellipsis.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImage>
                    <button onClick={handleMediaClick}>
                      <a>
                        {!article.sharedImg && article.video ? (
                          <ReactPlayer width={"100%"} url={article.video} />
                        ) : (
                          article.sharedImg && <img src={article.sharedImg} />
                        )}
                      </a>
                    </button>
                  </SharedImage>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src="/images/linkedin-like-icon.png" alt="" />
                        <img src="images/linkedin-clap-icon.png" alt="" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments} comments</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src="/images/like-icon.svg" alt="" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comment-icon.svg" alt="" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img src="/images/share-icon.svg" alt="" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src="/images/send-icon.svg" alt="" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
          <MediaModal
            showMediaModal={showMediaModal}
            handleMediaClick={handleMediaClick}
            mediaResource={mediaResource}
            bloggerImg={bloggerImg}
            bloggerName={bloggerName}
          />
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
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
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
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 4px 16px;

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }

      button {
        margin: 4px 0;
        flex-grow: 1;

        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
        cursor: pointer;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
          width: 38px;
          height: 38px;
        }
        span {
          color: #70b5f9;
        }

        @media (max-width: 500px) {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          justify-items: center;
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
  display: flex;
  align-items: center;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    //align-items: center;
    img {
      width: 48px;
      height: 48px;
      //border-radius: 50%;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;
        &:first-child {
          font-size: 15px;
          line-height: 1.4;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(2) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(3) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 8px;
    //font-size: 10px;

    top: 3px;
    background: transparent;
    border: none;
    outline: none;
    border-radius: 50%;
    min-height: 35px;
    min-width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  font-size: 14px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  text-align: left;
  line-height: 1.33;
`;

const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  button {
    padding: 0;
    margin: 0;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
  }
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  list-style: none;
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;

  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
      align-items: center;
      background: transparent;
      outline: none;
      border: none;
      //font-size: 14px;
    }

    &:nth-child(2) {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  li > button {
    //font-size: 18px;
  }

  li > button > img {
    width: 18px;
    height: 18px;
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    color: #0a66c2;
    padding: 8px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    //background: pink;
    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
      border-radius: 4px;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;

      img {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 80px;
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
