// src/schema.js
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
type Channel {
   id: ID!                
   name: String
}

type Message {
  id: ID!
  text: String
}

type Query {
   channels: [Channel]
   channel(id: ID!): channel    
}

type Mutation {
  addChannel(name: String!): Channel
}
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema }); this is mocking, 我觉得mocking the resolver function
export { schema };
