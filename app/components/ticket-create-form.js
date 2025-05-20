import Component from '@glimmer/component';
import { action } from '@ember/object';
import gql from 'graphql-tag';
import { inject as service } from '@ember/service';

export default class TicketCreateFormComponent extends Component {
  @service apollo;

  subject = '';
  message = '';
  file = null;

  @action updateSubject(e) {
    this.subject = e.target.value;
  }

  @action updateMessage(e) {
    this.message = e.target.value;
  }

  @action uploadFile(e) {
    this.file = e.target.files[0];
  }

  @action async submitTicket(e) {
    e.preventDefault();

    const mutation = gql`
      mutation($input: CreateTicketInput!) {
        createTicket(input: $input) {
          ticket {
            id
            subject
            status
          }
        }
      }
    `;

    try {
      await this.apollo.mutate({
        mutation,
        variables: {
          input: {
            subject: this.subject,
            message: this.message,
            file: this.file
          }
        }
      });

    } catch (error) {
      console.error('Ticket creation failed:', error);
    }
  }
}
