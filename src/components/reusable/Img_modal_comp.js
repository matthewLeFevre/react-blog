import React from 'react';

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

export default ImageModal;