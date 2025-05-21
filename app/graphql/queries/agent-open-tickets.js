import gql from 'graphql-tag';

export default gql`
  query {
    agentOpenTickets {
      id
      title
      description
      createdAt
      status
    }
  }
`;