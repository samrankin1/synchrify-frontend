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
        } else if (data.error === "You must be authenticated with Spotify to access this URL") {
          history.push('/linkspotify');
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
    // console.log('Currently listening:')
    // console.log(props);
    if (props === '') {
      // User is not listening to anything
    } else {
      setIsListening(true);
      const array = [];
      array.push({
        id: 1,
        img: props.album.images[2].url,
        artist: props.artists[0].name,
        name: props.name,
        type: props.type,
        uri: props.id
      });
      setCurrentlyListening(array.map((array) => {
        const url = '/rate/track/'+array.uri;
        return (<li key={array.id}>
          <a href = {url}>
            <img src={array.img} alt={array.artist} />
            {array.artist} - {array.name}
          </a>
        </li>
        );
      }
    ));
    }
  };

  const recentlyPlayedListHandler = (props) => {
    // console.log('Recently Played')
    // console.log(props);
    const array = [];
    for (let i = 0; i < props.length; i++) {
      array.push({
        id: i,
        img: props[i].track.album.images[2].url,
        artist: props[i].track.artists[0].name,
        name: props[i].track.name,
        type: props[i].track.type,
        uri: props[i].track.id
      });
    }
    setRecentlyPlayedList(array.map((array) => {
      const url = '/rate/track/'+array.uri;
      return (
        <li key={array.id}>
          <a href = {url}>
            <img src={array.img} alt={array.artist} />
            {array.artist} - {array.name}
          </a>
        </li>
      );
      }
    ));
  };

  const fetchTopTracks = () => {
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
      topTracksTimeLimit = topTracksTimeLimitDef.medium;
      setTopTracksStatus('the past 6 months:');
    } else if (props === 'all time'){
      topTracksTimeLimit = topTracksTimeLimitDef.long;
      setTopTracksStatus('all time:');
    }
    fetchTopTracks(topTracksTimeLimit);
  };
  
  const topTracksHandler = (props) => {
    // console.log('Top tracks:')
    // console.log(props);
    const array = [];
    for (let i = 0; i < props.length; i++) {
      array.push({
        id: i,
        img: props[i].album.images[2].url,
        artist: props[i].artists[0].name,
        name: props[i].name,
        type: props[i].type,
        uri: props[i].id
      });
    }
    setTopTracks(array.map((array) =>{
      const url = '/rate/track/'+array.uri;
      return (
        <li key={array.id}>
          <a href = {url}>
            <img src={array.img} alt={array.artist} />
            {array.artist} - {array.name}
          </a>
        </li>
      );
    }
    ));
  };

  // TODO: Stop this from rendering if user is not logged in or linked to Spotify
  return (
      <div>
      <h1>{userDisplayName} Dashboard</h1>
      <a href ="/friends">Friends</a> <br/>
      <a href ="/ratings">Ratings</a>
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