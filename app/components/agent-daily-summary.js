import Component from '@glimmer/component';
import service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import query from '../graphql/queries/agent-open-tickets';

export default class AgentDailySummaryComponent extends Component {
  @service apollo;
  @tracked tickets = [];

  constructor() {
    super(...arguments);
    this.loadTickets();
  }

  async loadTickets() {
    const response = await this.apollo.query({ query });
    this.tickets = response.agentOpenTickets;
  }
}
