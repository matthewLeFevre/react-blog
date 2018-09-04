//================================
// Imports
//================================

//React Library
import React from 'react';
import {Link} from 'react-router-dom';

//================================
// Header Class
//================================

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state={navOpen: false};
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState(prevState => ({
      navOpen: !prevState.navOpen
    }));
    
  }

  render() {
    return (
      <header className="header bg-theme-red">
        <Navbtn navOpen={this.state.navOpen} toggleNav={this.toggleNav} />
        <Navigation navOpen={this.state.navOpen} toggleNav={this.toggleNav} />
      </header>
    ); 
  }
}

// Export Statement
export default Header;

//================================
// Navigation Class
//
// - Should probably move this 
// class into a new file
//================================

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: this.props.navOpen,
      classes: 'nav',
      nav__links: [
        {name: "Blog", title:"placeholder", link:"/blog"},
        {name: "About Me", title:"placeholder", link:"/about"},
        {name: "Home", title:"placeholder", link:"/"},
        {name: "Gallery", title:"placeholder", link:"/gallery"},
        {name: "Contact", title:"placeholder", link:"/contact"},
        {name: "Login", title:"placeholder", link:"/login"},
      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.navOpen) {
      this.setState({
        navOpen: nextProps.navOpen,
        classes: "nav open",
      });
    } else {
      this.setState({
        navOpen: nextProps.navOpen,
        classes: "nav",
      });
    }
  
  }

  render() {
    return(        
    <nav className={this.state.classes}>
      <ul className="nav__list">
        {this.state.nav__links
          .map( (link, index) => <NavLinks key={index} data={link} toggleNav={this.props.toggleNav}/>)}            
      </ul>
    </nav>);
  }
}

//================================
// Functional Components
//================================

const Navbtn = props => {
  let icoClasses = 'nav__btn__ico';
  let btnClasses = 'nav__btn';
  if(props.navOpen) {
    icoClasses += ' open';
    btnClasses += ' open';
  }
  return (
    <div onClick={props.toggleNav} className={btnClasses}>
      <span>Menu</span>
      <div className={icoClasses}></div>  
    </div>
  );
}

const NavLinks = props => {
  return (
    <li className="nav__item">
      <Link onClick={props.toggleNav} className="nav__link" to={props.data.link} title={props.data.title}>{props.data.name}</Link>
    </li>
  );
}