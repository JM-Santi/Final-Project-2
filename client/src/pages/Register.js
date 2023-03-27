import React, { useContext, useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      navigate("/");

      props.history.push("/");
    },
    onError(err) {
      setErrors(
        err?.graphQLErrors[0]?.extensions?.exception?.errors || {
          email: err?.graphQLErrors[0]?.extensions?.exception?.errmsg,
        }
      );
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container my-5 pt-5 col-md-6">
      <h1>Register</h1>

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
          <label for="email">Email</label>
          <input
            class="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={values.email}
            error={errors?.email ? true : false}
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
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="passwords"
            class="form-control"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            error={errors?.confirmPassword ? true : false}
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

const REGISTER_USER = gql`
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

export default Register;
