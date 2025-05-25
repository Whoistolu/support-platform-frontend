import Component from '@glimmer/component';
import service from '@ember/service';
import gql from 'graphql-tag';

export default class AgentTicketListComponent extends Component {
  @service apollo;

  tickets = [];

  constructor() {
    super(...arguments);
    this.loadTickets();
  }

  async loadTickets() {
    const query = gql`
      query {
        allSupportTickets {
          id
          title
          status
          createdAt
          user {
            email
          }
        }
      }
    `;

    const result = await this.apollo.query({ query });
    this.tickets = result.allSupportTickets;
  }
}
