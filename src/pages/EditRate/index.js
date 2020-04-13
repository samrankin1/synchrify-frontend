import React, { useEffect, useState } from 'react';
import history from '../../services/history';
import { useParams } from 'react-router-dom'

const EditRate = () => {
    const { content_id } = useParams();
    useEffect(() => {
        fetch('http://127.0.0.1:8000/content/track/'+content_id, {
            method: 'GET',
            credentials: 'include',
          })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            // console.log(data);
            fetchContentRating(data.content_id);
            return setDbContendId(data.content_id);
          })
          .catch((err) => {
            return console.error(err);
          })

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
    }, [content_id]);

    const [dbContendId, setDbContendId] = useState([]);
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

    const fetchContentRating = (props) => {
        const url = 'http://127.0.0.1:8000/content/'+props+'/rating';
        fetch(url, {
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
    }

    const [rateValue, setRateValue] = useState('');
    const submitHandler = (event) => {
        event.preventDefault();
        const url = 'http://127.0.0.1:8000/content/'+dbContendId+'/rating/set/'+rateValue;
        fetch(url, {
            method: 'GET',
            credentials: 'include',
          })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            history.push('/ratings');
            return console.log(data);
          })
          .catch((err) => {
            return console.error(err);
          })
    }

    const deleteHandler = () => {
        const url = 'http://127.0.0.1:8000/content/'+dbContendId+'/rating/reset';
        fetch(url, {
                method: 'GET',
                credentials: 'include',
            })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                history.push('/ratings');
                return console.log(data);
            })
            .catch((err) => {
                return console.error(err);
            })
    }

    const cancelHandler = () => {
        history.push('/ratings');
    }
    return (
        <div>
            <h1>View Rating</h1>
            <a href='/ratings'>Back</a>
            <div>
                <h2>You are currently viewing:</h2> <br/>
                <img src={trackInfo.img} alt={trackInfo.album}></img> <br/>
                <b>Track Name:</b> {trackInfo.name} <br/>
                <b>By: </b>{trackInfo.artist} <br/>
                <b>From the Album:</b> {trackInfo.album}
            </div>
            <div>
                <form onSubmit={submitHandler}>
                    <label>
                        <br/>
                        <b>Your current rating is {currentRating}</b> <br/>
                        <b>Change your rating from 0 to 10: </b>
                        <select
                            value={rateValue}
                            onChange={(e) => setRateValue(e.target.value)}
                        >
                            {/* this could be automated to not take this much space */}
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                        </select>
                    </label>
                    <br/><br/>
                    <input type="submit" value="Change Rating" />
                    <button onClick={deleteHandler}>Delete Rating</button>
                    <button onClick={cancelHandler}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditRate;