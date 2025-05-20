import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import gql from 'graphql-tag';

export default class TicketsRoute extends Route {
  @service apollo;

  async model() {
    const query = gql`
      query {
        myTickets {
          id
          subject
          status
        }
      }
    `;
    return this.apollo.query({ query }, 'myTickets');
  }
}
