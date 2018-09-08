import React from 'react';

import Globals from '../../services/global_service';

let Global = new Globals();

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      // images: [
      //   {assetPath: 'https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&h=350', assetName: 'name'},
      //   {assetPath: 'http://courtney.matthew-lefevre.com/server_assets/Tulips.jpg', assetName: 'name'},
      //   {assetPath: 'https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&h=350', assetName: 'name'},
      //   {assetPath: 'https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&h=350', assetName: 'name'},
      //   {assetPath: 'https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&h=350', assetName: 'name'},
      //   {assetPath: 'https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&h=350', assetName: 'name'},
      //   {assetPath: 'https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&h=350', assetName: 'name'},
      //   {assetPath: 'https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&h=350', assetName: 'name'},
      //   {assetPath: 'https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&h=350', assetName: 'name'},
      //   {assetPath: 'https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&h=350', assetName: 'name'},
      // ],
    }
  }

  componentDidMount() {
    fetch(`${Global.url}?controller=asset&action=getPublishedAssets`)
    .then(response => response.json())
    .then(response => {
      if(response.status === 'success') {
        this.setState({
          images: response.data,
        });
      } else {
        this.props.handleAlert(response.message, response.status);
      }
    })
  }

  render() {
    return (
      <div className="column--12 page__full-height">
          <h2>Gallery</h2>
        <div className="gallery">
          {this.state.images
            ? this.state.images
              .map((image) => {
                return <GalleryItem 
                  handleImagePreview={this.props.handleImgPreview} 
                  image={image} 
                  key={Global.createRandomKey(7)}/>; 
              })
            : ''
          }
        </div>
      </div>
    );
  }
}

export default Gallery;

class GalleryItem extends React.Component {
  render() {
    return (
      <div className="gallery__img__wrapper">
        <img className="gallery__img"
          onClick={this.props.handleImagePreview} 
          src={this.props.image.assetPath} 
          alt={this.props.image.assetName} />
      </div>
    );
  }
}