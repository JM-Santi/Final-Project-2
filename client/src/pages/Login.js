import React, { useContext, useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
// impor
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      console.log("data", userData);
      context.login(userData);
      //   props.history.push("/");
      navigate("/");
    },
    onError(err) {
      console.log("ere", err);
      setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    console.log("in lgin calbck");
    loginUser();
  }

  return (
    <div className="form-container my-5 pt-5 col-md-6">
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            class="form-control"
            id="username"
            name="username"
            placeholder="Enter username"
            value={values.username}
            error={errors?.username ? true : false}
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={values.password}
            error={errors?.password ? true : false}
            onChange={onChange}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>

      {errors && Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
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

export default Login;
