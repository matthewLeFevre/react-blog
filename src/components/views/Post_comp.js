import React from 'react';
import Globals from '../../services/global_service';

const Global = new Globals();

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.articleBody = React.createRef();
  }

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  componentDidMount() {
    fetch(`${Global.url}?controller=article&action=getArticleById&articleId=${this.props.match.params.id}`)
    .then(response => response.json())
    .then( (data) => {
      this.setState({
        articleTitle: data.data[0].articleTitle,
        articleSummary: data.data[0].articleSummary,
        articleBody: data.data[0].articleBody,
      },  ()=> this.articleBody.current.innerHTML = this.htmlDecode(this.state.articleBody));
    });
  }

  render() {
    return(
      <article className="column--12">
        <div>
          <h1>{this.state.articleTitle}</h1>
          <img src="https://images.pexels.com/photos/1095965/pexels-photo-1095965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="post__banner-img"  alt="waves in the sea"/>
        </div>
        <div ref={this.articleBody}>
          {this.state.articleBody}
        </div>
      </article>
    );
  }
}

export default Post;