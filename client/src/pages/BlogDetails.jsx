import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BlogDetails() {

  const { id } = useParams();

  const [post, setPost] = useState(null);


  useEffect(() => {

    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);


  if (!post) {
    return <h2>Loading...</h2>;
  }


  return (
    <div className="container">

      <h1>{post.title}</h1>

      <p>{post.content}</p>

      <small>
        {post.created_at}
      </small>

    </div>
  );
}

export default BlogDetails;