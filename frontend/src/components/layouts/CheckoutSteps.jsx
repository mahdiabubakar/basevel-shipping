import React from 'react';
import { Link } from 'react-router-dom';

export default function CheckoutSteps(props) {
  return (
    <div className='row checkout-steps mt-8 w-full'>
      <div className={props.step1 ? 'active' : ''}>
        <Link to='/login' className='hover:text-secondary'>
          Log In
        </Link>
      </div>
      <div className={props.step2 ? 'active' : ''}>
        <Link to='/shipping' className='hover:text-secondary'>
          Shipping
        </Link>
      </div>
      <div className={props.step3 ? 'active' : ''}>
        <Link to='/payment' className='hover:text-secondary'>
          Payment
        </Link>
      </div>
      <div className={props.step4 ? 'active' : ''}>
        <Link to='/placeorder' className='hover:text-secondary'>
          Place Order
        </Link>
      </div>
    </div>
  );
}
