import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { useDispatch } from 'react-redux';
import { payOrder } from '../actionsReducers/order/orderActions';

import './style.css';

const PayButton = ({ order, userInfo, onSuccess }) => {
  const dispatch = useDispatch();
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const amount = order.totalPrice * 100; // Remember, set in kobo!

  const [user, setUser] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: '',
  });
  const { name, email, phone } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: 'PAY NOW',
    onSuccess: () => {
      alert('Thanks for doing business with us! Come back soon :)');
      dispatch(payOrder(order));
    },
    onClose: () => {
      alert('Redirecting back to homepage');
    },
  };

  return (
    <div className='App'>
      <div className='container rounded-md px-3'>
        <div className='checkout'>
          <form className='checkout-form'>
            <div className='checkout-field'>
              <label>Name</label>
              <input
                type='text'
                placeholder='John DOe'
                name='name'
                value={name}
                required
                disabled
                className='border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                onChange={onChange}
              />
            </div>
            <div className='checkout-field'>
              <label>Email</label>
              <input
                type='email'
                placeholder='john.doe@mail.com'
                name='email'
                value={email}
                required
                disabled
                className='border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary lowercase'
                onChange={onChange}
              />
            </div>
            <div className='checkout-field'>
              <p style={{ color: 'red' }}>
                We'll use your registered phone number as contact number
              </p>
              <label className='hidden'>Phone</label>
              <input
                type='tel'
                placeholder='08108624958'
                name='phone'
                value={phone}
                required
                className='border-1 shadow hidden appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                onChange={onChange}
              />
            </div>
            <PaystackButton
              className='bg-secondary w-full text-light hover:outline-0 hover:bg-primary transition-colors'
              {...componentProps}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PayButton;
