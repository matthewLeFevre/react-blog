import React from 'react';
import { Link } from 'react-router-dom';

const url= 'http://site2/server.php';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      userPassword: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
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

  handleRegister(event) {
    event.preventDefault();
    if(this.state.userEmail == null || this.state.userPassword == null) {
      // throw an error and an alert
      this.setState({
        password: ''
      });
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
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      };
      // this.setState({
      //   password: ''
      // });
      fetch(url, myInit)
      .then(response => response.json())
      .then(data => console.log(data));
    }
  }

  render(){
    return (
      <section className="bg-theme-red login__container">
        <div className="login__form__container">
          <form className="form--sml">
            <h1 class="mdm">Register an account</h1>
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
    );
  };
}
export default Register;