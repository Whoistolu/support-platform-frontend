import Component from '@glimmer/component';
import service from '@ember/service';
import { action } from '@ember/object';
import gql from 'graphql-tag';

export default class AgentCommentSectionComponent extends Component {
  @service apollo;

  commentText = '';

  @action updateComment(e) {
    this.commentText = e.target.value;
  }

  @action async postComment(e) {
    e.preventDefault();

    const mutation = gql`
      mutation ($ticketId: ID!, $message: String!) {
        createComment(
          input: { supportTicketId: $ticketId, message: $message }
        ) {
          comment {
            id
          }
          errors
        }
      }
    `;

    await this.apollo.mutate({
      mutation,
      variables: {
        ticketId: this.args.ticketId,
        message: this.commentText,
      },
    });

    window.location.reload();
  }
}
