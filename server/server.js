const {
  ApolloServer,

  // PubSub
} = require("apollo-server");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./schemas");
const { PubSub } = require("graphql-subscriptions");

// const typeDefs = require("./graphql/typeDefs");
// const resolvers = require("./graphql/resolvers");
// const { MONGODB } = require("./config.js");
const { connection } = require("./config/connection");

const pubsub = new PubSub();

const PORT = process.env.port || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

// mongoose
//   .connect(MONGODB, { useNewUrlParser: true })
// connection
//   .once("open")

mongoose
  .connect("mongodb+srv://subhan:subhan@cluster0.pyiicf8.mongodb.net/gym", {
    useNewUrlParser: true,
  })
  .then(() => {
    // .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
// .then((res) => {
//   console.log(`Server running at ${res.url}`);
// })
// .catch((err) => {
//   console.error(err);
// });
