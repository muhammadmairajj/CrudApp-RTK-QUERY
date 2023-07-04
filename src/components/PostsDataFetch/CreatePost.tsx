import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useCreatePostMutation, useGetAllPostsQuery } from "../../services/posts";
import { useNavigate } from "react-router-dom";
import "./style.css";

// interface Props {
//     postId: number;
//   }

const CreatePost = () => {
  const [posts, setPosts] = useState({
    title: "",
    body: "",
  });

  const navigate = useNavigate();

  const [createPost] = useCreatePostMutation();
    const { data } = useGetAllPostsQuery();
  console.log("data:::::::", data);
  //   DeStructuring
  const { title, body } = posts;
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosts({...posts, [event.target.name]: event.target.value});
  };

  console.log("title", posts);

  const handleSubmit = () => {
    const createPostData = {
      id: generateUniqueID,
      title: title,
      body: body,
    };
    console.log("createPostData::::", createPostData);
    createPost(createPostData);

    navigate("/posts");
  };
  const generateUniqueID = () => {
    const existingIDs = data ? data.map((post) => post.id) : [];
    let newID = Math.floor((Math.random()*1000) + 1);

    while (existingIDs.includes(newID)) {
      newID = Math.floor((Math.random()*1000) + 1);
    }

    return newID;
  };

  return (
    <>
      <h1>Post Data Create</h1>
      <Form onSubmit={handleSubmit}>
        <Row lg={24} xs={24}>
          <Col lg={8}>
            {/* <Form.Group className="mb-3" controlId="formGroupId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                name="id"
                placeholder="Enter Id"
                value={id}
                onChange={onInputChange}
              />
            </Form.Group> */}
          </Col>
          <Col lg={8}>
            <Form.Group className="mb-3" controlId="formGroupTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={title}
                onChange={onInputChange}
              />
            </Form.Group>
          </Col>
          <Col lg={8}>
            <Form.Group className="mb-3" controlId="formGroupBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Body"
                name="body"
                value={body}
                onChange={onInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Create Post Data
        </Button>
        &nbsp; &nbsp;
        <Button variant="success" onClick={() => navigate(-1)}>
          Back To Home
        </Button>
      </Form>
    </>
  );
};

export default CreatePost;
