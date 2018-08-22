//================================
// Imports
//================================

//React Library
import React from 'react';
import {Link} from 'react-router-dom';

// Asset Imports 
import banner_image from '../../images/banner_image.jpg';

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
      <section className="column--12">
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
        <img className="home__img--welcome" src={banner_image} />
      </div>
      <figcaption className="home-intro__text">
        <h1 className="home-intro__heading">Courtney LeFevre</h1>
        <p className="home-intro__message">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div>
          <a className="btn icon action breath sml"><i className="fab fa-facebook-f"></i></a>
          <a className="btn icon action breath sml"><i className="fab fa-instagram"></i></a>
          <a className="btn icon action breath sml"><i className="fab fa-blogger"></i></a>
          <a className="btn icon action breath sml"><i className="fas fa-envelope"></i></a>
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
    fetch(`${Global.url}?controller=article&action=getNumberOfArticles&articleNumber=6`)
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

const PostDetail = props => {
  let date = new Date(props.post.articleCreated);
  return (
    <Link to={`/blog/post/${props.post.articleId}`} className="recent-post__detail">
      <h3>{props.post.articleTitle}</h3>
      <span>{date.toDateString()}</span>
      <div className="recent-post__img__cont">
        <img className="recent-post__img" src={
          props.post.assetPath
          ?  props.post.assetPath
          : "https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        } />
      </div>
      
      <p>{props.post.articleSummary}</p>
    </Link>
  );
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