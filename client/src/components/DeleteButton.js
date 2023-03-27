import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { useNavigate } from "react-router-dom";

function DeleteButton({ postId, commentId, callback }) {
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const navigate = useNavigate();
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        // setTimeout(() => {
        navigate("/");
        window.location.reload();
        // }, 1000);
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <>
      <div
        className="btn btn-danger"
        as="div"
        color="red"
        floated="right"
        onClick={() => deletePostOrMutation()}
      >
        <i className="fa fa-trash" style={{ margin: 0 }} />
      </div>
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
