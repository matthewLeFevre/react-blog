//================================
// Imports
//================================

//React Library
import React from 'react';
import { Link } from 'react-router-dom';

//Service Imports
import Globals from '../../services/global_service';

//Service Variables
const Global = new Globals();

//================================
// Footer Class
//================================

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.auth,
      footer_sections: [
        [
          // {name: "Archive", link:"/archive"},
          {name: "Blog", link:"/blog"},
          {name: "About Me", link:"/about"},
          {name: "Gallery", link:"/gallery"},
          // {name: "Contact", link:"/contact"}
        ],
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

// Export statement
export default Footer;

//================================
// Functional Components
//================================

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

