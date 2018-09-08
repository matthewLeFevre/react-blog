import React from 'react';

class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  render() {
    return(
      <div className='modal__container'>
      <div className='modal'>
        <div className="modal__img__preview__wrapper">
          <img className='modal__img__preview' 
          src={this.props.assetPath} 
          alt={this.props.assetName} />
        </div>
        <div className='modal__footer'>
          <button type="button" onClick={this.props.closePreview} className='btn action sml'>Close</button>
        </div>
      </div>
    </div>
    )
  }
}

export default ImagePreview;