import React from 'react';

const Alert = (props) =>  {
    return (
      <div className={props.classes}
        onClick={props.hideAlert}>
        {props.message}
        <i className="fas fa-times close"></i>
      </div>
    );
}

export default Alert;