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
      let date = new Date(data.data[0].articleCreated);
      this.setState({
        articleTitle: data.data[0].articleTitle,
        articleSummary: data.data[0].articleSummary,
        articleBody: data.data[0].articleBody,
        articleCreated: date.toDateString(),
        articleImagePath: data.data[0].articleImagePath,
      },  ()=> this.articleBody.current.innerHTML = this.htmlDecode(this.state.articleBody));
    });
  }

  render() {
    return(
      <article className="column--12">
        <div className="article__wrapper">
          <div>
            <div className="article__intro">
              <h1 className="article__title">{this.state.articleTitle}</h1>
              <span className="article__date">{this.state.articleCreated}</span>
            </div>
            <p className="article__summary"> {this.state.articleSummary} </p>
            <img className="article__img" src={this.state.articleImagePath}  alt={this.state.articleTitle}/>
          </div>
          <div className="article__body" ref={this.articleBody}>
            {this.state.articleBody}
          </div>
        </div>
      </article>
    );
  }
}

export default Post;