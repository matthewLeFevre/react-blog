import React from 'react';
import ImageSelect from '../reusable/Image_select_comp';
import EditPostToolbar from '../layout/Edit_post_toolbar_comp';
import Globals from '../../services/global_service';
import Alert from '../reusable/alert_comp';

const Global = new Globals();

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: '',
      showAlert: false,
      edit: false,
      imageSelectIsOpen: false,
      articleTitle: '',
      articleSummary: '',
      articleBody: '',
      articleStatus: '',
      articleLink: '',
    }

    // Reference
    this.articleBody = React.createRef();

    // Event Handlers
    this.handleData = this.handleData.bind(this);
    this.savePost = this.savePost.bind(this);
    this.saveExistingPost = this.saveExistingPost.bind(this);
    this.publishPost = this.publishPost.bind(this);
    this.publishExistingPost = this.publishExistingPost.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleImageSelect = this.toggleImageSelect.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  componentDidMount () {
    if(this.props.edit) {
      fetch(`${Global.url}?controller=article&action=getArticleById&articleId=${this.props.match.params.id}"`)
      .then(response => response.json())
      .then( (data) => {
        // console.log(data);
        this.setState({
          edit: this.props.edit,
          articleTitle: data.data[0].articleTitle,
          articleSummary: data.data[0].articleSummary,
          articleBody: data.data[0].articleBody,
          articleLink: data.data[0].articleLink,
          articleId: data.data[0].articleId,
        }, ()=> this.articleBody.current.innerHTML = this.htmlDecode(this.state.articleBody));
      });
    }
  }

  // Data entry events
  handleData(event) {
    // console.log("changed");
    if(event.target.name === "articleTitle") {
      this.setState({articleTitle: event.target.value});
    }else if(event.target.name === "articleSummary") {
      this.setState({articleSummary: event.target.value});
    }
    this.setState({articleBody: this.articleBody.current.innerHTML}); 
  }

  savePost() {
    let data = {
      controller: 'article',
      action: 'createArticle',
      payload: {
        articleTitle: this.state.articleTitle,
        articleSummary: this.state.articleSummary,
        articleBody: this.state.articleBody,
        articleStatus: 'saved',
        articleLink: 'unused',
        userId: this.props.userData.userId,
        apiToken: this.props.userData.apiToken
      }
    }
    let req = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      // headers: {},
      body: JSON.stringify(data),
    }

    fetch(Global.url, req)
    .then(response => response.json())
    .then(data => {
      if(data.status === 'success') {
        this.setState({
          alert: <Alert hideAlert={this.hideAlert} classes="alert--closeable bg-green txt-white" message={data.message} />,
          showAlert: true,
          articleTitle: '',
          articleSummary: '',
          articleBody: '',
          articleStatus: '',
          articleLink: '',
        });
      }
    });
  }

  hideAlert() {
    this.setState({showAlert: false,});
  }

  publishPost() {
    let data = {
      controller: 'article',
      action: 'createArticle',
      payload: {
        articleTitle: this.state.articleTitle,
        articleSummary: this.state.articleSummary,
        articleBody: this.state.articleBody,
        articleStatus: 'published',
        articleLink: 'unused',
        userId: this.props.userData.userId,
        apiToken: this.props.userData.apiToken
      }
    }

    let req = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    }

    fetch(Global.url, req)
    .then(response => response.json())
    .then(data => console.log(data));
  }

  saveExistingPost(){
    let date = new Date();
    let data = {
      controller: 'article',
      action: 'updateArticle',
      payload: {
        articleTitle: this.state.articleTitle,
        articleSummary: this.state.articleSummary,
        articleBody: this.state.articleBody,
        articleStatus: 'saved',
        articleLink: 'unused',
        articleModified: date.toDateString(),
        articleId: this.state.articleId,
        userId: this.props.userData.userId,
        apiToken: this.props.userData.apiToken
      }
    }
    let req = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    }
    fetch(Global.url, req)
    .then(response => response.json())
    .then(data => console.log(data));
  }

  publishExistingPost(){}

  // Manipulation Events
  toggleImageSelect() {
    this.setState(prevState =>({
      imageSelectIsOpen: !prevState.imageSelectIsOpen,
    }));
  }

  handleEdit(action) {
    if( action === 'h2' ||
        action === 'h3' ||
        action === 'p') {
      document.execCommand('formatBlock', false, action);
    } else if (action === 'image') {
      this.toggleImageSelect();
    } else if (action === 'createlink') {
      let url = prompt('Enter the link here: ', 'http://');
      document.execCommand(action, false, url);
    } else {
      document.execCommand(action, false, null);
    }
  }

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  render() {

    return(
      <section className="column--12">
      {this.state.showAlert
        ? this.state.alert
        : ''
      }
      <ImageSelect isOpen={this.state.imageSelectIsOpen} toggle={this.toggleImageSelect}/>
      <EditPostToolbar action={this.handleEdit} />
      <form className="document" action="" >
        <input 
          name="articleTitle" 
          type="text" 
          className="blog__title"
          placeholder="Title..." 
          onChange={this.handleData}
          value={this.state.articleTitle}/>
        <textarea 
          name="articleSummary"
          type="text" 
          className="blog__summary" 
          onChange={this.handleData}
          value={this.state.articleSummary}
          />
        <div 
          name="articleBody"
          className="text-editor" 
          id="editor" 
          contentEditable 
          ref={this.articleBody}
          onInput={this.handleData}></div>
        
          {this.state.edit 
            ? <fieldset className="form__field blog__action-field">
                <button type="button" onClick={this.saveExistingPost} className="btn primary isLink sml">Save</button>
                <button type="button" onClick={this.publishExistingPost} className="btn primary isLink sml">Publish</button>
              </fieldset>
            : <fieldset className="form__field blog__action-field">
                <button type="button" onClick={this.savePost} className="btn primary isLink sml">Save</button>
                <button type="button" onClick={this.publishPost} className="btn secondary isLink sml">Publish</button>
              </fieldset>
          }
      </form>
    </section>     
    );
  }
}

export default CreatePost;

