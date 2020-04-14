import React from 'react';

const LinkSpotify = () => {
    // Change to 127.0.0.1:8000 when it returns not logged in error
    return (
      <div>
      <div className ="header">
      <a href='/dashboard' className = "logo">Synchrify</a>
      <div className = "menu">
        <a href='/logout'>Logout</a>
      </div>
      </div>
      <div class ="main-container">
        <h1>Welcome!</h1>
        To access the Dashboard,<br/>
        <a href='https://synchapi.samrank.in/spotify/auth'>Link to Spotify</a>
      </div>
      </div>
    )
  };

  export default LinkSpotify;
