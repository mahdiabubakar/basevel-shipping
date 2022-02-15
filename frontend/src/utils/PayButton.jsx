import React, { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import { useNavigate, useLocation } from 'react-router-dom';

import './style.css';

const PayButton = ({ order, userInfo }) => {
  const navigate = useNavigate();
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
    text: 'Pay Now',
    onSuccess: () => {
      alert('Thanks for doing business with us! Come back soon :)');
      navigate(redirect);
    },
    onClose: () => {
      alert('Redirecting back to homepage');
      setTimeout(() => {
        navigate(redirect);
      }, 3000);
    },
  };

  // REDIRECTS
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/ordersuccess';

  useEffect(() => {
    console.log('first');
  }, [navigate]);

  return (
    <div className='App'>
      <div className='container rounded-md px-3'>
        <div className='checkout'>
          <form className='checkout-form'>
            <div className='checkout-field'>
              <label>Name</label>
              <input
                type='text'
                placeholder='Enter your fullname'
                name='name'
                value={name}
                required
                className='border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                onChange={onChange}
              />
            </div>
            <div className='checkout-field'>
              <label>Email</label>
              <input
                type='email'
                placeholder='Enter your email'
                name='email'
                value={email}
                required
                className='border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                onChange={onChange}
              />
            </div>
            <div className='checkout-field'>
              <label>Phone</label>
              <input
                type='tel'
                placeholder='Enter phone number'
                name='phone'
                value={phone}
                required
                className='border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
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
