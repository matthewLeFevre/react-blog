//================================
// Imports
//================================

//React Library
import React from 'react';
import {Link} from 'react-router-dom';

//Reusable Component Imports
import AllPhotos from '../reusable/AllPhotos_comp';

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
      alert: '',
      showAlert: false,
      refreshPosts: '',
      refreshPhotos: '',
    }
    this.deletePost = this.deletePost.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  hideAlert() {
    this.setState({
      showAlert: false,
    });
  }

  deletePost(e) {
    let data = {
        articleId: e.target.value,
        apiToken: this.props.userData.apiToken,
    }

    let body = Global.createBody('article', 'deleteArticle', data);
    let req = Global.createRequest(body);

    fetch(Global.url, req) 
    .then(response => response.json())
    .then(data => {
      if(data.staus === 'success') {
        this.setState({
          refreshPosts: Global.createRandomKey(7),
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
      if(data.staus === 'success') {
        this.setState({
          refreshPhotos: Global.createRandomKey(7),
        });
      } 
      this.props.handleAlert(data.message, data.status);
    });
  }

  render() {
    return (
      <div className="column--12">
        {this.state.showAlert
          ? this.state.alert
          : ''
        }
        <div className="grid--nested">
          {/* <RecentPosts deletePost={this.deletePost} userData={this.props.userData}/> */}
          <AllPosts  handleAlert={this.props.handleAlert} refreshPosts={this.state.refreshPosts} deletePost={this.deletePost} userData={this.props.userData}/>
          <AllPhotos  handleAlert={this.props.handleAlert} refreshPhotos={this.state.refreshPhotos} deletePhoto={this.deletePhoto} userData={this.props.userData} />
        </div>
      </div>
    );
  }
}

//Export Statement
export default DashboardProfile;

//================================
// All Posts Class
//
// - This class should eventually
// get its own file so that it can
// be used elsewhere
//================================

class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      refreshPosts: false,
      search: '',
    }

    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    fetch(`${Global.url}?controller=article&action=getArticlesByUserId&userId=${this.props.userData.userId}`)
    .then(response => response.json())
    .then( (data) => {
      this.setState({posts: data.data,});
    });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.refreshPosts !== this.state.refreshPosts) {
      this.setState({refreshPosts: newProps.refreshPosts});
      fetch(`${Global.url}?controller=article&action=getArticlesByUserId&userId=${this.props.userData.userId}`)
      .then(response => response.json())
      .then( (data) => {
        this.setState({posts: data.data,});
      });
    }
  }

  updateSearch(e) {
    let search = e.target.value;
    this.setState({
      search: search,
    })
  }

  render() {
    return(
      <section className="all-posts__wrapper column--12 column--sml--6">
        <h2 className="lrg">All Posts</h2>
        <form>
          <fieldset className="form__field">
            <input placeholder="Search..." className="input--text main" type="search" onChange={this.updateSearch} /> 
          </fieldset>
        </form>
        <div className="all-posts__container">
          { this.state.posts 
            ? this.state.posts.map((post) => {
              if(this.state.search !== '') {
                if (post.articleTitle.includes(this.state.search)) {
                  return <PostCard apiToken={this.props.userData.apiToken} deletePost={this.props.deletePost} post={post} key={Global.createRandomKey(7)} />
                } 
              } else {
                return <PostCard apiToken={this.props.userData.apiToken} deletePost={this.props.deletePost} post={post} key={Global.createRandomKey(7)} />
              }
            }) 
            : ''
          }
        </div>
      </section>
    );
  }
}

//================================
// Functional Components
//================================

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleStatus: this.props.post.articleStatus,
    }
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
  }

  handleStatusUpdate() {
    let articleStatus;
    if(this.state.articleStatus === "published") {
      articleStatus = "saved";
    } else {
      articleStatus = "published";
    }

    const payload = {
      articleId: this.props.post.articleId,
      apiToken: this.props.apiToken,
      articleStatus: articleStatus,
    };
    const body = Global.createBody("article", "updateArticleStatus", payload);

    const req = Global.createRequest(body);

    fetch(Global.url, req)
    .then(request => request.json())
    .then(data => {
      if(data.status === 'success') {
        this.setState({
          articleStatus: articleStatus,
        });
      } else {
        this.props.handleAlert(data.message, data.status);
      }
    });
  }

  render() {
    return (
      <div className="item-card">
        <div className={this.state.articleStatus === "published" ? "item-card__header bg-green" : "item-card__header bg-blue"}>
          {this.state.articleStatus}
        </div>
        <div className="item-card__body">
          <img src={this.props.post.articleImagePath ? this.props.post.articleImagePath : "https://images.pexels.com/photos/101472/pexels-photo-101472.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} alt={this.props.post.articleTitle + " image"} className="item-card__img" />
          <div className="item-card__text">
            <h5 className="item-card__heading">{this.props.post.articleTitle}</h5>
            <p className="item-card__description">{this.props.post.articleSummary ? this.props.post.articleSummary : "Lorum ipsum dolor profundis Lorume ispsume dolor profunids"}</p>
          </div>
        </div>
        <div className="item-card__footer force-btn">
          <Link to={`/dashboard/postEdit/${this.props.post.articleId}`} className="btn action tiny breath">Edit</Link>
          {this.state.articleStatus === "saved"
            ? <button type="button" onClick={this.handleStatusUpdate} className="btn action-alt tiny breath">Publish</button>
            : <button type="button" onClick={this.handleStatusUpdate} className="btn action-alt tiny breath">UnPublish</button>}
          <button type="button" className="btn danger tiny breath" onClick={this.props.deletePost} value={this.props.post.articleId}>Delete</button>
        </div>
      </div>
    );
  }
}