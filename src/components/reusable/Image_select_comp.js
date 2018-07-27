import React from 'react';
import Globals from '../../services/global_service';

const Global = new Globals();

class ImageSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isOpen: "",
      images: "",
    } 
    this.getImages();
  }

  componentWillReceiveProps() {
    
    this.setState({
      isOpen: this.props.isOpen,
    });
  }

  // get the images belonging to the authenticated user
  getImages() {
    fetch(`${Global.url}?controller=asset&action=getAssetsByUserId&userId=1`)
    .then(response => response.json())
    .then(data => this.setState({images: data.data,}));
  }

  render() {

  if(this.state.isOpen) {
    console.log(this.state.images);
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
                    (image) => <UserImage key={Global.createRandomKey(7)} data={image} />
                  )}
              </div>
            </div>
            <div className="modal__footer">
              <button className="btn action isLink">Select</button>
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

const UserImage = (props) => {
  return (
    <div>{props.data.assetName}
      <img className="img" src={props.data.assetPath}/>
    </div>
  );
};