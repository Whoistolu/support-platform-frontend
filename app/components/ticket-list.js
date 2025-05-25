import Component from '@glimmer/component';
import service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { GET_TICKETS } from '../graphql/queries/tickets';

export default class TicketListComponent extends Component {
  @service apollo;
  @tracked tickets = [];

  constructor() {
    super(...arguments);
    this.loadTickets();
  }

  async loadTickets() {
    const response = await this.apollo.query({ query: GET_TICKETS });
    this.tickets = response.myTickets;
  }
}
