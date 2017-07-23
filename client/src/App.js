import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";

import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { mockNetworkInterfaceWithSchema } from "apollo-test-utils";
import { typeDefs } from "./schema";

import AddChannel from "./components/AddChannel";

const networkInterface = createNetworkInterface({
  uri: "http://localhost:4000/graphql"
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      setTimeout(next, 1000);
    }
  }
]);
const schema = makeExecutableSchema({ typeDefs });

//mock
// addMockFunctionsToSchema({ schema });
// const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const client = new ApolloClient({
  // networkInterface: mockNetworkInterface
  networkInterface
});

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return (
      <p>
        {error.message}
      </p>
    );
  }
  return (
    <div className="channelsList">
      <AddChannel />
      {channels.map(ch =>
        <div
          key={ch.id}
          className={"channel " + (ch.id < 0 ? "optimistic" : "")}
        >
          {ch.name}
        </div>
      )}
    </div>
  );
};

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
