import React from "react";
import AddChannel from "./AddChannel";
import { gql, graphql } from "react-apollo";
import { Link } from "react-router-dom";

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
    console.log(error.message);
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
          className={"channel " + (ch.id < 0 ? 'optimistic' : '')}
        >
        <Link to={ch.id < 0 ? "" : `channel/${ch.id}`}>
          {ch.name}
        </Link>
        </div>
      )}
    </div>
  );
};

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

export default ChannelsListWithData;
  