import React, { useEffect } from 'react';

export const App = () => {
  const query = `{ totalPhotos }`;
  useEffect(() => {
    fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
      .then((r) => r.json())
      .then(console.log);
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to get-started!</h1>
    </div>
  );
};

export default App;
