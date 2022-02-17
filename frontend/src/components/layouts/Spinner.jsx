import React, { Fragment } from 'react';
import spinner from '../../img/spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: '160px', display: 'block', margin: 'auto' }}
    />
  </Fragment>
);

export default Spinner;
