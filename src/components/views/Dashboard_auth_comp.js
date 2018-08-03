import React from 'react';
import {Switch, Route} from 'react-router-dom';
import CreatePost from '../views/Create_Post_auth_comp';
import CreateAsset from '../views/Create_Asset_auth_comp';
import DashboardProfile from '../views/Dashboard_profile_comp';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: null,
      selectedPost: null,
      userId: this.props.userData.userId,
      userStatus: this.props.userData.userStatus,
      userName: this.props.userData.userName,
      userEmail:this.props.userData.userEmail,
      apiToken: this.props.userData.apiToken,
    }
  }

  // componentWillReceiveProps() {
  //   this.setState({
  //     userData: {
  //       userId: this.props.userData.userId,
  //       userStatus: this.props.userData.userStatus,
  //       userName: this.props.userData.userName,
  //       userEmail:this.props.userData.userEmail,
  //       apiToken: this.props.userData.apiToken,
  //     }
  //   });
  //   console.log(this.props);
  // }
  render() {
    // protects the route need to find a way to streamline this
    
      // if(this.props.userData.userId === false) {
      //   return <Redirect to="/login" />;
      // } 
    return(
      
      <section className="grid--nested column--12">
        {/* <DashboardToolbar /> */}
        <Switch>
          <Route 
            path="/dashboard/profile"
            render={(props) => <DashboardProfile {...props} userData={this.props.userData} />}/>
          <Route 
            path="/dashboard/messages" 
            render={(props) => <h1> You made it to messages </h1> }/>
          <Route 
            path="/dashboard/settings" 
            render={(props) => <h1> You made it to settings </h1> }/>
          <Route 
            path="/dashboard/createPost"
            render={(props) => <CreatePost {...props} userData={this.props.userData} /> }/>
          <Route 
            path="/dashboard/createAsset"
            render={(props) => <CreateAsset {...props} userData={this.props.userData} /> }/>
          <Route 
            path="/dashboard/postEdit/:id" 
            render={(props) => <CreatePost {...props} edit={true} userData={this.props.userData} /> }/>
        </Switch>
      </section>
    );
  }
 }

export default Dashboard;