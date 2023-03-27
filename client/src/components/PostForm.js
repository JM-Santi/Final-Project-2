import React from "react";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const navigate = useNavigate();
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
  });

  function createPostCallback() {
    // alert("in create pos");
    createPost();
    // navigate("/");
    window.location.reload();
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div
          className="col-md-12 fixed-top p-5 mx-auto my-5 "
          style={{ right: "50%", width: "25%" }}
        >
          <h2 className="pt">Add a workout</h2>
          {/* {error && (
            <div className="ui error message" style={{ marginBottom: 20 }}>
              <ul className="list">
                <li>{error.graphQLErrors[0].message}</li>
              </ul>
            </div>
          )} */}

          <div class="form-group">
            <label for="content">Your workout:</label>
            <textarea
              rows={6}
              class="form-control my-1"
              id="content"
              name="body"
              onChange={onChange}
              value={values.body}
              placeholder="Enter content"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

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

export default PostForm;
