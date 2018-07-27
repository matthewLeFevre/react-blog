import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../reusable/alert_comp';
const url= 'http://site2/server.php';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: '',
      password: '',
      alerts: [],
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange(event) {
    // I should probably look for a safer way to 
    // store passwords so that they are not so easily 
    // accessible in the js
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.setState({
      [name]: value
    });
  }

  createRandomKey(length) {
    let id = "";
    let possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      id += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    return id;
  }

  handleLogin(event) {

    if(this.state.email === false || this.state.password === false) {
      let joined = this.state.alerts;
          joined.push(<Alert key={this.createRandomKey(6)} classes="alert--closeable bg-red txt-white" message="Please fill in both password and email fields." />);
      this.setState({
        password: '',
        alerts: joined,
      });
      
      return;
    } else {
      const data = {
        controller: "user",
        action: "loginUser",
        payload: {
          userEmail: this.state.email,
          userPassword: this.state.password,
        }
      };
      const myInit = {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      };
      this.setState({
        password: ''
      });
      fetch(url, myInit)
      .then(response => response.json())
      .then(data => {

        // alerts are still not functioning exactly as I would like
        if(data.status === "success") {
          let joined = this.state.alerts;
          joined.push(<Alert key={this.createRandomKey(6)} classes="alert--closeable bg-green txt-white" message={data.message} />);
          this.setState({ 
            alerts: joined,
            loggedIn: true,
          });
          this.props.onLogin(data.data);
        } else if(data.status === "failure") {
          let joined = this.state.alerts;
          joined.push(<Alert key={this.createRandomKey(6)} classes="alert--closeable bg-red txt-white" message={data.message} />); 
          this.setState({ alerts: joined,});

        } else {
          let joined = this.state.alerts;
          joined.push(<Alert key={this.createRandomKey(6)} classes="alert--closeable bg-yellow txt-white" message={data.message} />); 
          this.setState({ alerts: joined,});
        }

      });
    }
  }

  render(){

    if(this.state.loggedIn) {
      return <Redirect to='/dashboard' />
    }
    return (
      
      <div className="column--12">
        {this.state.alerts[this.state.alerts.length - 1]}
      <section className="login__container bg-theme-red ">
        <div className="login__form__container">
          <form className="form--sml">
            <div className="form__field">
              <label className="form__label mdm">Email/User Name</label>
              <input 
                name="email" 
                className="input--text full main" 
                type="text" 
                value={this.state.email}
                onChange={this.handleInputChange}/>
            </div>
            <div className="form__field">
              <label className="form__label mdm">Password</label>
              <input 
                name="password" 
                className="input--text full main" 
                type="password" 
                value={this.state.password}
                onChange={this.handleInputChange}/>
            </div>
            <fieldset className="form__field">
              <label className="form__label side">Stay LoggedIn</label>
              <input className="input--checkbox" 
                type="checkbox" 
                id="stayLoggedIn"
                name="stayLoggedIn" />
              <label className="label--checkbox" htmlFor="stayLoggedIn"></label>
            </fieldset>
            <div className="form__field">
              <button onClick={this.handleLogin} type="button" className="btn primary sml">Login</button>
              <Link to="/register" className="btn primary isLink sml">Register</Link>
            </div>
          </form>
        </div>
      </section>
      </div>
    );
  };
}
export default Login;