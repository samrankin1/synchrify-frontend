import React, { useState , useEffect }from "react";
import history from '../../services/history';

const Dashboard = () => {
  useEffect(() => { 
      fetch('http://127.0.0.1:8000/spotify/user/profile', {
        method: 'GET',
        credentials: 'include',
      })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data.error === "You must be logged in to access this URL") {
          history.push('/');
          // window.location.href = '/';
        } else if (data.error === "You must be authenticated with Spotify to access this URL") {
          history.push('/profile');
          // window.location.href = '/linkspotify';
        } 
        return userInfoHandler(data);
      })
      .catch((err) => {
        return console.error(err);
      })

      fetch('http://127.0.0.1:8000/spotify/user/playing_track', {
        method: 'GET',
        credentials: 'include',
      })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return currentlyListeningHandler(data.item);
      })
      .catch((err) => {
        currentlyListeningHandler('');
        return console.error(err);
      })

      fetch('http://127.0.0.1:8000/spotify/user/recent_tracks', {
        method: 'GET',
        credentials: 'include',
      })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return recentlyPlayedListHandler(data.items);
      })
      .catch((err) => {
        return console.error(err);
      })

      fetch('http://127.0.0.1:8000/spotify/user/top_tracks?timespan=short_term&limit=7', {
        method: 'GET',
        credentials: 'include'
      })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return topTracksHandler(data.items);
      })
      .catch((err) => {
        return console.error(err);
      })
  }, [])

  const [userDisplayName, setUserDisplayName] = useState('');
  
  const [isListening, setIsListening] = useState(false);
  const [currentlyListening, setCurrentlyListening] = useState([]);

  const [recentlyPlayedList, setRecentlyPlayedList] = useState([]);

  const userInfoHandler = (props) => {
    setUserDisplayName(props.display_name + '\'s ');
  };

  const currentlyListeningHandler = (props) => {
    // FIXME: array with only 1 item
    if (props === '') {
      // User is not listening to anything
    } else {
      setIsListening(true);
      const array = [];
      array.push({
        id: 1,
        value: props.artists[0].name + ' - ' + props.name
      });
      setCurrentlyListening(array.map((array) => 
        <li key={array.id}>{array.value}</li>
      ));
    }
  };

  const recentlyPlayedListHandler = (props) => {
    // FIXME: - make list items link to their content so it's ratable
    //        - add at what time the track was played
    const array = [];
    for (let i = 0; i < props.length; i++) {
      array.push({
        id: i,
        value: props[i].track.artists[0].name + ' - ' + props[i].track.name
      });
    }
    setRecentlyPlayedList(array.map((array) =>
      <li key={array.id}>{array.value}</li>
    ));
  };

  async function fetchTopTracks() {
    const url = 'http://127.0.0.1:8000/spotify/user/top_tracks'+topTracksTimeLimit;
    // console.log(url);
    fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return topTracksHandler(data.items);
    })
    .catch((err) => {
      return console.error(err);
    })
  };
  const topTracksTimeLimitDef = {
    short: '?timespan=short_term&limit=7',
    medium: '?timespan=medium_term&limit=7',
    long: '?timespan=long_term&limit=7'
  };

  let topTracksTimeLimit = '';
  const [topTracks, setTopTracks] = useState([]);
  const [topTracksStatus, setTopTracksStatus] = useState('the past 4 weeks:');

  const switchTimeFrame = (props) => {
    if (props === '4 weeks') {
      topTracksTimeLimit = topTracksTimeLimitDef.short;
      setTopTracksStatus('the past 4 weeks:');
    } else if (props === '6 months'){
      //setTopTracksTimeLimit(topTracksTimeLimitDef.medium);
      topTracksTimeLimit = topTracksTimeLimitDef.medium;
      setTopTracksStatus('the past 6 months:');
    } else if (props === 'all time'){
      //setTopTracksTimeLimit(topTracksTimeLimitDef.long);
      topTracksTimeLimit = topTracksTimeLimitDef.long;
      setTopTracksStatus('all time:');
    }
    fetchTopTracks(topTracksTimeLimit);
  };
  
  const topTracksHandler = (props) => {
    const array = [];
    for (let i = 0; i < props.length; i++) {
      array.push({
        id: i,
        value: props[i].artists[0].name + ' - ' + props[i].name
      });
    }
    setTopTracks(array.map((array) =>
      <li key={array.id}>{array.value}</li>
    ));
  };

  // TODO: Stop this from rendering if user is not logged in or linked to Spotify
  return (
      <div>
      <h1>{userDisplayName} Dashboard</h1>
      <div>
        {isListening && 
          <div>
          <h2>Currently Playing</h2>
          <ul>
            {currentlyListening}
          </ul>
          </div>
        }
      </div>

      <div>
        <h2>Recently Played</h2>
        <ul>
          {recentlyPlayedList}
        </ul>
      </div>

      <div>
        <h2>Top Tracks</h2>
        <button onClick={switchTimeFrame.bind(switchTimeFrame, '4 weeks')}>
          4 Weeks
        </button>
        <button onClick={switchTimeFrame.bind(switchTimeFrame, '6 months')}>
          6 Months
        </button>
        <button onClick={switchTimeFrame.bind(switchTimeFrame, 'all time')}>
          All Time
        </button>
        <br/>
        Top tracks from {topTracksStatus}
        <ul>
          {topTracks}
        </ul>
      </div>

      <div>
        <a href='/logout'>Logout</a>
      </div>
    </div>
    )
};

export default Dashboard;