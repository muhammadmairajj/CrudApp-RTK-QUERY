import {FunctionComponent} from "react";
import {useGetAllPostsQuery, useDeletePostMutation} from "../../services/posts";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const PostsDataFetch: FunctionComponent = () => {
  // const responseInfo = useGetAllPostsQuery();
  // console.log("Response Information -->", responseInfo);
  const {data, isLoading, error} = useGetAllPostsQuery();
  const [deletePost] = useDeletePostMutation();

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Link href="#">
          Error has occurred: TypeError: Failed to fetch
        </Alert.Link>
        .
      </Alert>
    );
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
      <h1>Post Data Fetch By RTK QUERY</h1>
      <div className="new_create_post">
        <Link to="/createPost">
          <Button variant="primary">New Post Create</Button>
        </Link>
      </div>
      <br />
      <Table bordered hover striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any) => {
            return (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.title}</td>
                <td>{item?.body?.slice(0, 20)}</td>
                <td>
                  <Link to={`/posts/${item?.id}`}>
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                  &nbsp; &nbsp;
                  <Link to={`/posts/edit/${item?.id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  &nbsp; &nbsp;
                  <Link to="" onClick={() => deletePost(item?.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PostsDataFetch;
