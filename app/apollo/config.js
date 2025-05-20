export default function () {
  return {
    apiURL: 'http://localhost:3000/graphql',
    clientOptions: {
      request: (operation) => {
        const token = localStorage.getItem('token');
        if (token) {
          operation.setContext({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      },
    },
  };
}
