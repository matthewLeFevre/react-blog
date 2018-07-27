import React from 'react';
import {
  Route,
  Switch,
  Link, 
  Redirect
} from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state={navToggle: false};
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState(prevState => ({
      navToggle: !prevState.navToggle
    }));
    
  }

  render() {
    return (
      <header className="header bg-theme-red">
        <Navbtn toggleNav={this.toggleNav} />
        <Navigation toggleNav={this.state.navToggle} closeToggle={this.toggleNav} />
      </header>
    ); 
  }
}

const Navbtn = props => {
  return (
    <div onClick={props.toggleNav} className="nav__btn"> 
      <span>Menu</span>
      <div className="nav__btn__ico"></div> 
    </div>
  );
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleNav: this.props.toggleNav,
      classes: 'nav',
      nav__links: [
        {name: "Blog", title:"placeholder", link:"/blog"},
        {name: "About Me", title:"placeholder", link:"/about"},
        {name: "Home", title:"placeholder", link:"/"},
        {name: "Gallery", title:"placeholder", link:"/gallery"},
        {name: "Contact", title:"placeholder", link:"/contact"},
      ]
    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.toggleNav) {
      this.setState({
        toggleNav: nextProps.toggleNav,
        classes: "nav open",
      });
    } else {
      this.setState({
        toggleNav: nextProps.toggleNav,
        classes: "nav",
      });
    }
    

  }

  render() {
    return(        
    <nav className={this.state.classes}>
      <ul className="nav__list">
        {this.state.nav__links
          .map( (link, index) => <NavLinks key={index} data={link} toggleNav={this.props.closeToggle}/>)}            
      </ul>
    </nav>);
  }
}

const NavLinks = props => {
  return (
    <li className="nav__item">
      <Link onClick={props.toggleNav} className="nav__link" to={props.data.link} title={props.data.title}>{props.data.name}</Link>
    </li>
  );
}

export default Header;