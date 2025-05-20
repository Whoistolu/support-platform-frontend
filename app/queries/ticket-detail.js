import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
    ticket(id: $id) {
      id
      title
      description
      status
      attachmentUrls
      comments {
        id
        body
        createdAt
        user {
          name
          role
        }
      }
    }
  }
`;
