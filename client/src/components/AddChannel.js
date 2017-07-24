import React from "react";
import { gql, graphql } from "react-apollo";

import { channelsListQuery } from "./ChannelsListWithData";

const AddChannel = ({ mutate }) => {
  const handleKeyUp = evt => {
    if (evt.keyCode === 13) {
      evt.persist();

      mutate({
        variables: { name: evt.target.value },
        optimisticResponse: {
          addChannel: {
            name: evt.target.value,
            id: Math.round(Math.random() * -10000),
            __typename: "Channel"
          }
        },
        // refetchQueries: [{ query: channelsListQuery }]
        // for refetch the channels then the components who cares the data re-render?
        update: (store, { data: { addChannel } }) => {
          const data = store.readQuery({ query: channelsListQuery });
          data.channels.push(addChannel);
          store.writeQuery({ query: channelsListQuery, data });
        }
      });
      evt.target.value = "";
    }
  };
  return (
    <div>
      <input type="text" placeholder="New Channel" onKeyUp={handleKeyUp} />
    </div>
  );
};

// why add channel twice
const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;
const AddChannelWithMutation = graphql(addChannelMutation)(AddChannel);

export default AddChannelWithMutation;
