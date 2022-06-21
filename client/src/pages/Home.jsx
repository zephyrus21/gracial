import { gql, useQuery } from "@apollo/client";
import PostForm from "../components/PostForm";

export const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div>
      <PostForm />
      <h1>Posts</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          {data.getPosts.map((post) => (
            <div style={{ display: "flex" }} key={post.id}>
              <p>{post.body} ----</p>
              <p>Posted by: {post.username}</p>
              <p>Likes: {post.likeCount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        body
        createdAt
        username
      }
    }
  }
`;
