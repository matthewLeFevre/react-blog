import React from 'react';
import {
  Route,
  Switch,
  Link, 
  Redirect
} from 'react-router-dom';

import Header from './components/layout/Header_comp';
import Footer from './components/layout/Footer_comp';

import Home from './components/views/Home_comp';
import Login from './components/forms/Login_comp';
import Register from './components/forms/Register_comp';
import Dashboard from './components/views/Dashboard_auth_comp';
import CreatePost from './components/views/Create_Post_auth_comp';


// import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: false,
      userData: {
        userId: false,
        userName: '',
        userEmail: '',
        userToken: '',
      },
      
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(data) {
    let getData = data;
    this.setState({
      userIsLoggedIn: true,
      userData: {
        userId: getData.userId,
        userStatus: getData.userStatus,
        userName: getData.userName,
        userEmail:getData.userEmail,
        userToken: getData.apiToken,
      },
    });
  }

  render() {

    return (
      <div className="App">
        <Header />
        <main className="grid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route 
              path="/login" 
              render={(props) => <Login onLogin={this.onLogin} />} />
            <Route path="/register" component={Register} />
            <Route 
              path="/dashboard" 
              render={(props) => <Dashboard data={this.state.userData}/> }/>
              {/* Change this path back to being under dashboard */}
              <Route 
              path="/create"
              exact 
              render={(props) => <CreatePost /> }/>
          </Switch>
        </main>
        {/* <Footer auth={this.state.userIsLoggedIn}/> */}
      </div>
    );
  }
}






export default App;