import React from 'react';
import RecentPosts from '../reusable/RecentPosts_comp';

class DashboardProfile extends React.Component {
  render() {
    return (
      <div className="column--12 grid--nested">
        <RecentPosts userData={this.props.userData}/>
      </div>
    );
  }
}

export default DashboardProfile;