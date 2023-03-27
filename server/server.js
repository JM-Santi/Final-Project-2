const {
  ApolloServer,

  // PubSub
} = require("apollo-server");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./schemas");
const { PubSub } = require("graphql-subscriptions");

const express = require('express')
const app = express()
const path = require('path')

// const typeDefs = require("./graphql/typeDefs");
// const resolvers = require("./graphql/resolvers");
// const { MONGODB } = require("./config.js");
const { connection } = require("./config/connection");

const pubsub = new PubSub();

const PORT = process.env.port || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('../client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../client/build/index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(200).json({ message: 'welcome server...' })
  })
}

app.listen(process.env.port || 3002, '0.0.0.0', () => {
  console.log('node app is running on');
})
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

  // app.listen(PORT, () => {
  //   console.log('server is running on', PORT);
  // })

// .then((res) => {
//   console.log(`Server running at ${res.url}`);
// })
// .catch((err) => {
//   console.error(err);
// });
