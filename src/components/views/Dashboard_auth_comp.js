import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import DashboardToolbar from '../layout/Dashboard_toolbar_comp';
import RecentPosts from '../reusable/RecentPosts_comp';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    console.log(this.props);

    // protects the route need to find a way to streamline this
    // if(!this.props.data.userId) {
    //    return <Redirect to="/login" />;
    // }

    return(
      <section className="grid--nested column--12">
        <DashboardToolbar />
        <RecentPosts userId={this.props.userId} />
        <Switch>
          <Route 
            path="/dashboard/messages" 
            render={(props) => <h1> You made it to messages </h1> }/>
            <Route 
            path="/dashboard/settings" 
            render={(props) => <h1> You made it to settings </h1> }/>
        </Switch>
      </section>
    );
  }
 }

export default Dashboard;