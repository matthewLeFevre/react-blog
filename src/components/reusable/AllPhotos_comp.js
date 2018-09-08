//================================
// Imports
//================================

//React Library
import React from 'react';

//Service Imports
import Globals from '../../services/global_service';

//Service Variables
const Global = new Globals();

//================================
// DashboardProfile Class
//================================

class AllPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshPhotos: false,
      search: '',
    }

    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    fetch(`${Global.url}?controller=asset&action=getAssetsByUserId&userId=${this.props.userData.userId}&apiToken=${this.props.userData.apiToken}`)
    .then(response => response.json())
    .then( (data) => {
      this.setState({photos: data.data,});
    });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.refreshPhotos !== this.state.refreshPhotos) {
      this.setState({refreshPhotos: newProps.refreshPhotos});
      fetch(`${Global.url}?controller=asset&action=getAssetsByUserId&userId=${this.props.userData.userId}&apiToken=${this.props.userData.apiToken}`)
      .then(response => response.json())
      .then( (data) => {
        this.setState({photos: data.data,});
      });
    }
  }

  updateSearch(e) {
    let search = e.target.value;
    this.setState({
      search: search,
    })
  }
  
  render() {
    return(
      <section className="all-photos__wrapper column--12 column--sml--6">
        <h2 className="lrg">All Photos</h2>
        <form>
          <fieldset className="form__field">
            <input placeholder="Search..."  onChange={this.updateSearch} className="input--text main" type="search" /> 
          </fieldset>
        </form>
        <div className="all-photos__container">
          { this.state.photos 
              ? this.state.photos.map((asset) => {
                if(this.state.search !== '') {
                  if (asset.assetName.includes(this.state.search)) {
                    return <ImageItem handleImgPreview={this.props.handleImgPreview}  handleAlert={this.props.handleAlert} userData={this.props.userData} deletePhoto={this.props.deletePhoto}  asset={asset} key={Global.createRandomKey(7)}  />
                  } else {
                    return '';
                  }
                } else {
                  return <ImageItem handleImgPreview={this.props.handleImgPreview} handleAlert={this.props.handleAlert} userData={this.props.userData} deletePhoto={this.props.deletePhoto}  asset={asset} key={Global.createRandomKey(7)}  />
                }
              }) 
              : ''
            }
        </div>
      </section>
    );
  } 
}

class ImageItem extends React.Component { 
  constructor(props) {
    super(props);
    this.state ={
      assetStatus: this.props.asset.assetStatus,
    }
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
  }

  handleStatusUpdate(e) {
    let payload = {
      assetId: this.props.asset.assetId, 
      assetStatus: e.target.value,
      apiToken: this.props.userData.apiToken,
    }

    let body = Global.createBody('asset', 'updateAssetStatus', payload);
    let req = Global.createRequest(body);
    fetch(Global.url, req)
    .then(response => response.json())
    .then(data => {
      if(data.status === 'success') {
        this.setState({
          assetStatus: payload.assetStatus,
        })
      } else {
        // this.props.handleAlert(data.message, data.status);
        console.log(data);
      }
    })
  }

  render() {
    return (
      <div className="control-card">
        <div className={this.state.assetStatus === "published" ? "control-card__status bg-green" : "control-card__status bg-blue"}>
        </div>
        <div>
          <div className="control-card__body">
            <img    alt=""
                    src={this.props.asset.assetPath
                      ? this.props.asset.assetPath
                      : 'https://images.unsplash.com/photo-1535025639604-9a804c092faa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6cb0ceb620f241feb2f859e273634393&auto=format&fit=crop&w=1178&q=80'}  className='item-card__img' />
            <div className="control-card__text">
              <h5 className="control-card__heading">Asset Name: {`${this.props.asset.assetName.slice(0, 17)}...`}</h5>
            </div>
          </div>
          <div className="control-card__footer force-btn">
            <button className="btn primary tiny breath" onClick={this.props.handleImgPreview} type='button' alt='' src={this.props.asset.assetPath}>View</button>
          {this.state.assetStatus === "saved"
              ? <button type="button" value="published" onClick={this.handleStatusUpdate} className="btn primary tiny breath">Private</button>
              : <button type="button" value="saved" onClick={this.handleStatusUpdate} className="btn secondary tiny breath">Published</button>}
              <button type="button" className="btn danger tiny breath" onClick={this.props.deletePhoto} value={this.props.asset.assetId}>Delete</button>
          </div>
        </div>
      </div>
    );
  };
  
}

//Export Statement
export default AllPhotos;