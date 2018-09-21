import React from 'react';

class AboutMe extends React.Component {
  render() {
    return (
      <div className='column--12 page__full-height'>
        <section className="article__wrapper">
          <h1 className="article__title">About Me</h1>
          <img className="article__img" src="http://courtneylefevre.com/server_assets/aboutme.jpg" alt="This is me Courtney LeFevre" />
          <div className="article__body">
            <p>I am Courtney LeFevre and I am a member of The Church of Jesus Christ of Latter-Day Saints. I have been married to my husband, Matthew, for two years. We have a beautiful daughter, Madelyn, who is a little over a year old. We currently live in Rexburg, Idaho and my husband and I are full-time students at Brigham Young University- Idaho. I am majoring in Marriage and Family Studies, and Matthew is studying Web Design and Development.</p>
            <p>My parents were divorced when I was in high school, and it has changed me in a lot of ways. I’ve decided I have a story to tell and I wanted to share it through this blog. I hope my story can help inspire you and give you the strength to keep enduring this life.</p>
          </div>
        </section>
      </div>
    );
  }
}

export default AboutMe;