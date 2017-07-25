const channels = [
  {
    id: '1',
    name: "soccer",
    messages: [{
      id: '1',
      text: 'first'
    },{
      id: '2',
      text: 'first'
    }]
  },
  {
    id: '2',
    name: "baseball",
    messages: [{
      id: '3',
      text: 'first'
    }, {
      id: '4',
      text: 'first'
    }]
  }
];
// ?
let nextId = 3;
let nextMessgaeId = 5;

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, {id}) => {
  
      return channels.find(channel => channel.id === id);
      
      
    }
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = {
        id: String(nextId++),
        name: args.name,
        messages: []
      };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, {message}) => {
      const channel = channels.find(channel => channel.id === message.channelId)
      ;
      // if(!channel){
      //   throw new Error("Channel does not exist");
      // }
        

      const newMessage = { id: String(nextMessgaeId++), text: message.text }
      channel.messages.push(newMessage);
      return newMessage;
    }
  }
};
