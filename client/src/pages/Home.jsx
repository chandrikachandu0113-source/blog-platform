import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">

      <h1>My Blog</h1>

      {posts.length === 0 ? (
        <p>No blog posts available</p>
      ) : (
        posts.map((post) => (
          <div className="blog-card" key={post.id}>

            <h2>{post.title}</h2>

            <p>{post.content}</p>

            <small>
              {post.created_at}
            </small>

            <br /><br />

            <Link to={`/post/${post.id}`}>
              Read More
            </Link>

          </div>
        ))
      )}

    </div>
  );
}

export default Home;