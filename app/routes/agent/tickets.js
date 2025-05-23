import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import redirectIfNotAuthenticated from '../../../utils/redirect-if-not-authenticated';

export default class AgentTicketsRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (redirectIfNotAuthenticated(this.auth, this.router)) return;
    if (this.auth.user?.role !== 'agent') {
      this.router.transitionTo('tickets');
    }
  }
}
