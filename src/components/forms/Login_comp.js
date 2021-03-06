//================================
// Imports
//================================

//React Library
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

//Service Imports
import Globals from '../../services/global_service';

//Service Variables
const Global = new Globals();

//================================
// Login Class
//================================

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: false,
      email: '',
      password: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
 
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.setState({
      [name]: value
    });
  }

  handleLogin(event) {
    if(this.state.email === '' || this.state.password === '') {
      this.setState({
        password: '',
      });
      this.props.handleAlert("Please fill in both password and email fields.", "error");
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
        // headers: Global.header,
        headers: {},
        body: JSON.stringify(data),
      };
      fetch(Global.url, myInit)
      .then(response => response.json())
      .then(data => {
        if(data.status === "success") {
          this.props.onLogin(data.data);
          this.setState({ 
            userIsLoggedIn: true,
          });
        } else {
          this.props.handleAlert(data.message, "error");
        } 
      });
    }
  }

  render(){
    if(this.state.userIsLoggedIn) {
      return <Redirect to="/dashboard/profile" />;
    }
    return (
      <div className="column--12">
        {this.state.showAlert
          ? this.state.alert
          : ''
        }
      <section className="login__container bg-theme-red page__full-height">
        <div className="login__form__container">
          <form className="form--sml">
            <div className="form__field">
              <label className="form__label mdm">Email</label>
              <input 
                name="email" 
                className="input--text full main" 
                type="text" 
                value={this.state.email}
                onChange={this.handleInputChange}
                autoComplete="on"/>
            </div>
            <div className="form__field">
              <label className="form__label mdm">Password</label>
              <input 
                name="password" 
                className="input--text full main" 
                type="password" 
                value={this.state.password}
                onChange={this.handleInputChange}
                autoComplete="on"/>
            </div>
            {/* <fieldset className="form__field">
              <label className="form__label side">Stay LoggedIn</label>
              <input className="input--checkbox" 
                type="checkbox" 
                id="stayLoggedIn"
                name="stayLoggedIn" />
              <label className="label--checkbox" htmlFor="stayLoggedIn"></label>
            </fieldset> */}
            <div className="form__field">
              <button onClick={this.handleLogin} type="button" className="btn primary sml">Login</button>
              {/* <Link to="/register" className="btn primary isLink sml">Create Account</Link> */}
            </div>
          </form>
        </div>
      </section>
      </div>
    );
  };
}

//Export Statement
export default Login;