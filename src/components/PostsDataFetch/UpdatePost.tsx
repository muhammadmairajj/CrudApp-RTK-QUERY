import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useGetPostByIdQuery, useUpdatePostMutation } from "../../services/posts";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

// interface Props {
//     postId: number;
//   }

const UpdatePost = () => {
  const { id }: any = useParams();
  console.log("id:::::::", id);

  const [updatePost] = useUpdatePostMutation();
  const { data } = useGetPostByIdQuery(id);
  console.log("data::::::::", data);

  const navigate = useNavigate();

  const [posts, setPosts] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (data) {
      setPosts({
        title: data?.title,
        body: data?.body,
      });
    }
  }, [data]);

  //   DeStructuring
  const {title, body} = posts;
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosts({...posts, [event.target.name]: event.target.value});
  };
  console.log("posts", posts);

  const handleSubmit = () => {
    const updateData = {
      id: id,
      title: title,
      body: body,
    };
    console.log("updateData::::", updateData);
    updatePost(updateData);

    // updatePost({
    //   id: id,
    //   data: {
    //     title: title,
    //     body: body
    //   }
    // })
    navigate("/posts");
  };

  return (
    <>
      <h1>Post Data Update</h1>
      <Form onSubmit={handleSubmit}>
        <Row lg={24} xs={24}>
          <Col lg={8}>
            <Form.Group className="mb-3" controlId="formGroupId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                name="id"
                value={id}
                onChange={onInputChange}
              />
            </Form.Group>
          </Col>
          <Col lg={8}>
            <Form.Group className="mb-3" controlId="formGroupTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
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
                name="body"
                value={body}
                onChange={onInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Update Post Data
        </Button>
        &nbsp; &nbsp;
        <Button variant="success" onClick={() => navigate(-1)}>
          Back To Home
        </Button>
      </Form>
    </>
  );
};

export default UpdatePost;
