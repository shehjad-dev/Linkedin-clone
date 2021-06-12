import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";

function MediaModal(props) {
  return (
    <>
      {props.showMediaModal === "open" && (
        <Container>
          <Content>
            <Header>
              <BloggerInfo>
                <img
                  src={props.bloggerImg ? props.bloggerImg : "/images/user.svg"}
                />
                <div>
                  <span>{props.bloggerName ? props.bloggerName : "Name"}</span>
                  {/* <span>Email</span> */}
                </div>
              </BloggerInfo>
              <button
                onClick={(e, data) => {
                  props.handleMediaClick(e);
                }}
              >
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <MainContent>
              <div>
                <img
                  src={
                    props.mediaResource
                      ? props.mediaResource
                      : "/images/errorimg.png"
                  }
                />
              </div>
            </MainContent>
            <Footer>
              <button>
                <img src="/images/linkedin-like-icon.png" alt="" />
                <img src="images/linkedin-clap-icon.png" alt="" />
                <span>75</span>
              </button>
            </Footer>
          </Content>
        </Container>
      )}
    </>
  );
}

export default MediaModal;

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

const BloggerInfo = styled.div`
  //background-color: red;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    margin-right: 8px;
    border-radius: 50%;
    width: 46px;
    height: 46px;
  }
  div {
    display: flex;
    flex-direction: column;
    span {
      color: rgba(0, 0, 0, 0.8);
      &:first-child {
        font-size: 14px;
      }
      &:nth-child(2) {
        font-size: 12px;
      }
    }
  }
`;

const MainContent = styled.div`
  div {
    /* min-height: px; */
    /* background-color: grey; */
    margin-bottom: 20px;

    img {
      width: 100%;
    }
  }
`;

const Footer = styled.div`
  button {
    background: transparent;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-bottom: 18px;
    img {
      width: 18px;
      height: 18px;
    }
  }
`;
