import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import gql from 'graphql-tag';
import { inject as service } from '@ember/service';

export default class CommentSectionComponent extends Component {
  @tracked commentText = '';
  @service apollo;

  get canComment() {
    return this.args.ticket.comments.any(
      (comment) => comment.user.role === 'agent',
    );
  }

  @action
  async postComment(e) {
    e.preventDefault();
    if (!this.canComment) return;

    const mutation = gql`
      mutation ($input: CreateCommentInput!) {
        createComment(input: $input) {
          comment {
            id
            body
          }
          errors
        }
      }
    `;

    await this.apollo.mutate({
      mutation,
      variables: {
        input: {
          ticketId: this.args.ticket.id,
          body: this.commentText,
        },
      },
    });

    this.commentText = '';
    location.reload();
  }
}
