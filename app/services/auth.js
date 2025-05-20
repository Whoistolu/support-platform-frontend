import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthService extends Service {
  @tracked user = null;
  @tracked token = localStorage.getItem('token');

  isAuthenticated() {
    return !!this.token;
  }

  login(token, userData) {
    this.token = token;
    localStorage.setItem('token', token);
    this.user = userData;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.user = null;
  }
}
