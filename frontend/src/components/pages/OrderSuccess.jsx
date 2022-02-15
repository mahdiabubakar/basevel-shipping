import React from 'react';
import { useSelector } from 'react-redux';
import orderConfirm from '../../img/order_confirm.svg';

const OrderSuccess = () => {
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='text-red-400 hidden lg:block lg:w-full'>
        <img src={orderConfirm} className='lg:w-1/2 m-auto' alt='Login' />
      </div>
      <form className='form flex w-full md:w-1/2 lg:w-full sm:w-1/4 overflow-auto h-full'>
        <div className='w-full m-auto'>
          <h1>Order Success</h1>
        </div>
        <div></div>
      </form>
    </div>
  );
};

export default OrderSuccess;
