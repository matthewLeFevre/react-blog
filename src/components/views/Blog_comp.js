import React from 'react';

import Globals from '../../services/global_service';
import PostDetail from '../reusable/PostDetail_comp';

let Global = new Globals();

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
  }
  render() {
    return (
      <section className="page__full-height column--12">
        <BlogToolbar />
        <BlogsAll />
      </section>
    )
  }
}

const BlogToolbar = (props) => {
  return(
    <div></div>
  );
}

class BlogsAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
  }

  componentDidMount() {
    fetch(`${Global.url}?controller=article&action=getPublishedArticles&articleNumber=6`)
    .then(response => response.json())
    .then( (articles) => {
      this.setState({
        articles: articles.data
      });
    })
  }
  render() {
    return(
      <div className="blog__grid">
        {this.state.articles  
          ? this.state.articles
            .map ( article =>{
              return <PostDetail post={article} key={Global.createRandomKey(7)} />
            })
          : ''
        }
      </div>
    );
  }
}

export default Blog;