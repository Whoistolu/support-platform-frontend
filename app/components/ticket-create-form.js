import Component from '@glimmer/component';
import { action } from '@ember/object';
import gql from 'graphql-tag';
import { inject as service } from '@ember/service';
import { uploadFile } from '../utils/direct-upload';

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

    let fileSignedId = null;
    if (this.file) {
      try {
        fileSignedId = await uploadFile(this.file);
      } catch (error) {
        console.error('File upload failed', error);
        alert('File upload failed');
        return;
      }
    }

    const mutation = gql`
      mutation ($input: CreateTicketInput!) {
        createTicket(input: $input) {
          supportTicket {
            id
            title
            status
          }
          errors
        }
      }
    `;

    await this.apollo.mutate({
      mutation,
      variables: {
        input: {
          title: this.subject,
          description: this.message,
          attachments: fileSignedId ? [fileSignedId] : [],
        },
      },
    });
  }
}
