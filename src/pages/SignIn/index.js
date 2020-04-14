import React, { Component } from 'react';
import history from '../../services/history';
import md5 from '../md5';
import "../../index.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    const { email, password } = this.state;
    return (
    <div>
    <div className ="header">
      <a href='/dashboard' className = "logo">Synchrify</a>
      </div>

      <div class = "main-container primary">
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit} class = 'form-signin'>
          <label htmlFor="email" class = "black">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={this.handleChange}
            class = 'form-control'
          />
          <label htmlFor="email" class = "black">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={this.handleChange}
            class = 'form-control'
          />
          <button type="submit" class = 'btn'>Login</button>

          <div class = 'footnote'>
          <a href='/register' class = 'veryBottomBTN'>Register</a>
          </div>
        </form>
      </div>

      <footer>
		    <p>&#169;2020 Group 1</p>
	    </footer>
</div>
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state;
    data.password = md5(data.password);
    console.log("Submitting");
    console.log(data);
    console.log(JSON.stringify(data));
    fetch('https://synchapi.samrank.in/login/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    })
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((data) => {
      if (typeof data.error != 'undefined') {
        console.log('Error:', data.error);
      } else {
        console.log('Success!');
        history.push('/dashboard');
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }
}

export default SignIn;
