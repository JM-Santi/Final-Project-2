const {
  ApolloServer,
} = require("apollo-server");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./schemas");
const { PubSub } = require("graphql-subscriptions");

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');

const { connection } = require("./config/connection");

const pubsub = new PubSub();

const PORT = process.env.Port_ApolloServer || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
  console.log('production mode ===');
} else {
  app.get('*', (req, res) => {
    res.status(200).json({ message: 'welcome server...' })
  })
}

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('node app is running ===');
})

mongoose
  .connect("mongodb+srv://subhan:subhan@cluster0.pyiicf8.mongodb.net/gym", {
    useNewUrlParser: true,
  })
  .then(() => {
    // .then(() => {
    console.log("MongoDB Connected ===");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
