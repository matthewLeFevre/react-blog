import React from 'react';

import Globals from '../../services/global_service';

let Global = new Globals();

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
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
        <div>
          <h2>Images</h2>
          {this.state.images
            ? this.state.images
              .map((image) => {
                return <img src={image.assetPath} alt={image.assetName} />
              })
            : ''
          }
        </div>
      </div>
    );
  }
}

export default Gallery;