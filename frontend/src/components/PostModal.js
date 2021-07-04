import { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [tagData, setTagData] = useState("");
  const [postData, setPostData] = useState("");
  const [postCreated, setPostCreated] = useState(false);

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`Not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");

    props.handleCreatePostClick(e);
  };

  const handlePost = () => {
    setPostData({
      caption: editorText,
      user_id: props.user.user_id,
      tag: tagData,
      image_url: shareImage,
    });

    console.log(postData);
    createBlog(postData);
  };

  const handleImageLink = (e) => {
    setShareImage(e.target.value);
  };

  const createBlog = (post) => {
    Axios.post(
      "https://webtechhackathon.herokuapp.com/api/v1/blogs/new",
      post
    ).then((response) => {
      console.log(response);
      setPostCreated(true);
    });
  };

  return postCreated ? (
    <Redirect
      to={{
        pathname: "/",
        state: props.user,
      }}
    />
  ) : (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            {/* <button onClick={(event) => props.handleCreatePostClick(event)}>
              Exit
            </button> */}
            <Header>
              <div>
                <BloggerImg>
                  <img src="/images/user-icon.svg" alt="" />
                </BloggerImg>
                <BloggerDescription>
                  <BloggerName>{props.user.name}</BloggerName>
                  <BloggerEmail>{props.user.email}</BloggerEmail>
                </BloggerDescription>
              </div>
              <ModalCloser onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </ModalCloser>
            </Header>
            <SharedContent>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
              </Editor>
              <div>
                <UploadImage>
                  <input
                    type="text"
                    style={{ padding: "6px 2px" }}
                    placeholder="your image link here"
                    onChange={(e) => handleImageLink(e)}
                  />
                  {/* <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    name="image"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <p>
                    <label htmlFor="file">Add image</label>
                  </p> */}
                  {/* {shareImage && <img src={URL.createObjectURL(shareImage)} />} */}
                </UploadImage>
                <SetTag>
                  {/* <label htmlFor="tags">Choose a tag:</label>

                  <select name="tags" id="tag-id">
                    <option value="fps games">Fps Games</option>
                    <option value="programming ">Programming</option>
                    <option value="machine learning">Machine Learning</option>
                    <option value="tesla">Tesla</option>
                    <option value="rocket science">Rocket Science</option>
                    <option value="cloud computing">Cloud Computing</option>
                    <option value="others">Others</option>
                  </select> */}
                  <input
                    type="text"
                    style={{ padding: "6px 2px" }}
                    placeholder="Your tag here"
                    onChange={(e) => setTagData(e.target.value)}
                  />
                </SetTag>
              </div>
              {shareImage && <img src={shareImage} />}
            </SharedContent>
            <PostBtn onClick={handlePost}>
              <a>Post</a>
            </PostBtn>
          </Content>
        </Container>
      )}
    </>
  );
};

export default PostModal;

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }

  padding: 10px 14px;
  border-bottom: 1.2px solid #dedddd;
  margin-bottom: 8px;
`;

const BloggerImg = styled.a`
  margin-right: 20px;
  & > img {
    width: 45px;
    border: 3.5px solid #4e4d5d;
    border-radius: 50%;

    @media (max-width: 768px) {
      width: 45px;
    }
  }
`;

const BloggerDescription = styled.div``;

const BloggerName = styled.a`
  font-size: 18px;
`;

const BloggerEmail = styled.div`
  font-size: 14px;
`;

const ModalCloser = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    padding: 0 2px;
    /* transition: all 0.07s; */
  }
`;

const SharedContent = styled.div`
  padding-bottom: 12px;

  & > div {
    display: flex;
    justify-content: space-around;
  }

  & > img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    margin-top: 10px;
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
    color: #263042;
    font-size: 14px;
    margin-bottom: 8px;

    &:focus {
      border: 2px solid #5c5abb;
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
`;

const UploadImage = styled.div`
  text-align: center;
  p {
    padding: 8px;
    & > label {
      color: #263042;
      background-color: white;
      padding: 8px;
      margin: 0 auto;
      border: 2px solid #5c5abb;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: #f5f5f5;
      }
    }

    @media (max-width: 460px) {
      padding: 4px 6px;
      font-size: 14px;
    }
  }

  img {
    margin-top: 12px;
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const SetTag = styled.div`
  & > #tag-id {
    padding: 6px 8px;
    border: 2px solid #5c5abb;
    border-radius: 6px;
    outline: none;
    @media (max-width: 460px) {
      padding: 4px 6px;
    }
  }

  & > label {
    @media (max-width: 460px) {
      font-size: 14px;
    }
  }
`;

const PostBtn = styled.div`
  padding: 10px 0;
  margin: 10px 0 20px 0;

  text-align: center;
  & > a {
    background-color: #5c5abb;
    color: white;
    padding: 14px 24px;
    margin: 0 auto;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
      background: #484794;
      transition: all 0.3s;
    }
  }
`;
