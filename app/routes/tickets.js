import Route from '@ember/routing/route';
import service from '@ember/service';
import gql from 'graphql-tag';
import redirectIfNotAuthenticated from '../utils/redirect-if-not-authenticated';

export default class TicketsRoute extends Route {
  @service auth;
  @service router;
  @service apollo;

  beforeModel() {
    if (redirectIfNotAuthenticated(this.auth, this.router)) return;
    if (this.auth.user?.role !== 'customer') {
      this.router.transitionTo('agent.tickets');
    }
  }

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
