import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Header from './components/layout/Header_comp';
import Footer from './components/layout/Footer_comp';

import Home from './components/views/Home_comp';
import Login from './components/forms/Login_comp';
import Register from './components/forms/Register_comp';
import Dashboard from './components/views/Dashboard_auth_comp';
import DashboardToolbar from './components/layout/Dashboard_toolbar_comp';


// import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: false,
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(data) {
    this.setState({
      userIsLoggedIn: true,
      userData: {
        userId: data.userId,
        userStatus: data.userStatus,
        userName: data.userName,
        userEmail:data.userEmail,
        apiToken: data.apiToken,
      },
    });
  }

  render() {       
    return (
      <div className="App">
        <Header />
        <main className="grid">
        {this.state.userIsLoggedIn ? <DashboardToolbar /> : ""}
          <Switch>
          
            <Route exact={true} path="/" component={Home} />
            <Route 
              path="/login" 
              render={(props) => <Login {...props} onLogin={this.onLogin} />} />
            <Route path="/register" component={Register} />
            <Route 
              path="/dashboard" 
              render={(props) => <Dashboard {...props} userData={this.state.userData}/> }/>
          </Switch>
          
        </main>
        <Footer auth={this.state.userIsLoggedIn}/>
      </div>
    );
  }
}






export default App;