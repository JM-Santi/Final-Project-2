import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

import { Link, useParams } from "react-router-dom";

function SinglePost(props) {
  const { id: postId } = useParams();

  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  let getPost = null;
  if (data) {
    getPost = data.getPost;
  }

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <div className="mt-5 row">
        <div className="col-md-8">
          <div style={{ marginTop: 60 }}>
            <div className="card  col-md-12  ">
              <div className="card-body text-center mt-5 ">
                <p>
                  <img
                    className=" img-fluid"
                    src="https://static.vecteezy.com/system/resources/thumbnails/007/412/690/small/fitness-logo-template-gym-club-logotype-sportsman-silhouette-character-logo-design-template-design-element-for-logo-poster-card-banner-emblem-t-shirt-illustration-vector.jpg"
                    alt="card"
                    width={100}
                  />
                </p>
                <h4 className="card-title">{username}</h4>
                <p className="card-text">{body}</p>
                <p className="text-secondary">
                  {moment(createdAt).fromNow(true)}
                </p>

                <LikeButton user={user} post={{ id, likes, likeCount }} />

                <Link
                  className="btn btn-primary btn-sm mx-2"
                  to={`/workout-hub/${id}`}
                >
                  <i className="fa fa-comment p-2 "></i>
                  {commentCount}
                </Link>
                {user && user.username === username && (
                  <DeleteButton postId={id} />
                )}
              </div>
            </div>
          </div>
          {user && (
            <div className="card col-md-12  p-5 my-3" fluid>
              <div>
                <p>Post a comment</p>
                <form>
                  <div className=" d-flex">
                    <input
                      type="text"
                      placeholder="Comment.."
                      className="form-control mr-5"
                      name="comment"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="btn btn-success mx-3"
                      disabled={comment.trim() === ""}
                      onClick={submitComment}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-4 mt-1 pt-5">
          {comments.length
            ? comments.map((comment) => (
                <div className="card p-4 m-1" key={comment.id}>
                  <div>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <div>{comment.username}</div>
                    <div className="text-secondary">
                      {moment(comment.createdAt).fromNow()}
                    </div>
                    <div>{comment.body}</div>
                  </div>
                </div>
              ))
            : "No comments"}
        </div>
      </div>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
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
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
