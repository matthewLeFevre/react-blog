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
// Register Class
//================================

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userIsRegistered: false,
      userName: '',
      userEmail: '',
      userPassword: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
 
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.setState({
      [name]: value
    });
  }

  handleRegister(event) {
    event.preventDefault();
    if(this.state.userEmail == null || this.state.userPassword == null) {
      this.props.handleAlert("Please fill in both password and email fields.", "error");
    } else {
      const data = {
        controller: "user",
        action: "registerUser",
        payload: {
          userEmail: this.state.userEmail,
          userPassword: this.state.userPassword,
          userName: this.state.userName
        }
      };
      const myInit = {
        method: 'POST',
        headers: Global.header,
        body: JSON.stringify(data),
      };
      fetch(Global.url, myInit)
      .then(response => response.json())
      .then(data => {
        if(data.status === "success") {
          this.props.handleAlert(data.message, "success");
        } else {
          this.props.handleAlert(data.message, "error");
        }
      });
    }
  }

  render(){
    if(this.state.userIsRegistered) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="column--12">
        {this.state.showAlert
          ? this.state.alert
          : ''
        }
        <section className="bg-theme-red login__container page__full-height">
          <div className="login__form__container">
            <form className="form--sml">
              <h1 className="mdm">Register an account</h1>
              <div className="form__field">
                <label className="form__label mdm">Email</label>
                <input 
                  name="userEmail" 
                  className="input--text full main" 
                  type="text" 
                  value={this.state.email}
                  onChange={this.handleInputChange}/>
              </div>
              <div className="form__field">
                <label className="form__label mdm">User Name</label>
                <input 
                  name="userName" 
                  className="input--text full main" 
                  type="text" 
                  value={this.state.userName}
                  onChange={this.handleInputChange}/>
              </div>
              <div className="form__field">
                <label className="form__label mdm">Password</label>
                <input 
                  name="userPassword" 
                  className="input--text full main" 
                  type="password" 
                  value={this.state.userPassword}
                  onChange={this.handleInputChange}/>
              </div>
              <div className="form__field">
                <button onClick={this.handleRegister} type="button" className="btn sml primary">Register</button>
                <Link to="/login" className="btn primary isLink sml">Login</Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  };
}

// Export Statement
export default Register;