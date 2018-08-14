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
      photos: [],
    }
  }
  render() {
    return(
      <section className="all-photos__wrapper column--12 column--sml--6">
        <h2 className="lrg">All Photos</h2>
        <form>
          <fieldset className="form__field">
            <input placeholder="Search..." className="input--text main" type="search" /> 
          </fieldset>
        </form>
        <div className="all-photos__container">
          {/* { this.state.photos 
              ? this.state.photos.map((photos) => {
                  return <PostCard deletePost={this.props.deletePost} post={post} key={Global.createRandomKey(7)} />
                }) 
              : ''
            } */}
        </div>
      </section>
    );
  } 
}

//Export Statement
export default AllPhotos;