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
    variables: values,
    update(_, res) {
      ctx.login(res.data.login);
      setErrors({});
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
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
            {errors.password && <p>{errors.password}</p>}
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
