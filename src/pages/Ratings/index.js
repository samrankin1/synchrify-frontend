import React, { useState, useEffect } from 'react';
import history from '../../services/history';

const Ratings = () => {
    const [ratingsList, setRatingsList] = useState([]);
    useEffect(() => {
        fetch('https://synchapi.samrank.in/ratings/list', {
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
    }, []);

    const getContentInfoHandler = (props) => {
        fetch('https://synchapi.samrank.in/content/'+props, {
            method: 'GET',
            credentials: 'include',
        })
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            console.log(data.uri);
            history.push('/edit/track/'+data.uri);
        })
        .catch((err) => {
            return console.error(err);
        })
    }

    const ratingsListHandler = (props) => {
        console.log(props.ratings[0]);
        if (props.ratings.length === 0) {
            // User has no ratings;
        } else {
            const array = [];
            const k = props.ratings.length - 1;
            for (let i = k; i >= 0; i--) {
                array.push({
                    content_id: props.ratings[i].content_id,
                    rating: props.ratings[i].rating,
                    id: (k - i)
                });
            }
            console.log(array);
            setRatingsList(array.map((array) => {
                return (
                    <li key={array.id}>
                        {/* click to view / edit */}
                        <button class = "ratings" onClick={getContentInfoHandler.bind(getContentInfoHandler, array.content_id)}>Rating: {array.rating}/10</button>
                    </li>
                );
            }))
        }
        console.log(ratingsList);
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

          <div className = "view-container">
            <h1>Ratings</h1>
            <div>
                <h2>Track ratings:</h2>
                {ratingsList}
            </div>
            </div>
        </div>
    );
};

export default Ratings;
