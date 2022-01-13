import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actionsReducers/cart/cartActions';
import CheckoutSteps from '../layouts/CheckoutSteps';

import shippingSvg from '../../img/shipping-svg.svg';

const ShippingAddress = () => {
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector(state => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    navigate('/login');
  }

  const [getshipping, setGetShipping] = useState({
    fullName: shippingAddress.fullName,
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  // Destructuring
  const { fullName, address, city, postalCode, country } = getshipping;
  // On Chenge
  const onChange = e => {
    setGetShipping({ ...getshipping, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        'You did not set your location on map. Continue?',
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        }),
      );
      navigate('/payment');
    }
  };
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      }),
    );
    navigate('/map');
  };
  return (
    <Fragment>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='text-red-400 hidden lg:block lg:w-full'>
          <img src={shippingSvg} className='lg:w-1/2 m-auto' alt='' />
        </div>
        <form className='form w-full md:w-1/2 lg:w-full' onSubmit={onSubmit}>
          <div className='w-full m-auto'>
            <div>
              <h1>Shipping Address</h1>
            </div>

            <div>
              <label>Full Name</label>
              <input
                type='text'
                name='fullName'
                value={fullName}
                placeholder='Enter full name'
                onChange={onChange}
                className='lg:w-1/2'
                required
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type='text'
                placeholder='Enter address'
                name='address'
                value={address}
                onChange={onChange}
                className='lg:w-1/2'
                required
              />
            </div>
            <div>
              <label>City</label>
              <input
                type='text'
                name='city'
                value={city}
                placeholder='Enter city'
                onChange={onChange}
                className='lg:w-1/2'
                required
              />
            </div>
            <div>
              <label>Postal Code</label>
              <input
                type='text'
                placeholder='Enter postal code'
                value={postalCode}
                name='postalCode'
                onChange={onChange}
                className='lg:w-1/2'
                required
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type='text'
                name='country'
                value={country}
                placeholder='Enter country'
                onChange={onChange}
                className='lg:w-1/2'
                required
              />
            </div>
            <div>
              <label>Location</label>
              <button
                type='button'
                className='lg:w-1/2 bg-light p-3 rounded text-black hover:text-white transition hover:bg-secondary'
                onClick={chooseOnMap}>
                Choose On Map
              </button>
            </div>
            <div>
              <label />
              <button
                className='primary lg:w-1/2 bg-primary p-3 rounded text-white hover:text-white transition hover:bg-secondary'
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

export default ShippingAddress;