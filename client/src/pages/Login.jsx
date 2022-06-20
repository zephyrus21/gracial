import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

export const Login = () => {
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(_, res) {
      ctx(res.data.login);
      setErrors({});
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <form onSubmit={onSubmitHandler} noValidate>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={values.username}
              onChange={onChangeHandler}
            />
            {errors.username && <p>{errors.username}</p>}
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={values.password}
              onChange={onChangeHandler}
            />
            <button type='submit'>Login</button>
          </form>
        </div>
      )}
    </>
  );
};

const LOGIN_USER_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
