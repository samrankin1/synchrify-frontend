import React, {Component} from "react";
import md5 from '../md5';

class SignUp extends Component {
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={this.handleChange}
          />
          <button type="submit">Login</button>
        </form>
        <a href='/'>Home</a>
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
    fetch('http://127.0.0.1:8000/register/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    })
    .then(resp => resp.json())
    .then((data) => {
      if (typeof data.error != 'undefined') {
        console.log('Error:', data.error);
      } else {
        console.log('Success!');
        window.location.href = '/';
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }
}

export default SignUp;

