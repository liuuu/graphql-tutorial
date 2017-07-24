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

// import AddChannel from "./components/AddChannel";
import ChannelsListWithData from "./components/ChannelsListWithData";
// import NotFound from "./components/NotFound";
// import ChannelDetails from "./components/ChannelDetails";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

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

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">
              React + GraphQL Tutorial
            </Link>
            <Switch>
              <Route exact path="/" component={ChannelsListWithData} />
              {/* <Route path="/channel/:channelId" component={ChannelDetail} />
              <Route component={NotFound} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
