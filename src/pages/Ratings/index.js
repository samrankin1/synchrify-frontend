import React, { useState, useEffect } from 'react';

const Ratings = () => {
    const [ratingsList, setRatingsList] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/ratings/list', {
            method: 'GET',
            credentials: 'include',
        })
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            const k = data.ratings.length - 1;
            for (let i = k; i >= 0; i--) {
                fetchImagesHandler(data.ratings[i]);
            }
            return ratingsListHandler(data);
        })
        .catch((err) => {
            return console.error(err);
        })
        // eslint-disable-next-line
    }, []);
    const images = [];
    const fetchImagesHandler = (props) => {
        fetch('http://127.0.0.1:8000/spotify/user/fetch_tracks?tracks='+props.uri, {
            method: 'GET',
            credentials: 'include',
        })
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            images.push(data.tracks[0].album.images[2].url);
        })
        .catch((err) => {
            return console.error(err);
        })
    };

    const ratingsListHandler = (props) => {
        //console.log(images);
        if (props.ratings.length === 0) {
            // User has no ratings;
        } else {
            const array = [];
            let j = 0;
            const k = props.ratings.length - 1;
            for (let i = k; i >= 0; i--) {
                array.push({
                    img: images[j],
                    name: props.ratings[i].name,
                    uri: props.ratings[i].uri,
                    content_id: props.ratings[i].content_id,
                    rating: props.ratings[i].rating,
                    id: (k - i)
                });
                j++;
            }
            setRatingsList(array.map((array) => {
                const url = '/edit/track/'+array.uri;
                return (
                    <li key={array.id}>
                        {/* click to view / edit */}
                        {/* This doesn't work */}
                        {/* <img src={array.img} alt={array.name} /> */}
                        <a href={url}> &nbsp; {array.rating}/10 &nbsp;  {array.name}</a>
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

          <div className = "main-container">
            <h1>Ratings</h1>
            <div>
                <h2>Track ratings:</h2>
                <div className = 'ratings'>{ratingsList}</div>
            </div>
            </div>
        </div>
    );
};

export default Ratings;
