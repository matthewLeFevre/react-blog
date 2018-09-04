import React from 'react';
import {Link} from 'react-router-dom';

//Service Imports
import Globals from '../../services/global_service';

//Service Variables
const Global = new Globals();

class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      refreshPosts: '',
      search: '',
    }

    this.updateSearch = this.updateSearch.bind(this);
  }

  //Grab all of the posts created by the authenticated user
  componentDidMount() {
    fetch(`${Global.url}?controller=article&action=getArticlesByUserId&userId=${this.props.userData.userId}&apiToken=${this.props.userData.apiToken}`)
    .then(response => response.json())
    .then( (response) => {
      this.setState({posts: response.data,});
    });
  }

  componentWillReceiveProps(newProps) {
    console.log('recieving props');
    console.log("=========================");
    console.log(newProps.refreshPosts);
    console.log(this.state.refreshPosts);
    if(newProps.refreshPosts !== this.state.refreshPosts) {
      this.setState({refreshPosts: newProps.refreshPosts});
      fetch(`${Global.url}?controller=article&action=getArticlesByUserId&userId=${this.props.userData.userId}&apiToken=${this.props.userData.apiToken}`)
      .then(response => response.json())
      .then( (response) => {
        console.log('went to fetch posts');
        this.setState({posts: response.data,});
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
                  return <PostCard apiToken={this.props.userData.apiToken} deletePost={this.props.deletePost} article={post} key={Global.createRandomKey(7)} />
                } else {
                  return '';
                }
              } else {
                return <PostCard apiToken={this.props.userData.apiToken} deletePost={this.props.deletePost} article={post} key={Global.createRandomKey(7)} />
              }
            }) 
            : ''
          }
        </div>
      </section>
    );
  }
}

export default AllPosts;

//================================
// Functional Components
//================================

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleStatus: this.props.article.articleStatus,
    }
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
  }

  handleStatusUpdate() {
    // Article status can be infered before
    // recieving data from the server but
    // should be confirmed when the server
    // sends the response
    let articleStatus;
    if(this.state.articleStatus === "published") {
      articleStatus = "saved";
    } else {
      articleStatus = "published";
    }

    // creating the data payload
    const payload = {
      articleId: this.props.article.articleId,
      apiToken: this.props.apiToken,
      articleStatus: articleStatus,
    };

    // creating the request body
    const body = Global.createBody("article", "updateArticleStatus", payload);

    // finalizing request by adding headers
    const req = Global.createRequest(body);

    // Sending the request
    fetch(Global.url, req)
    .then(request => request.json())
    .then(response => {
      // Without having to fetch the article from the 
      // server again we if the operation was successful
      // we know what the article has been updated to
      if(response.status === 'success') {
        this.setState({
          articleStatus: articleStatus,
        });
      } else {
        this.props.handleAlert(response.message, response.status);
      }
    });
  }

  render() {
    return (
      <div className="control-card">
        <div className={this.state.articleStatus === "published" ? "control-card__status bg-green" : "control-card__status bg-blue"}></div>
        <div>
        <div className="control-card__body">
          <img src={this.props.article.articleImagePath 
                ? this.props.article.articleImagePath 
                : "https://images.pexels.com/photos/101472/pexels-photo-101472.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} 
            alt={this.props.article.articleTitle + " image"} 
            className="item-card__img" />
          <div className="control-card__text">
            <h5 className="control-card__heading">{`${this.props.article.articleTitle.slice(0, 17)}...`}</h5>
            <p className="control-card__description">{this.props.article.articleSummary ? `${this.props.article.articleSummary.slice(0, 60)}...` : "Lorum ipsum dolor profundis Lorume ispsume dolor profunids"}</p>
          </div>
        </div>
        <div className="control-card__footer force-btn">
          {this.state.articleStatus === "saved"
            ? <button type="button" onClick={this.handleStatusUpdate} className="btn primary tiny breath">Private</button>
            : <button type="button" onClick={this.handleStatusUpdate} className="btn success tiny breath">Published</button>}
          <Link to={`/dashboard/postEdit/${this.props.article.articleId}`} className="btn action tiny breath">Edit</Link>
          <button 
            type="button" 
            className="btn danger tiny breath" 
            onClick={this.props.deletePost} 
            value={this.props.article.articleId}>
            Delete
          </button>
        </div>
        </div>
      </div>
    );
  }
}