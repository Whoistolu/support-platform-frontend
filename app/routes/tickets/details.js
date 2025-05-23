import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { GET_TICKET_DETAIL } from '../../graphql/queries/tickets';
import redirectIfNotAuthenticated from '../../utils/redirect-if-not-authenticated';

export default class TicketsDetailRoute extends Route {
  @service auth;
  @service router;
  @service apollo;

  beforeModel() {
    if (redirectIfNotAuthenticated(this.auth, this.router)) return;
    if (this.auth.user?.role !== 'customer') {
      this.router.transitionTo('agent.tickets');
    }
  }

  async model(params) {
    const response = await this.apollo.query({
      query: GET_TICKET_DETAIL,
      variables: { id: params.id },
    });

    return response.ticket;
  }
}
