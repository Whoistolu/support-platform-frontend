import EmberRouter from '@ember/routing/router';
import config from 'support-platform-frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('signup');
  this.route('tickets', function () {
    this.route('detail', { path: '/:id' });
  });
});
