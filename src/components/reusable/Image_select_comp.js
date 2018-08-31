import React from 'react';
import Globals from '../../services/global_service';

const Global = new Globals();

class ImageSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      images: "",
      selectedImage: "",
    } 
    this.imageSelect = this.imageSelect.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      isOpen: this.props.isOpen,
    });
  }

  imageSelect (e) {
    this.setState({
      selectedImage: e.target.src,
    });
  }

  // get the images belonging to the authenticated user
  componentDidMount() {
    fetch(`${Global.url}?controller=asset&action=getPublishedAssetsByUserId&userId=${this.props.userData.userId}&apiToken=${this.props.userData.apiToken}`)
    .then(response => response.json())
    .then(data => this.setState({images: data.data,}));
  }

  


  render() {

  if(this.props.isOpen) {
      return(
        <div className="modal__container">
          <div className="modal">
            <div className="modal__header">
              <h3>Select a Photo</h3>
            </div>
            <div className="modal__body">
              <div className="image-select__container">
                {this.state.images
                  .map(
                    (image) => <UserImage key={Global.createRandomKey(7)} data={image} imageSelect={this.imageSelect}/>
                  )}
              </div>
            </div>
            <div className="modal__footer">
              <button className="btn action isLink" value={this.state.selectedImage} onClick={this.props.useImage}>Select</button>
              <button className="btn action-alt isLink" onClick={this.props.toggle}>Close</button>
            </div>
          </div>
        </div>
      );
    }else {
      return <span className="placeholderforimageselect"></span>;
    }
  }  
}

export default ImageSelect;

//I need to build some indication into the application that lets the user know the image has been selected
class UserImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    }
  }

  select() {
    this.setState({
      isSelected:true,
    })
  }

  render() {
    return (
      <div>{this.props.data.assetName}
        <img onClick={this.props.imageSelect} 
          className={this.state.isSelected
            ? "img isSelected"
            : "img"} 
          alt={this.props.data.assetName} 
          src={this.props.data.assetPath}/>
      </div>
    );
  }
}
  
