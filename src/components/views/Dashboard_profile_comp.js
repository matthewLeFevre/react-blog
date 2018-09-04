//================================
// Imports
//================================

//React Library
import React from 'react';

//Reusable Component Imports
import AllPhotos from '../reusable/AllPhotos_comp';
import AllPosts from '../reusable/AllPosts_comp';

//Service Imports
import Globals from '../../services/global_service';

//Service Variables
const Global = new Globals();

//================================
// DashboardProfile Class
//================================

class DashboardProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshPosts: '',
      refreshPhotos: '',
    }

    this.deletePost = this.deletePost.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
  }

  deletePost(e) {

    // Create data object of request
    let data = {
        articleId: e.target.value,
        apiToken: this.props.userData.apiToken,
    }

    // Attach data to appropriate controller and action
    let body = Global.createBody('article', 'deleteArticle', data);

    // Finilize request by adding headers
    let req = Global.createRequest(body);

    // Send request and process response
    fetch(Global.url, req) 
    .then(response => response.json())
    .then(data => {
      if(data.status === 'success') {
        this.setState({
          refreshPosts: Global.createRandomKey(21),
        });
      } 
      this.props.handleAlert(data.message, data.status);
    });
  }

  deletePhoto(e) {
    console.log(e.target.value);
    let data = {
      assetId: e.target.value,
      apiToken: this.props.userData.apiToken,
    }

    let body = Global.createBody('asset', 'deleteAsset', data);
    let req = Global.createRequest(body);

    fetch(Global.url, req) 
    .then(response => response.json())
    .then(data => {
      if(data.status === 'success') {
        this.setState({
          refreshPhotos: Global.createRandomKey(21),
        });
      } 
      this.props.handleAlert(data.message, data.status);
    });
  }

  render() {
    return (
      <div className="column--12 page__full-height">
        {this.state.showAlert
          ? this.state.alert
          : ''
        }
        <div className="grid--nested">
          <AllPosts  
            handleAlert={this.props.handleAlert} 
            refreshPosts={this.state.refreshPosts} 
            deletePost={this.deletePost} 
            userData={this.props.userData}/>
          <AllPhotos  
            handleAlert={this.props.handleAlert} 
            refreshPhotos={this.state.refreshPhotos} 
            deletePhoto={this.deletePhoto} 
            userData={this.props.userData} />
        </div>
      </div>
    );
  }
}

//Export Statement
export default DashboardProfile;