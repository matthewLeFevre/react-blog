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
      search: '',
      refreshPhotos: false,
      photos: [],
    }

    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    fetch(`${Global.url}?controller=asset&action=getAssetsByUserId&userId=${this.props.userData.userId}`)
    .then(response => response.json())
    .then( (data) => {
      this.setState({photos: data.data,});
    });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.refreshPosts !== this.state.refreshPosts) {
      this.setState({refreshPosts: newProps.refreshPosts});
      fetch(`${Global.url}?controller=asset&action=getAssetsByUserId&userId=${this.props.userData.userId}`)
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
              ? this.state.photos.map((photos) => {
                  return <img src={photos.assetPath} className="img__list-item" />
                }) 
              : ''
            }
        </div>
      </section>
    );
  } 
}

//Export Statement
export default AllPhotos;