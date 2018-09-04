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
            <span className="dashboard__toolbar__words">Dashboard</span>
          </Link>
          <Link
            className="sml dashboard__toolbar__link" 
            to={'/dashboard/createAsset'}
            title="Create an Asset"> 
            <i className="fas fa-file-image"></i>
            <span className="dashboard__toolbar__words">Upload Images</span>
          </Link>
          <Link 
            className="sml dashboard__toolbar__link" 
            to={'/dashboard/createPost'}
            title="Create Blog Post"> 
            <i className="dashboard__toolbar__icon fas fa-edit"></i>
            <span className="dashboard__toolbar__words">Create Posts</span>
          </Link>
        </div>
    );
  }
}

//Export Statement
export default DashboardToolbar;