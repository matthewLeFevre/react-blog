//================================
// Imports
//================================

//React Library
import React from 'react';

// Asset Imports 
import banner_image from '../../images/banner_image.jpg';

//reusable Imports 
import PostDetail from '../reusable/PostDetail_comp';

//Service Imports
import Globals from '../../services/global_service';

//Service Variables
const Global = new Globals();

//================================
// Home Class
//================================

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  // componentDidMount () {
  //   fetch(Globals.url + "?controller=article&action=getNumberOfArticles&articleNumber=5")
  //     .then(response => console.log(response));
  // }

  render() {
    return ( 
      <section className="column--12 page__full-height">
        <div className="grid--limited-padded--home">
          <div className="home__container column--12">
            <HomeIntro />
            <HomeRecentPosts />
          </div>
        </div>
      </section>
    )
  }
}

const HomeIntro = () => {
  return(
    <figure className="home-intro">
      <div className="home__img__container">
        <img className="home__img--welcome" src={banner_image} alt=''/>
      </div>
      <figcaption className="home-intro__text">
        <h1 className="home-intro__heading">Courtney LeFevre</h1>
        <p className="home-intro__message">I am a member of The Church of Jesus Christ of Latter-Day Saints. I love to write and wanted to share my experiences with others. I will write blogs about my spiritual experiences, parenting experiences and just updates on my life. I hope you like what you read!</p>
        <div>
          <a className="btn icon action breath sml" href="https://www.facebook.com/courtney.marie.18294?lst=100001654375445%3A100003072898110%3A1536430225" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook-f"></i></a>
          <a className="btn icon action breath sml" href="https://www.instagram.com/courtneymlefevre/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          <a className="btn icon action breath sml" href="mailto:lefevreblog@gmail.com?subject=Hello%20Courtney!" target="_top"><i className="fas fa-envelope"></i></a>
        </div>
      </figcaption>
    </figure>
  );
}

class HomeRecentPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      posts: [],
    }
  }
  componentDidMount() {
    fetch(`${Global.url}?controller=article&action=getNumberOfPublishedArticles&articleNumber=6`)
    .then(response => response.json())
    .then( (posts) => {
      this.setState({
        posts: posts.data
      });
    })
  }
  render () {
    return(
      <div className="recent-posts__grid">
        {this.state.posts
          ? this.state.posts
            .map( post => {
              return <PostDetail post={post} key={Global.createRandomKey(7)} />
            })
          : ''
        }
      </div>
    );
  }
}



// const PostDisplay = props => {
//   return (
//     <a className="post--dsp-box">
//       <div className="post-img-wrap center">
//         <img className="post-img" src={props.post.img.src} alt="placeholder" />
//       </div>
//       <div class="post--dsp-box__body">
//         <h3 className="post--dsp-box__title">{props.post.title}</h3>
//         <span className="post--dsp-box__date">{props.post.dateCreated}</span>
//       </div>
//     </a>
//   );
// }

export default Home;