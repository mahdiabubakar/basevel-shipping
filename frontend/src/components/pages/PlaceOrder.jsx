import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../actionsReducers/order/orderActions';
import CheckoutSteps from '../layouts/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../../actionsReducers/types';

// components
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';
import { Fragment } from 'react';
import formatter from '../../utils/formatter';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  if (!cart.paymentMethod) {
    navigate('/payment');
  }
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = num => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0),
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);
  return (
    <Fragment>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div>
        <div className='row top'>
          <div className='col-1'>
            <ul>
              <li>
                <div className='card card-body'>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {cart.shippingAddress.fullName}{' '}
                    <br />
                    <strong>Address: </strong> {cart.shippingAddress.address},
                    {cart.shippingAddress.city},{' '}
                    {cart.shippingAddress.postalCode},
                    {cart.shippingAddress.country}
                  </p>
                </div>
              </li>
              <li>
                <div className='card card-body'>
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </div>
              </li>
              <li>
                <div className='card card-body'>
                  <h2>Order Items</h2>
                  <ul>
                    {cart.cartItems.map(item => (
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
                            <div className=''>
                              <Link
                                to={`/product/${item.product}`}
                                className='text-primary hover:text-secondary transition'>
                                {item.name}
                              </Link>
                            </div>

                            <div>
                              {item.qty} x {formatter.format(item.price)} ={' '}
                              {'  '}
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
                    <div>{formatter.format(cart.itemsPrice.toFixed(2))}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    <div>Shipping</div>
                    <div>{formatter.format(cart.shippingPrice.toFixed(2))}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    <div>Tax</div>
                    <div>{formatter.format(cart.taxPrice.toFixed(2))}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>
                        {formatter.format(cart.totalPrice.toFixed(2))}
                      </strong>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    type='button'
                    onClick={placeOrderHandler}
                    className='block bg-primary text-light transform hover:bg-secondary'
                    disabled={cart.cartItems.length === 0}>
                    Place Order
                  </button>
                </li>
                {loading && <Spinner />}
                {error && <Alert variant='danger'>{error}</Alert>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PlaceOrder;
