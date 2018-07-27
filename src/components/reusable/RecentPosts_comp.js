import React from 'react';
import Globals from '../../services/global_service';

const Global = new Globals;

class RecentPosts extends React.Component {
  constructor(props) {
    super(props);
    this.getPosts = this.getPosts.bind(this);
    this.state = {
      posts: this.getPosts(4),
    }
  }

  getPosts(number) {
    let posts;
    // fetch(`${Global.url}?controller=article&action=getArticlesByUserId&userId=${this.props.userId}`)
    fetch(`${Global.url}?controller=article&action=getArticlesByUserId&userId=1`)
    .then(response => response.json())
    .then(data => console.log(data));
    
    return posts;
  }
  render() {
    return (
     <section className="recent-posts column--12 column--sml--6 column--mdm--12 column--lrg--4">
       <h2 className="recent-post__heading">RecentPosts</h2>
       <div className="post__container">
        <PostTN />
        <PostTN />
        <PostTN />
        <PostTN />
       </div>
     </section>
    );
  }
}

export default RecentPosts;

const PostTN = () => {
  return (
    <a href="#" className="item-card">
      {/* <div className="item-card__header">
        <h4>Example Header</h4>
      </div> */}
      <div className="item-card__body">
        <img src="https://images.pexels.com/photos/101472/pexels-photo-101472.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" className="item-card__img" />
        <div className="item-card__text">
          <h5 className="item-card__heading">Blog Title</h5>
          <p className="item-card__description">Lorum ipsum dolor profundis Lorume ispsume dolor profunids</p>
        </div>
      </div>
      <div className="item-card__footer">
          <a className="btn action tiny isLink hoverable">Edit</a>
          <a className="btn action-alt tiny isLink hoverable">Publish</a>
          <a className="btn danger tiny isLink hoverable">Delete</a>
      </div>
    </a>
  );
}