import gql from 'graphql-tag';

export const GET_TICKETS = gql`
  query {
    myTickets {
      id
      title
      status
    }
  }
`;

export const GET_TICKET_DETAIL = gql`
  query TicketDetail($id: ID!) {
    ticket(id: $id) {
      id
      title
      description
      status
      attachmentUrls
      comments {
        id
        body
        user {
          name
          role
        }
        createdAt
      }
    }
  }
`;
