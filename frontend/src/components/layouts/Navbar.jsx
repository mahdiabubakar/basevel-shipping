import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { logout } from '../../actionsReducers/auth/authActions';
import { listProductCategories } from '../../actionsReducers/product/productActions';

// Components
import SearchBox from './SearchBox';
import Spinner from './Spinner';
import Alert from './Alert';

const Navbar = () => {
  // States
  const cart = useSelector(state => state.cart);

  // Actions
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productCategoryList = useSelector(state => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  // Dispatches
  const dispatch = useDispatch();

  // Event Handlers
  const onClick = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <div>
      <header className='row'>
        <div>
          <button
            type='button'
            className='open-sidebar'
            onClick={() => setSidebarIsOpen(true)}>
            <i className='fa fa-bars'></i>
          </button>
          <Link className='brand capitalize' to='/'>
            basevel
          </Link>
        </div>
        <div>
          <SearchBox />
        </div>
        <div>
          <Link to='/cart'>
            Cart
            {cartItems.length > 0 && (
              <span className='badge'>{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className='dropdown'>
              <Link to='#'>
                {userInfo.name} <i className='fa fa-caret-down'></i>{' '}
              </Link>
              <ul className='dropdown-content'>
                <li>
                  <Link to='/profile'>User Profile</Link>
                </li>
                <li>
                  <Link to='/orderhistory'>Order History</Link>
                </li>
                <li>
                  <Link to='#signout' onClick={onClick}>
                    Log out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to='/login'>Sign In</Link>
          )}
          {userInfo && userInfo.isSeller && (
            <div className='dropdown'>
              <Link to='#admin'>
                Seller <i className='fa fa-caret-down'></i>
              </Link>
              <ul className='dropdown-content'>
                <li>
                  <Link to='/productlist/seller'>Products</Link>
                </li>
                <li>
                  <Link to='/orderlist/seller'>Orders</Link>
                </li>
              </ul>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className='dropdown'>
              <Link to='#admin'>
                Admin <i className='fa fa-caret-down'></i>
              </Link>
              <ul className='dropdown-content'>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <Link to='/productlist'>Products</Link>
                </li>
                <li>
                  <Link to='/orderlist'>Orders</Link>
                </li>
                <li>
                  <Link to='/userlist'>Users</Link>
                </li>
                <li>
                  <Link to='/support'>Support</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <aside className={sidebarIsOpen ? 'open' : ''}>
        <ul className='categories'>
          <li>
            <strong>Categories</strong>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className='close-sidebar'
              type='button'>
              <i className='fa fa-close'></i>
            </button>
          </li>
          {loadingCategories ? (
            <Spinner />
          ) : errorCategories ? (
            <Alert variant='danger'>{errorCategories}</Alert>
          ) : (
            categories.map(category => (
              <li key={category}>
                <Link
                  to={`/search/category/${category}`}
                  onClick={() => setSidebarIsOpen(false)}>
                  {category}
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
    </div>
  );
};

export default Navbar;
