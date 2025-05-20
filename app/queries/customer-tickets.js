import gql from 'graphql-tag';

export default gql`
  query {
    myTickets {
      id
      title
      status
      createdAt
    }
  }
`;
