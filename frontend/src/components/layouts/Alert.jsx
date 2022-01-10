import React from 'react';

const Alert = props => {
  return (
    <div className={`alert alert-${props.variant || 'info'}`}>
      {props.children}
    </div>
  );
};

export default Alert;
