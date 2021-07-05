import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import Axios from "axios";

const Blog = (props) => {
  const [userUpdatedVote, setUserUpdatedVote] = useState(false);
  let new_vote_count = 1;

  const voteIncrement = (vote_count, blog_id) => {
    //Increment vote count
    new_vote_count = vote_count * 1 + 1;

    const vote = { vote_count: new_vote_count, blog_id: blog_id };
    setUserUpdatedVote(new_vote_count);
    Axios.get(
      "https://webtechhackathon.herokuapp.com/api/v1/blogs/vote",
      vote
    ).then((response) => {
      console.log(response.data);
    });
    //api request to store vote count in sql
  };
  return (
    <PostContainer key={props.blog.blog_id}>
      <PostHeader>
        <BloggerImg>
          <img src="/images/user-icon.svg" alt="" />
        </BloggerImg>
        <BloggerDescription>
          <BloggerName>{props.blog.name}</BloggerName>
          <BloggerEmail>{props.blog.email}</BloggerEmail>
        </BloggerDescription>
      </PostHeader>
      <PostDescription>
        <div>{props.blog.caption}</div>
      </PostDescription>
      <PostImage>
        <img src={props.blog.image_url} alt="" />
      </PostImage>
      <PostFooter>
        <Postcharacteristics>
          <ul>
            <li>
              {userUpdatedVote ? userUpdatedVote : props.blog.vote_count} votes
            </li>
            <li>{props.blog.tag}</li>
            <li>{props.blog.time_to_read}</li>
          </ul>
        </Postcharacteristics>
        <VoteButton>
          <button
            className={!props.user ? "disable-effect" : ""}
            onClick={(event) =>
              !props.user
                ? console.log("disabled")
                : voteIncrement(
                    new_vote_count === 1
                      ? props.blog.vote_count
                      : new_vote_count,
                    props.blog.blog_id
                  )
            }
          >
            <i className="far fa-hand-peace"></i> <span>Vote</span>
          </button>
        </VoteButton>
      </PostFooter>
    </PostContainer>
  );
};

export default Blog;

const Container = styled.div`
  /* background: pink; */
  /* margin-top: 80px; */
  max-width: 100%;
  min-height: 700px;
`;

const HeroLine = styled.div`
  //background-color: grey;
  text-align: center;
  margin-top: 100px;
  font-size: 18px;
  color: #263042;
`;

const Content = styled.div`
  //background-color: chartreuse;
  min-height: 100%;
  max-width: 1128px;
  margin: 0 auto;
  /* padding-top: 20px; */
  /* margin: 0 auto; */
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 500px;
  padding: 8px 16px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const MainContent = styled.div`
  /* background-color: pink; */
  /* padding: 8px 5px; */
  /* height: 600px; */
  min-width: 60%;
  max-width: 75%;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const PostContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  /* min-height: 480px; */
  border: 1px solid rgba(106, 94, 94, 0.29);
  box-shadow: 0px 13px 40px 7px rgba(93, 91, 188, 0.09);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding-bottom: 20px;
  }
`;

const RightContent = styled.div`
  //background-color: orange;
  max-height: 100px;
  min-width: 20%;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const PostHeader = styled.div`
  /*  background-color: lightblue; */
  padding: 0 18px;
  padding-top: 14px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1.2px solid #dedddd;
`;

const BloggerImg = styled.a`
  /* background-color: red; */
  margin-right: 20px;
  & > img {
    width: 55px;
    border: 3.5px solid #4e4d5d;
    border-radius: 50%;

    @media (max-width: 768px) {
      width: 45px;
    }
  }
`;

const BloggerDescription = styled.div`
  display: flex;
  flex-direction: column;
  color: #4e4d5d;
`;

const BloggerName = styled.a`
  font-size: 18px;
  font-weight: bold;
  /* line-height: 1.5rem; */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const BloggerEmail = styled.a`
  font-size: 14px;
  margin-top: 3px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const PostDescription = styled.div`
  color: #263042;
  padding: 14px 18px;
  font-size: 16px;
  line-height: 1.2rem;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;

  @media (max-width: 768px) {
    padding: 4px;
    flex-direction: column;
  }
`;

const Postcharacteristics = styled.div`
  & > ul {
    color: #8e8cb8;
    display: flex;
    flex-direction: row;
    padding: 20px 35px;
    li {
      margin-right: 40px;
    }

    @media (max-width: 768px) {
      align-items: center;
      justify-content: center;
      padding: 12px 8px;
      font-size: 14px;
      margin: 0 auto;
    }

    @media (max-width: 500px) {
      align-items: center;
      font-size: 12px;
      padding: 6px 4px;

      li {
        margin-right: 20px;
      }
    }
  }
`;

const VoteButton = styled.div`
  margin-top: 10px;
  & > .disable-effect {
    background-color: lightgrey;
    color: darkgrey;
    cursor: not-allowed;

    &:hover {
      background-color: lightgrey;
      color: darkgrey;
      cursor: not-allowed;
    }
  }
  & > button {
    outline: none;
    border: none;
    background-color: #5c5abb;
    color: white;
    padding: 12px 22px;
    margin-right: 18px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background: #484794;
      transition: all 0.3s;
    }

    @media (max-width: 768px) {
      margin: 0 auto;

      padding: 10px 20px;
    }

    @media (max-width: 374px) {
      margin: 0 auto;

      padding: 10px 20px;
    }
  }
`;

const CreatePostbtn = styled.a`
  /* width: 100%; */
  cursor: pointer;
  padding: 14px 20px;
  color: #263042;
  /* font-weight: bold; */
  text-align: center;

  background-color: #d6d5e5;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  border: 2.5px solid #d6d5e5;
  &:hover {
    background-color: #e2e1f4;
    color: #263042;
    transition: all 0.3s;
    border: 2.5px solid #263042;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    justify-content: center;
    padding: 10px 18px;

    & > span {
      margin-right: 8px;
    }
  }
`;
