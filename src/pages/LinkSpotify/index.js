import React from 'react';

const LinkSpotify = () => {
    // Change to 127.0.0.1:8000 when it returns not logged in error
    return (
      <div>
        <h1>Welcome!</h1>
        To access the Dashboard,<br/>
        <a href='http://127.0.0.1:8000/spotify/auth'>Link to Spotify</a>
      </div>
    )
  };
  
  export default LinkSpotify;