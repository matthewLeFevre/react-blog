//================================
// Imports
//================================

//React Library
import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';

//Static layout component imports
import Header from './components/layout/Header_comp';
import Footer from './components/layout/Footer_comp';
import DashboardToolbar from './components/layout/Dashboard_toolbar_comp';

//Whole view imports
import Home from './components/views/Home_comp';
import Blog from './components/views/Blog_comp';
import Post from './components/views/Post_comp';
import Dashboard from './components/views/Dashboard_auth_comp';

//Form component imports
import Login from './components/forms/Login_comp';
import Register from './components/forms/Register_comp';

//================================
// App Class
//================================

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { userIsLoggedIn: false,};
    this.onLogin = this.onLogin.bind(this);
  }

  // function checkLogin
  // - Checks local storage for a JWT
  // - If JWT is found send it to server
  // - If the server determins it valid it will send user data
  // - If userdata returned render views for loggedin user

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
            <Route 
              exact={true} 
              path="/" 
              component={Home} />
            <Route 
              exact={true} 
              path="/blog" 
              component={Blog} />
              <Route 
              path="/blog/post/:id" 
              render={(props) => <Post {...props} />} />
            <Route 
              path="/login" 
              render={(props) => <Login {...props} onLogin={this.onLogin} />} />
            <Route 
              path="/register" 
              component={Register} />
            <Route 
              path="/dashboard" 
              render={(props) =>
                this.state.userIsLoggedIn
                ? <Dashboard {...props} userData={this.state.userData}/> 
                : <Redirect to="/login" />
              }/>
          </Switch>
          
        </main>
        <Footer auth={this.state.userIsLoggedIn}/>
      </div>
    );
  }
}






export default App;