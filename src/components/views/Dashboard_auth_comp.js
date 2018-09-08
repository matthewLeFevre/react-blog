//================================
// Imports
//================================

//React Library
import React from 'react';
import {Switch, Route} from 'react-router-dom';

// View Component Imports
import CreatePost from '../views/Create_Post_auth_comp';
import CreateAsset from '../views/Create_Asset_auth_comp';
import DashboardProfile from '../views/Dashboard_profile_comp';

//================================
// Dashboard
//================================

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: null,
      selectedPost: null,
    }
  }

  render() {

    return(
      
      <section className="grid--nested column--12">
        <Switch>
          <Route 
            path="/dashboard/profile"
            render={(props) => <DashboardProfile handleImgPreview={this.props.handleImgPreview} handleAlert={this.props.handleAlert} {...props} userData={this.props.userData} />}/>
          {/* <Route 
            path="/dashboard/messages" 
            render={(props) => <h1> You made it to messages </h1> }/>
          <Route 
            path="/dashboard/settings" 
            render={(props) => <h1> You made it to settings </h1> }/> */}
          <Route 
            path="/dashboard/createPost"
            render={(props) => <CreatePost handleAlert={this.props.handleAlert}{...props} userData={this.props.userData} /> }/>
          <Route 
            path="/dashboard/createAsset"
            render={(props) => <CreateAsset handleAlert={this.props.handleAlert}{...props} userData={this.props.userData} /> }/>
          <Route 
            path="/dashboard/postEdit/:id" 
            render={(props) => <CreatePost handleAlert={this.props.handleAlert}{...props} edit={true} userData={this.props.userData} /> }/>
        </Switch>
      </section>
    );
  }
 }

export default Dashboard;