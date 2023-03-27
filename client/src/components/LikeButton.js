import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <div className="btn btn-danger btn-sm" color="teal">
        <i className="fa fa-heart p-2" />
        {likeCount}
      </div>
    ) : (
      <div className="btn btn-danger btn-sm" color="teal" basic>
        <i className="fa fa-heart p-2" />
        {likeCount}
      </div>
    )
  ) : (
    <div
      className="btn btn-danger btn-sm"
      as={Link}
      to="/login"
      color="teal"
      basic
    >
      <i className="fa fa-heart p-2" />
      {likeCount}
    </div>
  );

  return (
    <span className="" as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
    </span>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
