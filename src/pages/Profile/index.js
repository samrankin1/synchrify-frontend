import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { user_id } = useParams();
  useEffect(() => {
    fetch('https://synchapi.samrank.in/ratings/list/'+user_id, {
        method: 'GET',
        credentials: 'include',
    })
    .then((resp) => {
        return resp.json();
    })
    .then((data) => {
        return ratingsListHandler(data);
    })
    .catch((err) => {
        return console.error(err);
    })
    // eslint-disable-next-line
  }, [user_id]);

  const [ratingsList, setRatingsList] = useState([]);
  const [userIsFriend, setUserIsFriend] = useState(true);
  const [notFriendsMessage, setNotFriendsMessage] = useState('');
  const ratingsListHandler = (props) => {
    if (props.ratings === undefined) {
      setUserIsFriend(false);
      setNotFriendsMessage('You are not friends with this user.');
    } else if (props.ratings.length === 0) {
      // User has no ratings;
    } else {
        const array = [];
        const k = props.ratings.length - 1;
        for (let i = k; i >= 0; i--) {
            array.push({
                name: props.ratings[i].name,
                uri: props.ratings[i].uri,
                content_id: props.ratings[i].content_id,
                rating: props.ratings[i].rating,
                id: (k - i)
            });
        }
        setRatingsList(array.map((array) => {
            const url = '/view/'+user_id+'/'+array.uri+'/'+array.content_id;
            return (
                <li key={array.id}>
                    <a href={url}>{array.rating}/10 - {array.name}</a>
                </li>
            );
        }))
    }
  };
  return (
    <div>
    <div className ="header">
    <a href='/dashboard' className = "logo">Synchrify</a>
    <div className = "menu">
    <a href ="/friends">Friends</a>
    <a href ="/ratings">Ratings</a>
      <a href='/logout'>Logout</a>
    </div>
    </div>

    <div className="title">
      <h1>User {user_id}'s Profile</h1>
    </div>
    <div className="main">
            {userIsFriend && <div>
                <h2>Track ratings:</h2>
                {ratingsList}
            </div>}
            <div>
              {notFriendsMessage}
            </div>
    </div>
    </div>
  )
};

export default Dashboard;
