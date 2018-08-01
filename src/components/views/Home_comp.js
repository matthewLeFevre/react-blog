import React from 'react';
import banner_image from '../../images/banner_image.jpg';



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
      <section className="column--12 nested--grid">
        <div className="column--12 banner">
          <img src={banner_image} className="column--12 banner__img" alt="family pic"/>
        </div>
      </section>
    )
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