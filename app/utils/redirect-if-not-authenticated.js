export default function redirectIfNotAuthenticated(auth, router) {
  if (!auth.isAuthenticated()) {
    router.transitionTo('login');
    return true;
  }
  return false;
}
