export default function() {
  return {
    apiURL: 'http://localhost:3000/graphql',
    clientOptions: {
      headers: () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
      }
    }
  };
}
