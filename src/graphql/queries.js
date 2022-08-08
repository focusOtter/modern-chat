/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listRooms = /* GraphQL */ `
  query ListRooms($limit: Int) {
    listRooms(limit: $limit) {
      items {
        id
        name
        messages {
          items {
            id
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
      nextToken
    }
  }
`;
export const listMessagesForRoom = /* GraphQL */ `
  query ListMessagesForRoom($roomId: ID!, $sortDirection: ModelSortDirection) {
    listMessagesForRoom(roomId: $roomId, sortDirection: $sortDirection) {
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
  }
`;
