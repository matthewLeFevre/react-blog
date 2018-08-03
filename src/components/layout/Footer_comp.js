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
        {name: "Logout", link:"/logout"},
        {name: "Dashboard", link:"/cashboard/profile"}
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
    let authSection = [];
    if(this.props.auth) {
      authSection = [
        {name: "Logout", link:"/logout"},
        {name: "Dashboard", link:"/cashboard/profile"}
      ];
    } else {
      authSection = [
        {name: "Login", link:"/login"},
        {name: "register", link:"/register"}
      ]
    }

    this.setState({
      footerSection: [
        [
          {name: "Archive", link:"/archive"},
          {name: "Blog", link:"/blog"},
          {name: "About Me", link:"/about"},
          {name: "Contact", link:"/contact"}
        ],
        authSection
      ]
    })
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
    links.push(<FooterLink name={props.data[i].name} link={props.data[i].link} key={Global.createRandomKey(7)} />);
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
      <Link to={props.link} className="footer__link">
        {props.name}
      </Link>
    </li>);
}

export default Footer;