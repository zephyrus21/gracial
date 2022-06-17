require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
    return server.listen({ port: process.env.PORT });
  })
  .then((res) => {
    console.log("server is running on:", res.url);
  });
