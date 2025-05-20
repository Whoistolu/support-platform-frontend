import Component from '@glimmer/component';
import { action } from '@ember/object';
import gql from 'graphql-tag';
import { inject as service } from '@ember/service';
import { upload } from 'ember-active-storage';

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

    let signedId = null;

    if (this.file) {
      try {
        const uploadResult = await upload(this.file, {
          directUploadUrl: 'http://localhost:3000/rails/active_storage/direct_uploads'
        });

        signedId = uploadResult.signedId;
      } catch (uploadError) {
        console.error('Upload failed:', uploadError);
        return alert('File upload failed.');
      }
    }

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
      const response = await this.apollo.mutate({
        mutation,
        variables: {
          input: {
            subject: this.subject,
            message: this.message,
            file: signedId
          }
        }
      });

      console.log('Ticket created:', response);
    } catch (err) {
      console.error('Ticket creation failed:', err);
      alert('Something went wrong.');
    }
  }
}
