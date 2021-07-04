import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
});

const FormSignup = () => {
  const [userSigned, setuserSigned] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    /* console.log(data); */
    Axios.post(
      "https://webtechhackathon.herokuapp.com/api/v1/users/signup",
      data
    ).then((response) => {
      console.log(response);
      setuserSigned(true);
    });
  };
  return userSigned ? (
    <Redirect to="/login" />
  ) : (
    <Container>
      <LoginBox>
        <Header>
          <a>
            <img src="/images/i-blog-logo.svg" alt="" />
          </a>
        </Header>
        <MainContent onSubmit={handleSubmit(submitForm)}>
          <InputGroupWrongMessage>
            <div>Email or Password is wrong, try again.</div>
          </InputGroupWrongMessage>
          <InputGroup>
            <input
              type="text"
              name="name"
              placeholder="Username"
              ref={register}
            />
          </InputGroup>
          <InputGroupValidMessage>
            <div>{errors.username?.message}</div>
          </InputGroupValidMessage>
          <InputGroup>
            <input
              type="text"
              name="email"
              placeholder="Email"
              ref={register}
            />
          </InputGroup>
          <InputGroupValidMessage>
            <div>{errors.email?.message}</div>
          </InputGroupValidMessage>
          <InputGroup>
            <input
              type="password"
              name="password"
              placeholder="Password"
              ref={register}
            />
          </InputGroup>
          <InputGroupValidMessage>
            <div>{errors.password?.message}</div>
          </InputGroupValidMessage>

          <LoginBtn>
            <input type="submit" value="Signup" />
          </LoginBtn>
        </MainContent>
        <FooterContent>
          <SignupMsg>
            <p>Already have an account?</p>

            <a href="/login">Login</a>
          </SignupMsg>
        </FooterContent>
      </LoginBox>
    </Container>
  );
};

export default FormSignup;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #263042;
`;

const LoginBox = styled.div`
  border-radius: 10px;
  width: 100%;
  background: white;
  max-width: 552px;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  /* top: 10vh; */
  /* margin: 0 auto; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Header = styled.div`
  /* background: aqua; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;

  & > a > img {
    width: 130px;
    height: auto;
    margin-top: 35px;
    @media (max-width: 768px) {
      width: 100px;
      margin-top: 20px;
    }
  }
`;

const MainContent = styled.form`
  //background: chartreuse;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  min-height: 200px;
`;
const InputGroup = styled.div`
  //background: chocolate;

  width: 100%;
  text-align: center;
  padding: 10px 0;
  & > input {
    color: #263042;
    /* #5C5ABB */

    ::placeholder {
      color: #bbbae9;
    }
    outline: none;
    border: none;
    padding: 4px 0;
    margin: 5px 0;
    width: 80%;
    font-size: 16px;
    border-bottom: 2px solid #6b69ce;
    &:focus {
      border: none;
      outline: none;
      border-bottom: 2px solid #6b69ce;
    }
  }
`;

const InputGroupValidMessage = styled.div`
  padding: 8px 0;
  //background: cornflowerblue;
  width: 100%;
  //visibility: hidden;

  & > div {
    color: #c7954b;
    //background: cornsilk;
    width: 80%;
    text-align: center;
    margin: 0 auto;
  }
`;

const InputGroupWrongMessage = styled.div`
  padding: 8px 0;
  //background: cornflowerblue;
  width: 100%;
  visibility: hidden;
  & > div {
    border: 1.4px solid #c7954b;
    padding: 8px 0;
    color: #c7954b;
    //background: cornsilk;
    width: 80%;
    text-align: center;
    margin: 0 auto;
  }
`;

const LoginBtn = styled.div`
  //background: blue;
  width: 100%;
  text-align: center;
  margin: 8px 0;
  padding: 8px 0;

  & > input {
    background: #5c5abb;
    outline: none;
    border: none;
    color: white;
    padding: 10px 22px;
    min-width: 140px;
    font-size: 25px;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: #484794;
      transition: all 0.3s;
    }

    @media (max-width: 768px) {
      font-size: 20px;
      min-width: 120px;
      padding: 10px 22px;
    }
  }
`;

const FooterContent = styled.div`
  //background: red;
  padding: 8px 0;
  /* text-align: center; */
`;

const SignupMsg = styled.div`
  //background: chartreuse;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 38px;
  font-size: 18px;
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
  & > p {
    margin-right: 5px;
    color: #263042;
  }

  & > a {
    color: #5c5abb;
    cursor: pointer;
    line-height: 1.2rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;
