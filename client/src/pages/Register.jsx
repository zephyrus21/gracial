import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

export const Register = () => {
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [adduser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(_, res) {
      ctx.login(res.data.register);
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
    adduser();
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
              type='email'
              name='email'
              placeholder='Email'
              value={values.email}
              onChange={onChangeHandler}
            />
            {errors.email && <p>{errors.email}</p>}
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={values.password}
              onChange={onChangeHandler}
            />
            {errors.password && <p>{errors.password}</p>}
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={values.confirmPassword}
              onChange={onChangeHandler}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button type='submit'>Register</button>
          </form>
        </div>
      )}
    </>
  );
};

const REGISTER_USER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
