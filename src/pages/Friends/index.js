import React, { useState, useEffect } from 'react';
import history from '../../services/history';
import "../../index.css";

const Friends = () => {
    useEffect(() => {
        fetch('https://synchapi.samrank.in/friends/list', {
            method: 'GET',
            credentials: 'include',
          })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            return friendsListHandler(data);
          })
          .catch((err) => {
            return console.error(err);
          })
        fetch('https://synchapi.samrank.in/friends/pending', {
            method: 'GET',
            credentials: 'include',
          })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            //return console.log(data);
            return friendsPendingHandler(data);
          })
          .catch((err) => {
            return console.error(err);
          })
    }, []);

    const [friendsList, setFriendsList] = useState([]);
    const [friendsPending, setFriendsPending] = useState(false);
    const [friendsPendingList, setFriendsPendingList] = useState([]);
    const [friendName, setFriendName] = useState('');

    const friendsListHandler = (props) => {
        const array = [];
        if (props.friends.length === 0) {
            setFriendsList('No friends yet.');
        } else {
            // map this
            for (let i = 0; i < props.friends.length; i++) {
                array.push({
                    id: i,
                    value: props.friends[i]
                });
            }
            console.log(array);
            setFriendsList(array.map((array) => {
                const url = '/profile/'+array.value;
                return (
                          <li key = {array.id}>user_id: <a href={url}>{array.value}</a></li>
                    );
            }));
        }
    };

    const friendsPendingHandler = (props) => {
        if (props.pending.length > 0) {
            const array = [];
            setFriendsPending(true);
            for (let i = 0; i < props.pending.length; i++) {
                array.push({
                    id: i,
                    value: props.pending[i]
                });
            }
            console.log(array);
            setFriendsPendingList(array.map((array) => {
                // add url here
                return (
                    <li key = {array.id}>user_id: {array.value}</li>
                    );
            }));
        }
    }

    const handleAddFriend = (event) => {
        event.preventDefault();
        fetch('https://synchapi.samrank.in/friends/add/'+friendName, {
            method: 'GET',
            credentials: 'include',
          })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            return history.go(0);
          })
          .catch((err) => {
            return console.error(err);
          })
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

        <div class ="view-container">
            <h1>Friends</h1>
            <div>
                <br/>
                {friendsList}
                <br/>
            </div>
            <form onSubmit={handleAddFriend}>
                <label>
                    Add a friend:
                    <input
                        type="text"
                        value={friendName}
                        onChange={e => setFriendName(e.target.value)}
                    />
                </label>
                    <input type="submit" value="+" />
                </form>
            </div>
            {friendsPending &&
            <div>
                <br/>
                Friends pending:
                <br/>
                {friendsPendingList}
            </div>}
        </div>
    );
}

export default Friends;
