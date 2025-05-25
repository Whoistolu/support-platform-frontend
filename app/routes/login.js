import Route from '@ember/routing/route';
import service from '@ember/service';

export default class LoginRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (this.auth.isAuthenticated()) {
      if (this.auth.user?.role === 'agent') {
        this.router.transitionTo('agent.tickets');
      } else {
        this.router.transitionTo('tickets');
      }
    }
  }
}
