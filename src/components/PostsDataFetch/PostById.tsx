import {useState} from "react";
import {useGetPostByIdQuery} from "../../services/posts";
import {useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Alert from 'react-bootstrap/Alert';

const PostById = () => {
  const { id }: any = useParams();
  const {data, error, isLoading} = useGetPostByIdQuery(id);
  const [readBtn, setReadBtn] = useState<Boolean>(true);
  // console.log("data", data);

  const maxLength = 20;
  const text = data?.body;
  // if (maxLength >= text.length) {
  //   return <span>{text}</span>;
  // }

  if (error) {
    return (
      <Alert variant="danger">
      <Alert.Link href="#">Error has occurred: TypeError: Failed to fetch</Alert.Link>. 
    </Alert>
    )
  }

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div>
      <Card style={{width: "100%"}}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Title: {data?.title}</Card.Title>
          <Card.Text>
            <span>
              {readBtn ? `${text?.substr(0, maxLength).trim()} ... ` : text}
              <br />
              {readBtn ? (
                <Button variant="primary" onClick={() => setReadBtn(false)}>
                  Read More
                </Button>
              ) : (
                <Button variant="danger" onClick={() => setReadBtn(true)}>
                  Read Less
                </Button>
              )}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostById;
