import React from 'react';
import { Link } from 'react-router-dom';
import Globals from '../../services/global_service';
const Global = new Globals();

class Footer extends React.Component {
  constructor(props) {
    super(props);
    let authSection = [];
    if(this.props.auth) {
      authSection = [
        {name: "Logout", link:"/"},
        {name: "register", link:"/register"}
      ];
    } else {
      authSection = [
        {name: "Login", link:"/login"},
        {name: "register", link:"/register"}
      ]
    }

    this.state = {
      authenticated: this.props.auth,
      footer_sections: [
        [
          {name: "Archive", link:"/archive"},
          {name: "Blog", link:"/blog"},
          {name: "About Me", link:"/about"},
          {name: "Contact", link:"/contact"}
        ],
        authSection
      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth) {
      this.state.footer_sections[1] = [
        {name: "Logout", link:"/logout"},
        {name: "dashboard", link:"/dashboard"}
      ];
    } else {
      this.state.footer_sections[1] = [
        {name: "Login", link:"/login"},
        {name: "register", link:"/register"}
      ]
    }
  }

  render() {

    return (
      <footer className="footer">
          <div className="footer__container">
            {this.state.footer_sections
              .map(
                (section) =>  <FooterSection key={Global.createRandomKey(7)} data={section} />)
            }
            
          </div>
      </footer>
    );
  }
}

const FooterSection = props => {
  let links = [];
  for(let i = 0; i < props.data.length; i++) {
    links.push(FooterLink(props.data[i]));
  }
  return (
    <section className="footer__section">
      <ul>
        {links}
      </ul>
    </section>
  );
}

const FooterLink = props => {
  return (
    <li>
      <Link to={props.link} key={Global.createRandomKey(7)} className="footer__link">
        {props.name}
      </Link>
    </li>);
}

export default Footer;