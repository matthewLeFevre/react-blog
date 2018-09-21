//React Library
import React from 'react';
import {Link} from 'react-router-dom';

import Globals from '../../services/global_service';

const Global = new Globals();

const PostDetail = props => {
  let date = new Date(props.post.articleCreated);
  return (
    <Link to={`/blog/post/${props.post.articleId}`} className="recent-post__detail">
      <h3>{props.post.articleTitle}</h3>
      <span>{date.toDateString()}</span>
      <div className="recent-post__img__cont">
        <img className="recent-post__img" src={
          props.post.articleImagePath
          ?  props.post.articleImagePath
          : "https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        } alt={props.post.assetName} />
      </div>
      
      <p>{Global.htmlDecode(props.post.articleSummary)}</p>
    </Link>
  );
}

export default PostDetail;