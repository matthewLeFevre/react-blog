import React from 'react';
import {Link} from 'react-router-dom';

class DashboardToolbar extends React.Component { 
  render() {
    return (
      <div className="bg-theme-orange dashboard__toolbar column--4--sml column--6--tiny column--12">
        <Link 
            className="sml dashboard__toolbar__link" 
            to={'/dashboard'}
            title="Dashboard"> 
            Dashboard
            {/* <i className="dashboard__toolbar__icon fas fa-columns"></i> */}
          </Link>
          <Link
            className="sml dashboard__toolbar__link" 
            to={'/dashboard/messages'}
            title="Messages"> 
            Messages
            {/* <i className="dashboard__toolbar__icon far fa-envelope"></i> */}
          </Link>
          <Link 
            className="sml dashboard__toolbar__link" 
            to={'/dashboard/create'}
            title="Create Blog Post"> 
            Post
            {/* <i className="dashboard__toolbar__icon fas fa-edit"></i> */}
          </Link>
          <Link 
            className="sml dashboard__toolbar__link" 
            to={'/dashboard/settings'}
            title="Settings"> 
            Settings
          {/* <i className="dashboard__toolbar__icon fas fa-cog"></i> */}
          </Link>
        </div>
    );
  }
}

export default DashboardToolbar;