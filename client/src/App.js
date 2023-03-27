import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import Home from "./pages/Home";
import WorkoutHub from "./pages/WorkoutHub";

import NotFound from "./pages/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import SinglePost from "./pages/SinglePost";
import { AuthProvider } from "./context/auth";

import { setContext } from "@apollo/client/link/context";

import "font-awesome/css/font-awesome.min.css";
const httpLink = createHttpLink({
  uri: "https://whub1.herokuapp.com:3001",
});
// https://whub1.herokuapp.com

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  uri: "/graphql",
  link: authLink.concat(httpLink),

  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <div className="container main-page">
          <Router>
            <div className="flex-column justify-center align-center min-100-vh ">
              <MenuBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />

                <Route path="/workout-hub" element={<Home />} />

                <Route exact path="/workout-hub/:id" element={<SinglePost />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
