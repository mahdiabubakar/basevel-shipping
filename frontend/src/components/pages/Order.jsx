import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deliverOrder,
  detailsOrder,
  payOrder,
} from '../../actionsReducers/order/orderActions';

// components
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';

// types
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../../actionsReducers/types';
import formatter from '../../utils/formatter';

const Order = () => {
  const params = useParams();
  const { id: orderId } = params;

  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector(state => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector(state => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <Spinner />
  ) : error ? (
    <Alert variant='danger'>{error}</Alert>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className='row top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Shippring</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Alert variant='success'>
                    Delivered at {order.deliveredAt}
                  </Alert>
                ) : (
                  <Alert variant='danger'>Not Delivered</Alert>
                )}
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Alert variant='success'>Paid at {order.paidAt}</Alert>
                ) : (
                  <Alert variant='danger'>Not Paid</Alert>
                )}
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map(item => (
                    <li key={item.product}>
                      <div className='row'>
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='w-full lg:max-w-sm'
                          />
                        </div>
                        <div className='flex flex-col justify-center content-center'>
                          <div className='min-30'>
                            <Link
                              to={`/product/${item.product}`}
                              className='text-primary hover:text-secondary transition'>
                              {item.name}
                            </Link>
                          </div>

                          <div>
                            {item.qty} x {formatter.format(item.price)} ={' '}
                            {formatter.format(item.qty * item.price)}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className='row'>
                  <div>Items</div>
                  <div>{formatter.format(order.itemsPrice.toFixed(2))}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Shipping</div>
                  <div>{formatter.format(order.shippingPrice.toFixed(2))}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Tax</div>
                  <div>{formatter.format(order.taxPrice.toFixed(2))}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>
                      {formatter.format(order.totalPrice.toFixed(2))}
                    </strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <Spinner />
                  ) : (
                    <>
                      {errorPay && <Alert variant='danger'>{errorPay}</Alert>}
                      {loadingPay && <Spinner />}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <Spinner />}
                  {errorDeliver && (
                    <Alert variant='danger'>{errorDeliver}</Alert>
                  )}
                  <button
                    type='button'
                    className='bg-primary hover:bg-secondary text-light block'
                    onClick={deliverHandler}>
                    Deliver Order
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
