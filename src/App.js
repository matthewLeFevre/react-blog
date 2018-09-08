//================================
// Imports
//================================

//React Library
import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';

//Static layout component imports
import Header from './components/layout/Header_comp';
import Footer from './components/layout/Footer_comp';
import DashboardToolbar from './components/layout/Dashboard_toolbar_comp';

//Whole view imports
import Home from './components/views/Home_comp';
import Blog from './components/views/Blog_comp';
import AboutMe from './components/views/AboutMe_comp';
import Post from './components/views/Post_comp';
import Dashboard from './components/views/Dashboard_auth_comp';
import PageNotFound from './components/views/PageNotFound_comp';
import Gallery from './components/views/Gallery_comp';

//Reusable Component Imports
import Alert from './components/reusable/alert_comp';
import ImgPreview from './components/reusable/imagePreview_comp';

//Form component imports
import Login from './components/forms/Login_comp';
// import Register from './components/forms/Register_comp';

// Trying to figure out Google analytics

ReactGA.initialize();

const history = createHistory();
history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

//================================
// App Class
//================================

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      alert: '',
      showAlert: false,
      userIsLoggedIn: false,
      imgPreview: '',
      showImgPreview: false,
    };
    this.onLogin = this.onLogin.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.handleImgPreview = this.handleImgPreview.bind(this);
    this.hideImgPreview = this.hideImgPreview.bind(this);
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


  // Functions Handle Alerts for whole application
  hideAlert() {this.setState({showAlert: false,});}

  handleAlert(message, alertType, closable = true) {
    let alertClasses;

    if(alertType === 'success') {
      alertClasses = "bg-green txt-white";
    } else {
      alertClasses = "bg-red txt-white";
    }

    if(closable) {
      alertClasses += alertClasses + " alert--closeable";
    } else {
      alertClasses += alertClasses + " alert";
    }

    this.setState({
      alert: <Alert hideAlert={this.hideAlert} classes={alertClasses} message={message} />,
      showAlert: true,
    });
  }

  hideImgPreview() {this.setState({showImgPreview: false,});}

  handleImgPreview(e) {
    console.log(e.target);
    this.setState({
      imgPreview: <ImgPreview assetPath={e.target.src} assetName={e.target.alt} closePreview={this.hideImgPreview} />,
      showImgPreview: true,
    })
  }

  render() {       
    return (
      <div className="App">
        <Header />
        <main className="grid">
        {this.state.showAlert 
          ? this.state.alert 
          : ''}
        {this.state.showImgPreview
          ? this.state.imgPreview
          : ''}
        {this.state.userIsLoggedIn 
          ? <DashboardToolbar /> 
          : ''}
          <Switch>
            <Route 
              exact={true} 
              path="/" 
              component={Home} />

            <Route 
              exact={true} 
              path="/about" 
              component={AboutMe} />

            <Route 
              exact={true} 
              path="/gallery" 
              render={(props) => <Gallery 
                                  {...props} 
                                  handleImgPreview={this.handleImgPreview} />} />

            <Route 
              exact={true} 
              path="/blog" 
              component={Blog} />

            <Route 
              path="/blog/post/:id" 
              render={(props) => <Post {...props} />} />

            <Route 
              path="/login" 
              render={(props) => 
                <Login {...props} 
                  onLogin={this.onLogin} 
                  handleAlert={this.handleAlert}/>
            }/>

            {/* <Route 
              path="/register" 
              render={(props) => <Register {...props} handleAlert={this.handleAlert}/>} /> */}

            <Route 
              path="/dashboard" 
              render={(props) =>
                this.state.userIsLoggedIn
                ? <Dashboard {...props} 
                    handleAlert={this.handleAlert}
                    handleImgPreview={this.handleImgPreview} 
                    userData={this.state.userData}/> 
                : <Redirect to="/login" />
              }/>

            <Route component={PageNotFound} />

          </Switch>
        </main>
        <Footer auth={this.state.userIsLoggedIn}/>
      </div>
    );
  }
}






export default App;