import Component from '@glimmer/component';
import { action } from '@ember/object';
import service from '@ember/service';
import gql from 'graphql-tag';

export default class AgentTicketDetailComponent extends Component {
  @service apollo;
  @service toastr;

  @action
  async updateStatus(newStatus) {
    const mutation = gql`
      mutation ($id: ID!, $status: String!) {
        updateSupportTicket(id: $id, status: $status) {
          supportTicket {
            id
            status
          }
          errors
        }
      }
    `;

    try {
      const { data } = await this.apollo.mutate({
        mutation,
        variables: {
          id: this.args.ticket.id,
          status: newStatus,
        },
      });

      if (data.updateSupportTicket.errors.length === 0) {
        this.toastr.success('Status updated successfully');
      } else {
        this.toastr.error(data.updateSupportTicket.errors.join(', '));
      }
    } catch (e) {
      console.error(e);
      this.toastr.error('Something went wrong while updating the status');
    }
  }
}
