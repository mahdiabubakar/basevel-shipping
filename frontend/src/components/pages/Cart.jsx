import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
} from '../../actionsReducers/cart/cartActions';

// components
import Alert from '../layouts/Alert';

// Methods
import formatter from '../../utils/formatter';

const Cart = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector(state => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };
  return (
    <div className='row top'>
      <div className='col-2'>
        <h1>Shopping Cart</h1>
        {error && <Alert variant='danger'>{error}</Alert>}
        {cartItems.length === 0 ? (
          <Alert>
            Cart is empty. <Link to='/'>Go Shopping</Link>
          </Alert>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.product}>
                <div className='row'>
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-full md:max-w-sm'
                    />
                  </div>
                  <div className='min-30'>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      className='border-1 shadow appearance-none border rounded w-full py-5 leading-tight focus:outline-none focus:shadow-outline focus:border-primary px-10'
                      onChange={e =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value)),
                        )
                      }>
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{formatter.format(item.price)}</div>
                  <div>
                    <button
                      type='button'
                      className='bg-secondary text-light hover:outline-0 w-fit hover:bg-danger'
                      onClick={() => removeFromCartHandler(item.product)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='col-1'>
        <div className='card card-body md:mt-20 lg:mt-10'>
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                {formatter.format(
                  cartItems.reduce((a, c) => a + c.price * c.qty, 0),
                )}
              </h2>
            </li>
            <li>
              <button
                type='button'
                onClick={checkoutHandler}
                className='bg-primary text-light hover:bg-secondary transition block'
                disabled={cartItems.length === 0}>
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
