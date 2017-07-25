import React from 'react'
import { withRouter} from 'react-router'
import { gql, graphql} from 'react-apollo'
import { channelDetailsQuery } from './ChannelDetails'

const AddMessage = ({mutate, match}) => {
    const handleKeyUp = (e) => {
       
        if (e.keyCode === 13) {
             e.persist();
             mutate({
                 variables: {
                     message: {
                         channelId: match.params.channelId,
                         text: e.target.value
                     }
                 },
                 optimisticResponse: {
                     addMessage: {
                        text: e.target.value,
                        id: Math.round(Math.random()*10000),
                        __typename: 'Message'
                     }
                 },
                update:(store, {data: {addMessage}}) => {
                    const data = store.readQuery({
                        query: channelDetailsQuery,
                        variables: {
                            channelId: match.params.channelId
                        }
                    })
                    console.log('data', data)
                    data.channel.messages.push(addMessage);
                    store.writeQuery({
                        query: channelDetailsQuery,
                        variables: match.params.channelId,
                        data
                    })
                    e.target.value = '';
                }
             })
        }
    }
    return (
        <input onKeyUp={handleKeyUp} placeholder="add message" />
    )
}

const addMessageMutation = gql`
mutation addMessage($message: MessageInput!){
    addMessage(message: $message){
        id
        text
    }
}
`
const AddMessageWithMutation = graphql(addMessageMutation)(withRouter(AddMessage))

export default AddMessageWithMutation;