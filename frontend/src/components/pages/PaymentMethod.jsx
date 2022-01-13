import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../../actionsReducers/cart/cartActions';
import paymentSelection from '../../img/payment-selection.svg';
import CheckoutSteps from '../layouts/CheckoutSteps';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  // FORM STATES
  const [paymentMethod, setPaymentMethod] = useState({
    paypal: 'paypal',
    stripe: '',
  });

  const { paypal, stripe } = paymentMethod;

  // On Chenge
  const onChange = e => {
    setPaymentMethod({ ...paymentMethod, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };
  return (
    <Fragment>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='text-red-400 hidden lg:block lg:w-full'>
          <img
            src={paymentSelection}
            className='lg:w-1/2 m-auto'
            alt='Payment Selection'
          />
        </div>
        <form className='form w-full md:w-1/2 lg:w-full' onSubmit={onSubmit}>
          <div className='w-full m-auto'>
            <div className='-mb-5'>
              <h1>Payment Method</h1>
            </div>
            <div className='flex py-4'>
              <div>
                <input
                  type='radio'
                  value={paypal}
                  name='paypal'
                  required
                  checked
                  onChange={onChange}
                />
                <label className='px-3 text-secondary cursor-pointer'>
                  PayPal
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  value={stripe}
                  name='stripe'
                  required
                  disabled
                  onChange={onChange}
                />
                <label className='px-3 text-secondary cursor-pointer'>
                  Stripe
                </label>
              </div>
            </div>
            <div>
              <label />
              <button
                className='bg-primary transition hover:bg-secondary lg:w-1/2 text-light hover:outline-0'
                type='submit'>
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default PaymentMethod;
