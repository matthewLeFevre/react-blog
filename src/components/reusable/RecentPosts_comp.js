import React from 'react';
import Globals from '../../services/global_service';

const Global = new Globals();

class RecentPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    return (
     <section className="recent-posts column--12 column--sml--6 column--lrg--4">
       <h2 className="recent-post__heading">RecentPosts</h2>
       <div className="post__container">
        {this.state.posts ? this.state.posts.map((val, index, arr)=> {
          return <PostTN val={val} key={Global.createRandomKey(7)} />;}) : ''}
       </div>
     </section>
    );
  }
}

export default RecentPosts;

const PostTN = (props) => {
  return (
    <div href="#" className="item-card">
      {/* <div className="item-card__header">
        <h4>Example Header</h4>
      </div> */}
      <div className="item-card__body">
        <img src={props.val.assetPath ? props.val.assetPath : "https://images.pexels.com/photos/101472/pexels-photo-101472.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} alt={props.articleTitle + "image"} className="item-card__img" />
        <div className="item-card__text">
          <h5 className="item-card__heading">{props.val.articleTitle}</h5>
          <p className="item-card__description">{props.val.articleSummary ? props.val.articleSummary : "Lorum ipsum dolor profundis Lorume ispsume dolor profunids"}</p>
        </div>
      </div>
      <div className="item-card__footer">
          <button type="button" className="btn action tiny isLink hoverable">Edit</button>
          <button type="button" className="btn action-alt tiny isLink hoverable">Publish</button>
          <button type="button" className="btn danger tiny isLink hoverable">Delete</button>
      </div>
    </div>
  );
}