import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { GET_TICKET_DETAIL } from '../../graphql/queries/tickets';

export default class TicketsDetailRoute extends Route {
  @service apollo;

  async model(params) {
    const response = await this.apollo.query({
      query: GET_TICKET_DETAIL,
      variables: { id: params.id },
    });

    return response.ticket;
  }
}
