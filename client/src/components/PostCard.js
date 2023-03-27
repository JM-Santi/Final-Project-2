import React, { useContext } from "react";

import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="card  col-md-8 mx-auto">
        <div className="card-body text-center">
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
          <p className="text-secondary">{moment(createdAt).fromNow(true)}</p>

          <LikeButton user={user} post={{ id, likes, likeCount }} />

          <Link
            className="btn btn-primary btn-sm mx-2"
            to={`/workout-hub/${id}`}
          >
            <i className="fa fa-comment p-2 "></i>
            {commentCount}
          </Link>
        </div>
      </div>
    </>
  );
}

export default PostCard;
