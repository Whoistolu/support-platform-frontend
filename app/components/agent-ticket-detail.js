import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import gql from 'graphql-tag';

export default class AgentTicketDetailRoute extends Route {
  @service apollo;

  async model(params) {
    const query = gql`
      query($id: ID!) {
        supportTicket(id: $id) {
          id
          title
          description
          status
          createdAt
          user { email }
          comments {
            id
            message
            user {
              name
              role
            }
            createdAt
          }
        }
      }
    `;

    const result = await this.apollo.query({
      query,
      variables: { id: params.id }
    });

    return result.supportTicket;
  }
}
