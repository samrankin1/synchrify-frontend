import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewRate = () => {
    const { user_id } = useParams();
    const { content_id } = useParams();
    const { id } = useParams();
    useEffect(() => {
            fetch('http://127.0.0.1:8000/spotify/user/fetch_tracks?tracks='+content_id, {
                method: 'GET',
                credentials: 'include',
            })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                return trackInfoHandler(data);
            })
            .catch((err) => {
                return console.error(err);
            })

            fetch('http://127.0.0.1:8000/content/'+id+'/rating/'+user_id, {
                method: 'GET',
                credentials: 'include',
              })
              .then((resp) => {
                return resp.json();
              })
              .then((data) => {
                console.log(data);
                return setCurrentRating(data.rating);
              })
              .catch((err) => {
                return console.error(err);
              })
    }, [content_id, user_id, id]);

    const [currentRating, setCurrentRating] = useState(0);
    const [trackInfo, setTrackInfo] = useState({
        img: '',
        name: '',
        artist: '',
        album: ''
    });
    const trackInfoHandler = (props) => {
        console.log(props);
        setTrackInfo({
            img: props.tracks[0].album.images[1].url,
            name: props.tracks[0].name,
            artist: props.tracks[0].artists[0].name,
            album: props.tracks[0].album.name
        });
    };
    return (
        <div>
        <h1>User {user_id}'s Rating</h1>
        <a href='/friends'>Back</a>
        <div>
            {/* <h2>You are currently viewing:</h2> <br/> */}
            <img src={trackInfo.img} alt={trackInfo.album}></img> <br/>
            <b>Track Name:</b> {trackInfo.name} <br/>
            <b>By: </b>{trackInfo.artist} <br/>
            <b>From the Album:</b> {trackInfo.album}
        </div>
        <div>
                <br/>
                <b>User {user_id} gave this track a rating of {currentRating}</b> <br/>
            {/* <button onClick={cancelHandler}>Cancel</button> */}
        </div>
    </div>
    );
};

export default ViewRate;
