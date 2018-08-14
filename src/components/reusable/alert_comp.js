import React from 'react';

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: this.props.classes,

    }

    // this.handleClose = this.handleClose.bind(this);
  }

  // handleClose(event) {
  //   this.setState( prevState => ({
  //     classes: prevState.classes + " hide",
  //   }));
  // }

  render() {
    return (
      <div className={this.state.classes}
        onClick={this.props.hideAlert}
      >
        {this.props.message}
        <i className="fas fa-times close"></i>
      </div>
    );
  };
}

export default Alert;