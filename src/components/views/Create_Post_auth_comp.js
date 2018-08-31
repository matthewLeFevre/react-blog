import React from 'react';
import ImageSelect from '../reusable/Image_select_comp';
import EditPostToolbar from '../layout/Edit_post_toolbar_comp';
import Globals from '../../services/global_service';

const Global = new Globals();

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      imageSelectIsOpen: false,
      articleTitle: '',
      articleSummary: '',
      articleBody: '',
      articleStatus: '',
      articleLink: '',
      showImageModal: false,
      showImage: false,
    }

    // Reference
    this.articleBody = React.createRef();

    // Event Handlers
    this.handleData = this.handleData.bind(this);
    this.proccessPost = this.proccessPost.bind(this);
    this.proccessExistingPost = this.proccessExistingPost.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleImageSelect = this.toggleImageSelect.bind(this);
    this.toggleImageModal = this.toggleImageModal.bind(this);
    this.changeBlogImage = this.changeBlogImage.bind(this);
    this.useImage = this.useImage.bind(this);
  }

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

  // Data entry events
  handleData(event) {
    if(event.target.name === "articleTitle") {
      this.setState({articleTitle: event.target.value});
    }else if(event.target.name === "articleSummary") {
      this.setState({articleSummary: event.target.value});
    }
    this.setState({articleBody: this.articleBody.current.innerHTML}); 
  }

  proccessPost(e) {
    if(!this.state.showImage) {
      this.setState({
        showImage: 'https://images.unsplash.com/photo-1535219241072-7d3c28a49a5c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2dbd146cbe003c86454d987153e59d6a&auto=format&fit=crop&w=1048&q=80',
      });
    }
    let data = {
      controller: 'article',
      action: 'createArticle',
      payload: {
        articleTitle: this.state.articleTitle,
        articleSummary: this.state.articleSummary,
        articleBody: this.state.articleBody,
        articleStatus: e.target.value,
        articleLink: 'unused',
        articleImage: this.state.showImage,
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
    .then(data => {
      if(data.status === 'success') {
        this.setState({
          articleTitle: '',
          articleSummary: '',
          articleBody: '',
          articleStatus: '',
          articleLink: '',
        });
        this.props.handleAlert(data.message, 'success');
      } else {
        this.props.handleAlert(data.message, 'error');
      }
    });
  }

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

  toggleImageModal(e) {
    this.setState(prevState => ({
      showImageModal: !prevState.showImageModal,
    }));
  }

  changeBlogImage(e) {
    this.setState({
      showImage: e.target.value,
    });
    this.toggleImageModal();
  }

  useImage(e) {
    this.setState({
      showImage: e.target.value,
      imageSelectIsOpen: false,
    });
  }

  render() {

    return(
      <section className="column--12">
      {this.state.showAlert
        ? this.state.alert
        : ''
      }
      <ImageSelect userData={this.props.userData} isOpen={this.state.imageSelectIsOpen} toggle={this.toggleImageSelect} useImage={this.useImage}/>
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
            onClick={this.toggleImageSelect}
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

class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: '',
    }
    this.handelImageChange = this.handelImageChange.bind(this);
  }

  handelImageChange(e) {
    this.setState({
      imagePath: e.target.value,
    })
  }

  render() {
    return (
      <div className='modal__container'>
        <div className='modal'>
          <div className='modal__header bg-theme-orange'>
            <h5>Select or enter a url for this blog image</h5>
          </div>
          <div className="modal__body">
          <form className="form--full-width">
            <input onChange={this.handelImageChange} type="text" className='input--text initial full' placeholder="Enter an image URL"/>
          </form>
          </div>
          <div className="modal__footer">
            <button className="btn action breath" value={this.state.imagePath}  onClick={this.props.changeBlogImage} type="button" >Select</button>
            <button className="btn action_alt breath"  onClick={this.props.toggleImageModal}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

