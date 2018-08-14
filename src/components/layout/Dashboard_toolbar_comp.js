//================================
// Imports
//================================

//React Library
import React from 'react';
import {Link} from 'react-router-dom';

//================================
// DashboardToolbar Class
//================================

class DashboardToolbar extends React.Component { 
  render() {
    return (
      <div className="bg-theme-orange dashboard__toolbar column--4--sml column--6--tiny column--12">
        <Link 
            className="sml dashboard__toolbar__link" 
            to={'/dashboard/profile'}
            title="Dashboard"> 
            <i className="dashboard__toolbar__icon fas fa-columns"></i>
          </Link>
          <Link
            className="sml dashboard__toolbar__link" 
            to={'/dashboard/messages'}
            title="Messages"> 
            <i className="dashboard__toolbar__icon far fa-envelope"></i>
          </Link>
          <Link
            className="sml dashboard__toolbar__link" 
            to={'/dashboard/createAsset'}
            title="Create an Asset"> 
            <i className="fas fa-file-image"></i>
          </Link>
          <Link 
            className="sml dashboard__toolbar__link" 
            to={'/dashboard/createPost'}
            title="Create Blog Post"> 
            <i className="dashboard__toolbar__icon fas fa-edit"></i>
          </Link>
          <Link 
            className="sml dashboard__toolbar__link" 
            to={'/dashboard/settings'}
            title="Settings"> 
          <i className="dashboard__toolbar__icon fas fa-cog"></i>
          </Link>
        </div>
    );
  }
}

//Export Statement
export default DashboardToolbar;