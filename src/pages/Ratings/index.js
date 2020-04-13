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
            return ratingsListHandler(data);
        })
        .catch((err) => {
            return console.error(err);
        })
    }, []);

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
                        Rating: {array.rating} <i>View</i>
                    </li>
                );
            }))
        }
        console.log(ratingsList);
    };

    return (
        <div>
            <h1>Ratings</h1>
            <div>
                <h2>Track ratings:</h2>
                {ratingsList}
            </div>
        </div>
    );
};

export default Ratings;