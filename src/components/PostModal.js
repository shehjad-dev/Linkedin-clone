import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`Not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    props.postArticle(payload);
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        className="share-vid-link"
                        style={{}}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/post-photo-icon.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/post-video-icon.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareCommment>
                <AssetButton>
                  <img src="/images/post-comment-icon.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareCommment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  color: black;
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  background: white;
  max-width: 552px;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.55;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    /* width: 40px;
    height: 40px; */
    padding: 0;
    background: transparent;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    text-align: center;
    outline: none;
    border: none;
    cursor: pointer;
    /* svg,
    img {
      pointer-events: none;
    } */
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      padding: 0 2px;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;

  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 12px 16px;
  @media (max-width: 376px) {
    padding: 4px 6px;
  }
`;

const AssetButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 60px; */
  height: 60px;
  //background: rgba(0, 0, 0, 0.06);
  /* border: 2px solid black; */
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    min-width: 60px;
    margin-right: 5px;
    img {
      cursor: pointer;
    }
    &:first-child {
      img {
        width: 38px;
        @media (max-width: 768px) {
          width: 30px;
        }
      }
    }
    &:nth-child(2) {
      img {
        width: 44px;
        @media (max-width: 768px) {
          width: 36px;
        }
      }
    }
  }
`;

const ShareCommment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  color: rgba(0, 0, 0, 0.6);
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  img {
    width: 22px;
    height: 22px;
    filter: invert(54%) sepia(8%) saturate(4%) hue-rotate(350deg)
      brightness(90%) contrast(89%);
    margin-right: 5px;
  }
  ${AssetButton} {
    padding: 0 8px;
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 20px;
  border: none;

  color: ${(props) => (props.disabled ? "rgb(127,126,126)" : "white")};
  background: ${(props) => (props.disabled ? "rgb(234,235,234)" : "#0a66c2")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgb(234,235,234)" : "#004182")};
  }
  @media (max-width: 376) {
    padding: 5px 8px;
    font-size: 12px;
    min-width: 30px;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  /* margin: 0 auto; */
  /* min-width: 80%; */
  text-align: center;
  textarea {
    width: 95%;
    min-height: 100px;
    resize: none;
    outline: none;
    border: 1.5px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 8px;
    color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
    margin-bottom: 8px;

    &:focus {
      border: 2px solid #0466c2;
    }
    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
    ::-webkit-scrollbar-thumb {
      background: #0466c2;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #1173d6;
    }
    ::-webkit-scrollbar-track {
      background: #ffffff;
      border-radius: 10px;
      box-shadow: inset 7px 10px 12px #f0f0f0;
    }
  }

  input {
    width: 97.5%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .share-vid-link {
    outline: none;
    border: 1.5px solid rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    //width: 95%;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    &:focus {
      border: 2px solid #0a66c2;
    }
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    margin-top: 20px;
    width: 100%;
  }
  p {
    margin-top: 10px;
    label {
      //background-color: pink;
      cursor: pointer;
      padding: 8px 12px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.8);
      border-radius: 5px;
      border: 2px solid #0a66c2;
      //padding: 8px;
      //margin-top: 20px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
        color: rgba(0, 0, 0, 1);
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
