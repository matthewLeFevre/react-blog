import React from 'react';
import DashboardToolbar from '../layout/Dashboard_toolbar_comp';
import ImageSelect from '../reusable/Image_select_comp';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openImageSelect: true,
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.toggleImageSelect = this.toggleImageSelect.bind(this);
  }

  toggleImageSelect() {
    this.setState(prevState =>({
      openImageSelect: !prevState.openImageSelect,
    }));
  }

  handleEdit(action) {
    // console.log(action);
    if( action === 'h2' ||
        action === 'h3' ||
        action === 'p') {
      document.execCommand('formatBlock', false, action);
    }
    if (action === 'image') {
      this.toggleImageSelect();
    }
    if (action === 'createlink') {
      let url = prompt('Enter the link here: ', 'http:\/\/');
      document.execCommand(action, false, url);
    } else {
      document.execCommand(action, false, null);
    }
  }

  render() {
    return(
      <section className="column--12">
      <DashboardToolbar />
      <ImageSelect isOpen={this.state.openImageSelect} toggle={this.toggleImageSelect}/>
      <EditPostToolbar action={this.handleEdit} />
      <form className="document" action="">
        <input 
              name="blog-title" 
              type="text" 
              className="blog__title"
              placeholder="Title..." />
        <div 
            className="text-editor" 
            id="editor" 
            contentEditable></div>
      </form>
    </section>     
    );
  }
}

export default CreatePost;

class EditPostToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileClasses: "post-edit-btn mobile-closed",
      mobileToggle: true,
    }

    this.action = this.action.bind(this);
    this.toggleMobile = this.toggleMobile.bind(this);
  }

  action(e) {
    // console.log(e.target);
    let cmd = e.target.value;
    this.props.action(cmd);
  }

  toggleMobile() {
    if(this.state.mobileToggle) {
      console.log(this.state.mobileToggle);
      this.setState({
        mobileClasses: "post-edit-btn mobile-closed mobile-open",
        mobileToggle: false,
      });
    } else {
      this.setState({
        mobileClasses: "post-edit-btn mobile-closed",
        mobileToggle: true,
      });
    }
  }

  render() {
    return (<div className="post-edit__toolbar">
        <button onClick={this.action}
          value="justifyLeft"
          className="post-edit-btn"> 
          <i className=' fas fa-align-left'></i>
        </button>
        <button onClick={this.action}
          value="justifyCenter"
          className="post-edit-btn"> 
          <i className=' fas fa-align-center'></i>
        </button>
        <button onClick={this.action} 
          value="bold"
          className="post-edit-btn"> 
          <i className=' fas fa-bold'></i>
        </button>
        <button onClick={this.action}
          value="italic"
          className="post-edit-btn"> 
          <i className=' fas fa-italic'></i>
        </button>
        <button onClick={this.action}
          value="underline"
          className="post-edit-btn"> 
          <i className=' fas fa-underline'></i>
        </button>
        <button  
          onClick={this.action}
          value="image"
          className="post-edit-btn"
          id="getImage"> 
          <i className=' fas fa-image'></i>
        </button>
        <button  
          onClick={this.toggleMobile}
          className="post-edit-btn" 
          id="toggle-more"> 
          <i className="fas fa-ellipsis-h"></i>
        </button>
        <button onClick={this.action}
          value="insertOrderedList"
          className={this.state.mobileClasses}>
          <i className="fas fa-list-ol"></i>
        </button>
        <button onClick={this.action}
          value="insertUnorderedList"
          className={this.state.mobileClasses}>
          <i className="fas fa-list-ul"></i>
        </button>
        <button onClick={this.action}
          value="createlink"
          className={this.state.mobileClasses}>
          <i className="fas fa-link"></i>
        </button>
        <button onClick={this.action}
          value="unlink"
          className={this.state.mobileClasses}>
          <i className="fas fa-unlink"></i>
        </button>
        <button onClick={this.action}
          value="h2"
          className={this.state.mobileClasses}>
          H2
        </button>
        <button onClick={this.action}
          value="h3"
          className={this.state.mobileClasses}>
          H3
        </button>
        <button onClick={this.action}
          value="p"
          className={this.state.mobileClasses}>
          P
        </button>
      </div>);
  }
}