import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOrderMine } from '../../actionsReducers/order/orderActions';

// components
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';
import formatter from '../../utils/formatter';

const OrderHistory = () => {
  const navigate = useNavigate();
  const orderMineList = useSelector(state => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <Fragment>
      <div className='mt-10'>
        <h1 className='text-center'>Order History</h1>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <Fragment>
            {orders.map(order => (
              <div className='card card-body'>
                <h1>
                  <b>Item ID:</b> {order._id}
                </h1>
                <p>
                  <b>Date Created:</b> {order.createdAt.substring(0, 10)}
                </p>
                <p>
                  <b>Total Price:</b>{' '}
                  {formatter.format(order.totalPrice.toFixed(2))}
                </p>
                <div className='flex'>
                  <p className='card card-body border-primary w-1/2'>
                    <b>Paid: </b>
                    {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                  </p>
                  <p className='card card-body w-1/2 ml-2'>
                    <b>Delivered: </b>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'No'}
                  </p>
                </div>
                <button
                  type='button'
                  className='small bg-primary text-light hover:bg-secondary transition w-full md:w-1/5'
                  onClick={() => {
                    navigate(`/order/${order._id}`);
                  }}>
                  Details
                </button>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default OrderHistory;
