import React from "react";
import styled from "styled-components";

const Header = (props) => {
  const user = props.location.state;
  return (
    <Container>
      <Content>
        <NavLogo>
          <a>
            <img src="/images/i-blog-logo.svg" alt="" />
          </a>
        </NavLogo>

        <NavLinks>
          <SignupCta href="/signup">{!user ? "Signup" : ""}</SignupCta>

          <LoginCta href={!user ? "/login" : "/login"}>
            {!user ? "Login" : "Logout"}
          </LoginCta>
        </NavLinks>
      </Content>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: #263042;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  //padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
  min-height: 80px;
`;

const Content = styled.div`
  min-height: 100%;
  /* max-width: 1200px; */
  max-width: 1128px;
  margin: 0 auto;
  margin-top: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const NavLogo = styled.div`
  & > a > img {
    width: 130px;
    height: auto;
    margin-left: 8px; //

    @media (max-width: 768px) {
      width: 100px;
    }
  }
`;

const NavLinks = styled.div`
  /* background: lightblue; */
  font-size: 18px;
  margin-right: 25px; //
  height: 100%;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SignupCta = styled.a`
  color: white;
  cursor: pointer;
  text-decoration: none;
  border-radius: 3px;
  /* &:hover {
    color: #263042;
    transition: all 0.3s;
    background: #aeade0;
  } */
`;

const LoginCta = styled.a`
  color: white;
  background: #5c5abb;
  padding: 10px 28px;
  margin-left: 40px;
  cursor: pointer;
  border-radius: 3px;
  text-decoration: none;
  &:hover {
    background: #484794;
    transition: all 0.3s;
  }

  @media (max-width: 768px) {
    margin-left: 22px;
  }
`;
