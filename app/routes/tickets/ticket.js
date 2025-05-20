import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import gql from 'graphql-tag';

export default class TicketsTicketRoute extends Route {
  @service apollo;

  async model(params) {
    const query = gql`
      query($id: ID!) {
        myTicket(id: $id) {
          id
          subject
          status
          description
          comments {
            id
            body
            author {
              id
              name
              role
            }
            createdAt
          }
          attachments {
            id
            url
            filename
          }
        }
      }
    `;

    return this.apollo.query({ query, variables: { id: params.ticket_id } }, 'myTicket');
  }
}
