import styled from "styled-components";
import { connect } from "react-redux";
import { signOutAPI } from "../actions";

const Header = (props) => {
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/home-logo.svg" alt="" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src="/images/search-icon.svg" />
          </SearchIcon>
        </Search>

        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a>
                <img src="/images/nav-home.svg" alt="" />
                <span>Home</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-network.svg" alt="" />
                <span>My network</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-jobs.svg" alt="" />
                <span>Jobs</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-messaging.svg" alt="" />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-notifications.svg" alt="" />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>
                  Me
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>

              <SignOut onClick={() => props.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>

            <Work>
              <a>
                <img src="/images/nav-work.svg" alt="" />
                <span>
                  Work
                  <img src="/images/down-icon.svg" alt="" />
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
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  //padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;

  min-height: 100%;
  max-width: 1128px;

  //padding-top: 4px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  @media (max-width: 768px) {
    margin-left: 12px;
    margin-top: 3px;
    margin-bottom: 3px;
  }
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;

  & > div {
    max-width: 280px;
    input {
      border: 1.2px solid #dce6f1;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      //border-color: #dce6f1;
      vertical-align: text-top;

      &:focus {
        outline-color: #0a66c2;
      }
    }
  }

  @media (max-width: 768px) {
    margin-top: 3px;
    margin-bottom: 3px;
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
    border-top: 1.4px solid rgba(0, 0, 0, 0.12);
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style: none;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      //transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    cursor: default;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      transition: 1.67ms;
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
        transition: 1.67ms;
      }
    }
  }

  &:nth-child(4) {
    @media (max-width: 420px) {
      display: none;
    }
  }
  &:nth-child(3) {
    @media (max-width: 321px) {
      display: none;
    }
  }
`;

const SignOut = styled.div`
  /* position: absolute;
  top: 45px;  */
  background: white;
  border-radius: 0 0 5px 5px;
  border: 1.5px solid rgba(0, 0, 0, 0.1);
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  box-shadow: 0px 6px 18px -7px rgba(113, 113, 113, 0.69);
  -webkit-box-shadow: 0px 6px 18px -7px rgba(113, 113, 113, 0.69);
  -moz-box-shadow: 0px 6px 18px -7px rgba(113, 113, 113, 0.69);
  @media (max-width: 768px) {
    width: 75px;
    font-size: 14px;
    box-shadow: -1px -3px 20px 1px rgba(113, 113, 113, 0.5);
    -webkit-box-shadow: -1px -3px 20px 1px rgba(113, 113, 113, 0.5);
    -moz-box-shadow: -1px -3px 20px 1px rgba(113, 113, 113, 0.5);
  }
`;

const User = styled(NavList)`
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
    img {
      @media (max-width: 768px) {
        transform: rotate(180deg);
      }
    }
  }

  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
      position: absolute;
      top: 45px;
      border-radius: 0 0 5px 5px;
      @media (max-width: 768px) {
        position: absolute;
        top: -35px;
        right: 1vw;
        border-radius: 5px 5px 0 0;
      }
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  @media (max-width: 768px) {
    display: none;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
