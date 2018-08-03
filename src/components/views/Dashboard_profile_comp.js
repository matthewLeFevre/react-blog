import React from 'react';
import {Link} from 'react-router-dom';
import RecentPosts from '../reusable/RecentPosts_comp';
import Globals from '../../services/global_service';

const Global = new Globals();

class DashboardProfile extends React.Component {
  render() {
    return (
      <div className="column--12 grid--nested">
        <RecentPosts userData={this.props.userData}/>
        <AllPosts userData={this.props.userData}/>
      </div>
    );
  }
}

class AllPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }
  componentDidMount() {
    fetch(`${Global.url}?controller=article&action=getArticlesByUserId&userId=${this.props.userData.userId}`)
    .then(response => response.json())
    .then( (data) => {
      this.setState({
        posts: data.data,
      });
    });
  }
  render() {
    return(
      <section className="column--12 column--sml--6 column--lrg--8">
        <h2>Edit posts from a glance</h2>
        <div className="all-posts__container">
          { this.state.posts ? this.state.posts.map((post) => {
            return <PostCard post={post} key={Global.createRandomKey(7)} />
          }) : ''}
        </div>
      </section>
    );
  }
}

const PostCard = (props) => {
  return (
    <div className="item-card card">
      <div className={props.post.articleStatus === "published" ? "item-card__header bg-green" : "item-card__header bg-blue"}>
        {props.post.articleStatus}
      </div>
      <div className="item-card__body">
        <img src={props.post.assetPath ? props.post.assetPath : "https://images.pexels.com/photos/101472/pexels-photo-101472.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} alt={props.post.articleTitle + " image"} className="item-card__img" />
        <div className="item-card__text">
          <h5 className="item-card__heading">{props.post.articleTitle}</h5>
          <p className="item-card__description">{props.post.articleSummary ? props.post.articleSummary : "Lorum ipsum dolor profundis Lorume ispsume dolor profunids"}</p>
        </div>
      </div>
      <div className="item-card__footer">
        <Link to={`/dashboard/postEdit/${props.post.articleId}`} className="btn action tiny isLink hoverable full">Edit</Link>
        { props.post.articleStatus === "saved"
          ?<button type="button" className="btn action-alt tiny isLink hoverable full">Publish</button>
          :<button type="button" className="btn action-alt tiny isLink hoverable full">UnPublish</button>}
        <button type="button" className="btn danger tiny isLink hoverable full">Delete</button>
      </div>
    </div>
  );
}

export default DashboardProfile;