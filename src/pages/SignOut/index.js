import React, { useEffect } from 'react';
import "../../index.css";

const SignOut = () => {
    useEffect(() => {
        fetch('http://127.0.0.1:8000/logout', {
                method: 'GET',
                credentials: 'include',
            })
            .then((resp) => {
                return resp.json();
            })
            .then(() => {
                window.location.href = '/';
            })
            .catch((err) => {
                return console.error(err);
            })
    });

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default SignOut;
