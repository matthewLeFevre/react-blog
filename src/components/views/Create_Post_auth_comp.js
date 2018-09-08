//================================
// Imports
//================================

//React Library
import React from 'react';
import {Redirect} from 'react-router-dom';
import ImageSelect from '../reusable/Image_select_comp';
import EditPostToolbar from '../layout/Edit_post_toolbar_comp';
import ImageModal from '../reusable/Img_modal_comp';
import Globals from '../../services/global_service';

const Global = new Globals();

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Article Related state
      articleTitle: '',
      articleSummary: '',
      articleBody: '',
      articleStatus: '',
      edit: false,
      // Image Related State
      imagePurpose: '',
      imageSelectIsOpen: false,
      showImage: false,
      showImageModal: false,
      // Redirecting state
      redirectDashboard: false,
    }

    // Reference
    this.articleBody = React.createRef();

    // Event Handlers
    this.handleData = this.handleData.bind(this);
    this.proccessPost = this.proccessPost.bind(this);
    this.proccessExistingPost = this.proccessExistingPost.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    // Image Related event handlers
    this.useBlogImage = this.useBlogImage.bind(this);
    this.useBodyImage = this.useBodyImage.bind(this);
    this.changeBlogImage = this.changeBlogImage.bind(this);
    this.toggleImageModal = this.toggleImageModal.bind(this);
    this.toggleImageSelect = this.toggleImageSelect.bind(this);
    this.toggleBlogImageSelect = this.toggleBlogImageSelect.bind(this);
    this.toggleBodyImageSelect = this.toggleBodyImageSelect.bind(this);
  }

  // If we are editing a post we will first have to fetch the 
  // article from the db and then fill in the data for it.
  componentDidMount () {
    if(this.props.edit) {
      fetch(`${Global.url}?controller=article&action=getArticleById&articleId=${this.props.match.params.id}"`)
      .then(response => response.json())
      .then( (data) => {
        console.log(data);
        this.setState({
          edit: this.props.edit,
          articleTitle: data.data[0].articleTitle,
          articleSummary: data.data[0].articleSummary,
          articleBody: data.data[0].articleBody,
          articleLink: data.data[0].articleLink,
          articleId: data.data[0].articleId,
          showImage: data.data[0].articleImagePath,
        }, ()=> this.articleBody.current.innerHTML = this.htmlDecode(this.state.articleBody));
      });
    }
  }

  // This handles all data events for the 
  //  title
  //  Summary
  //  body 
  // of the article

  handleData(event) {
    if(event.target.name === "articleTitle") {
      this.setState({articleTitle: event.target.value});
    }else if(event.target.name === "articleSummary") {
      this.setState({articleSummary: event.target.value});
    }
    this.setState({articleBody: this.articleBody.current.innerHTML}); 
  }

  // Sends request and handles server response
  // for creating a new post
  proccessPost(e) {

    //define this logic
    if(!this.state.showImage) {
      this.setState({
        showImage: 'https://images.unsplash.com/photo-1535219241072-7d3c28a49a5c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2dbd146cbe003c86454d987153e59d6a&auto=format&fit=crop&w=1048&q=80',
      });
    }

    // setting up request data for the server
    let data = {
      controller: 'article',
      action: 'createArticle',
      payload: {
        // Items saved in state
        articleTitle: this.state.articleTitle,
        articleSummary: this.state.articleSummary,
        articleBody: this.state.articleBody,
        articleImage: this.state.showImage,
        // Items passed to this element that are not
        // part of user input
        userId: this.props.userData.userId,
        apiToken: this.props.userData.apiToken,
        // Selected based on user submission
        articleStatus: e.target.value,
        // requires deletion
      }
    }

    // configuring request
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
    .then(data => {
      if(data.status === 'success') {
        this.setState({
          redirectDashboard: true,
        });
        this.props.handleAlert(data.message, 'success');
      } else {
        this.props.handleAlert(data.message, 'error');
      }
    });
  }

  // Sends request and handles server response
  // for editing an existing post
  proccessExistingPost(e){
    console.log(e.target.value);
    let date = new Date();
    let data = {
      controller: 'article',
      action: 'updateArticle',
      payload: {
        articleTitle: this.state.articleTitle,
        articleSummary: this.state.articleSummary,
        articleBody: this.state.articleBody,
        articleStatus: e.target.value,
        articleLink: 'unused',
        articleModified: date.toDateString(),
        articleId: this.state.articleId,
        userId: this.props.userData.userId,
        apiToken: this.props.userData.apiToken,
        articleImage: this.state.showImage,
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
    .then(data => {
      if(data.status === 'success') {
        this.props.handleAlert(data.message, 'success');
      } else {
        this.props.handleAlert(data.message, 'error');
      }
    });
  }

  // Closes the Image select modal
  toggleImageSelect () {
    this.setState({
      imageSelectIsOpen: false,
    });
  }

  // Opens Image Select tool in Blog Image Mode
  toggleBlogImageSelect() {
    this.setState(prevState =>({
      imagePurpose: 'blogImage',
      imageSelectIsOpen: !prevState.imageSelectIsOpen,
    }));
  }

  // Opens Image Select tool in Body Image Mode
  toggleBodyImageSelect () {
    this.setState(prevState => ({
      imagePurpose: 'bodyImage',
      imageSelectIsOpen: !prevState.imageSelectIsOpen,
    }));
  }

  // When wysiwyg actions are preformed they are audited by
  // this handleEdit function
  handleEdit(action) {
    if( action === 'h2' ||
        action === 'h3' ||
        action === 'p') {
      document.execCommand('formatBlock', false, action);
    } else if (action === 'image') {
      this.toggleBodyImageSelect();
    } else if (action === 'createlink') {
      let url = prompt('Enter the link here: ', 'http://');
      document.execCommand(action, false, url);
    } else {
      document.execCommand(action, false, null);
    }
  }

  // Helps keep formating in the content editable section
  // that is our blog body
  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  // Instead of opening up the Image select tool
  // this function opens up an Image modal that 
  // is used to select images through url
  toggleImageModal(e) {
    this.setState(prevState => ({
      showImageModal: !prevState.showImageModal,
    }));
  }

  // Helps with the `toggleImageModal` funciton
  changeBlogImage(e) {
    this.setState({
      showImage: e.target.value,
    });
    this.toggleImageModal();
  }

// Adds an image to the Blog
  useBlogImage(e) {
    console.log('blogImg');
    this.setState({
      showImage: e.target.src,
      imageSelectIsOpen: false,
    });
  }
  
// Adds an image to the Body of the blog
  useBodyImage(e) {
    console.log('bodyImg');
    this.setState({
      imageSelectIsOpen: false,
    });
    document.execCommand('insertImage', false, e.target.src);
  }

  render() {
    console.log(this.state.imageSelectIsOpen);
    if(this.state.redirectDashboard) {
      return(
        <Redirect to="/dashboard/profile"/>
      );
    }

    return(
      <section className="column--12">
      {this.state.showAlert
        ? this.state.alert
        : ''
      }
      <ImageSelect purpose={this.state.imagePurpose} 
                   userData={this.props.userData} 
                   isOpen={this.state.imageSelectIsOpen} 
                   toggle={this.toggleImageSelect} 
                   useBlogImage={this.useBlogImage} 
                   useBodyImage={this.useBodyImage}/>
      {this.state.showImageModal
        ? <ImageModal toggleImageModal={this.toggleImageModal}
                      changeBlogImage={this.changeBlogImage}/>
        : ''}
      
      <EditPostToolbar action={this.handleEdit} />
      <form className="document" action="" >
        <input 
          name="articleTitle" 
          type="text" 
          className="blog__title"
          placeholder="Title..." 
          onChange={this.handleData}
          value={this.state.articleTitle}/>
          <button
            className="btn blog__image-viewer action"
            onClick={this.toggleImageModal}
            type="button">Add file by url</button>
          <button 
            className="btn blog__image-viewer"
            onClick={this.toggleBlogImageSelect}
            type="button">Select from uploaded Images</button>
        {this.state.showImage
          ? <img className="blog__image-view" src={this.state.showImage} alt={this.state.showImage} />
          : ''}
        <textarea 
          name="articleSummary"
          type="text" 
          className="blog__summary" 
          onChange={this.handleData}
          value={this.state.articleSummary}
          />
        <div 
          name="articleBody"
          className="text-editor article__body" 
          id="editor" 
          contentEditable 
          ref={this.articleBody}
          onInput={this.handleData}></div>
        
          {this.state.edit 
            ? <fieldset className="form__field blog__action-field">
                <button type="button" value="saved" onClick={this.proccessExistingPost} className="btn primary isLink sml">Save</button>
                <button type="button" value="published" onClick={this.proccessExistingPost} className="btn primary isLink sml">Publish</button>
              </fieldset>
            : <fieldset className="form__field blog__action-field">
                <button type="button" value="saved" onClick={this.proccessPost} className="btn primary isLink sml">Save</button>
                <button type="button" value="published" onClick={this.proccessPost} className="btn secondary isLink sml">Publish</button>
              </fieldset>
          }
      </form>
    </section>     
    );
  }
}

export default CreatePost;



