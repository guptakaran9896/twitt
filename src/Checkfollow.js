import React, { useState, useEffect } from 'react';

const CheckFollows = () => {
  const [follows, setFollows] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:3000/check-follows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ screenNames: ['twitter1', 'twitter2'] }),
      });
      const data = await result.json();
      setFollows(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {follows === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {follows.map((follow) => (
            <li key={follow.screen_name}>
              {follow.screen_name}: {follow.following ? 'Following' : 'Not Following'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CheckFollows;
