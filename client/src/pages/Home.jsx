import { gql, useQuery } from "@apollo/client";

export const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div>
      <h1>Posts</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          {data.getPosts.map((post) => (
            <div style={{ display: "flex" }} key={post.id}>
              <p>{post.title}</p>
              <p>{post.body}</p>
              <p>{post.username}</p>
              <p>{post.likeCount}</p>
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
