import React from "react";
import MessageList from "./MessageList";
import { gql, graphql } from "react-apollo";
import NotFound from "./NotFound";

const ChannelDetails = ({ data: { loading, error, channel }, match }) => {
  // let message = [{ id: "1", text: "Stub Message - To Replace" }];
  // let name = "Stub name";
  // let channel = { name, message };
  console.log(match);


  if (loading) {
    return <p>loding</p>;
  }
  if (error) {
    return (
      <p>
        {error.message}
      </p>
    );
  }
  if (channel === null) {
    return <NotFound />;
  }
  return (
    <div>
      <div className="channelName">
        {channel.name}
      </div>
        <MessageList messages={channel.messages} />  
    </div>
  );
};

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

const ChannelDetailsWithQuery = graphql(channelDetailsQuery, {
  options: props => ({
    variables: { channelId: props.match.params.channelId }
  })
})(ChannelDetails);

export default ChannelDetailsWithQuery;
