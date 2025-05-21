import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import gql from 'graphql-tag';

export default class AgentTicketDetailComponent extends Component {
  @service apollo;

  @action
  async updateStatus(newStatus) {
    const mutation = gql`
      mutation($id: ID!, $status: String!) {
        updateSupportTicket(id: $id, status: $status) {
          supportTicket {
            id
            status
          }
          errors
        }
      }
    `;

    await this.apollo.mutate({
      mutation,
      variables: {
        id: this.args.ticket.id,
        status: newStatus
      },
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify({ __typename: 'SupportTicket', id: this.args.ticket.id }),
          fields: {
            status() {
              return newStatus;
            }
          }
        });
      }
    });
  }
}
