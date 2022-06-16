require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
