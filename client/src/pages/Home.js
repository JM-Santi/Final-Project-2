import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  let posts = [];
  if (data) posts = data.getPosts;
  console.log("data", data);
  return (
    <div className="grid" columns={3}>
      <div className="row page-title"></div>
      <div className="row">
        {user && (
          <div className="col-md-4  column">
            <PostForm />
          </div>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <div className="transition-group col-md-8 mx-auto mt-5">
            <div className="mt-5 " style={{ height: "10px" }}></div>
            {posts &&
              posts.map((post) => (
                <div className="" key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
