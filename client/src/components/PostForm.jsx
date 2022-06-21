import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const PostForm = () => {
  const [errors, setErrors] = useState({
    body: "",
  });
  const [values, setValues] = useState({
    body: "",
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let newData = data.getPosts;
      newData = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: newData,
        },
      });
      values.body = "";
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    createPost();
  };

  return (
    <form onSubmit={onSubmitHandler} noValidate>
      <input
        type='text'
        name='body'
        placeholder='Post'
        value={values.body}
        onChange={onChangeHandler}
      />
      {errors.body && <p>{errors.body}</p>}
      <button type='submit'>Create Post</button>
    </form>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

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

export default PostForm;
