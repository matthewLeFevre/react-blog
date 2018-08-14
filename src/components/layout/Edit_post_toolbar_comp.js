//================================
// Imports
//================================

//React Library
import React from 'react';

//================================
// EditPostToolbar Class
//================================

class EditPostToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mobileClasses: "post-edit-btn mobile-closed",
      mobileToggle: true,
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleMobile = this.toggleMobile.bind(this);
  }

  handleEdit(e) {this.props.action(e.target.value);}

  toggleMobile() {
    if(this.state.mobileToggle) {
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
        <button onClick={this.handleEdit}
          value="justifyLeft"
          className="post-edit-btn"> 
          <i className=' fas fa-align-left'></i>
        </button>
        <button onClick={this.handleEdit}
          value="justifyCenter"
          className="post-edit-btn"> 
          <i className=' fas fa-align-center'></i>
        </button>
        <button onClick={this.handleEdit} 
          value="bold"
          className="post-edit-btn"> 
          <i className=' fas fa-bold'></i>
        </button>
        <button onClick={this.handleEdit}
          value="italic"
          className="post-edit-btn"> 
          <i className=' fas fa-italic'></i>
        </button>
        <button onClick={this.handleEdit}
          value="underline"
          className="post-edit-btn"> 
          <i className=' fas fa-underline'></i>
        </button>
        <button  
          onClick={this.handleEdit}
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
        <button onClick={this.handleEdit}
          value="insertOrderedList"
          className={this.state.mobileClasses}>
          <i className="fas fa-list-ol"></i>
        </button>
        <button onClick={this.handleEdit}
          value="insertUnorderedList"
          className={this.state.mobileClasses}>
          <i className="fas fa-list-ul"></i>
        </button>
        <button onClick={this.handleEdit}
          value="createlink"
          className={this.state.mobileClasses}>
          <i className="fas fa-link"></i>
        </button>
        <button onClick={this.handleEdit}
          value="unlink"
          className={this.state.mobileClasses}>
          <i className="fas fa-unlink"></i>
        </button>
        <button onClick={this.handleEdit}
          value="h2"
          className={this.state.mobileClasses}>
          H2
        </button>
        <button onClick={this.handleEdit}
          value="h3"
          className={this.state.mobileClasses}>
          H3
        </button>
        <button onClick={this.handleEdit}
          value="p"
          className={this.state.mobileClasses}>
          P
        </button>
      </div>);
  }
}

// Export statement
export default EditPostToolbar;