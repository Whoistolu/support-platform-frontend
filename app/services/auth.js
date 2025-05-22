import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import jwtDecode from 'jwt-decode';
import gql from 'graphql-tag';

export default class AuthService extends Service {
  @service apollo;

  @tracked user = null;
  @tracked token = localStorage.getItem('token');

  constructor() {
    super(...arguments);
    this.initializeUser();
  }

  isAuthenticated() {
    return !!this.token;
  }

  async initializeUser() {
    if (!this.token) return;

    try {
      const decoded = jwtDecode(this.token);
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        this.logout();
        return;
      }

      const query = gql`
        query {
          currentUser {
            id
            email
            name
            role
          }
        }
      `;

      const result = await this.apollo.query({ query, fetchPolicy: 'network-only' });
      this.user = result?.currentUser;
    } catch (error) {
      console.error('Failed to auto-fetch user:', error);
      this.logout();
    }
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
