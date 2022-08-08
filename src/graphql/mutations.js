/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: MessageInput!) {
    createMessage(input: $input) {
      id
      content {
        text
        imageId
      }
      owner
      createdAt
      updatedAt
      roomId
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: MessageInput!) {
    updateMessage(input: $input) {
      id
      content {
        text
        imageId
      }
      owner
      createdAt
      updatedAt
      roomId
    }
  }
`;
export const createRoom = /* GraphQL */ `
  mutation CreateRoom($input: RoomInput!) {
    createRoom(input: $input) {
      id
      name
      messages {
        items {
          id
          content {
            text
            imageId
          }
          owner
          createdAt
          updatedAt
          roomId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
