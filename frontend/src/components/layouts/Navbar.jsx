import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { logout } from '../../actionsReducers/auth/authActions';
import { listProductCategories } from '../../actionsReducers/product/productActions';

// Components
// import SearchBox from './SearchBox';
import Spinner from './Spinner';
import Alert from './Alert';
import { Fragment } from 'react';

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
    <Fragment>
      <header className='flex flex-wrap items-center justify-between z-50 px-4 bg-secondary h-24 fixed top-0 right-0 left-0 shadow-2xl'>
        <div className='flex flex-no-shrink items-center mr-6 py-3 text-light'>
          <span className='mr-2 side-btn'>
            <Link
              to='#'
              className='open-sidebar'
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
              <i className='fa fa-bars text-3xl cursor-pointer text-light hover:text-white transition' />
            </Link>
          </span>
          <Link to='/' className='flex content-center justify-center'>
            <span className='font-semibold tracking-tight text-light capitalize hover:text-white transition md:text-3xl'>
              Basevell
            </span>
          </Link>
        </div>
        <input className='menu-btn hidden' type='checkbox' id='menu-btn' />
        <label
          className='menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none'
          htmlFor='menu-btn'>
          <span className='navicon bg-light flex items-center relative'></span>
        </label>
        <ul className='menu border-b md:border-none flex justify-end list-reset m-0  w-full md:w-auto'>
          <li className='md:border-none pb-2'>
            <Link
              to='/'
              className='block md:inline-block px-4 no-underline text-2xl text-light hover:text-white transition font-normal'>
              Home
            </Link>
          </li>
          <li className='md:border-none'>
            <Link
              to='/cart'
              className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
              Cart
              {cartItems.length > 0 && (
                <span className='badge'>{cartItems.length}</span>
              )}
            </Link>
          </li>
          <li className='md:border-none'>
            {userInfo ? (
              <div>
                <div className='dropdown1 inline-block relative'>
                  <Link
                    to='#'
                    className='front block md:inline-block px-4 text-2xl bg-gray-300 rounded items-center bg-secondary no-underline text-light hover:text-white transition font-normal capitalize'>
                    <span className='mb-2'>
                      {userInfo.name} <i className='fa fa-caret-down' />
                    </span>
                  </Link>
                  <ul class='dropdown-menu w-60 absolute hidden  text-gray-700 pt-1 '>
                    <li>
                      <Link
                        to='/profile'
                        class='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-light hover:text-white transition font-normal capitalize'>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/orderhistory'
                        class='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-light hover:text-white transition font-normal capitalize'>
                        Order History
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='#signout'
                        class='rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-light hover:text-white transition font-normal capitalize'
                        onClick={onClick}>
                        log out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                to='/login'
                className='capitalise block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                Sign In
              </Link>
            )}
          </li>
          <li>
            {userInfo && userInfo.isSeller && (
              <div>
                <div className='dropdown1 inline-block relative'>
                  <Link
                    to='#'
                    className='block md:inline-block px-4 text-2xl bg-gray-300 rounded items-center border-0 bg-secondary text-light hover:text-white border-none'>
                    <span className='mb-2'>
                      Seller <i className='fa fa-caret-down' />
                    </span>
                  </Link>
                  <ul class='dropdown-menu bg-secondary w-60 absolute hidden text-gray-700 pt-1'>
                    <li>
                      <Link
                        to='/productlist/seller'
                        class='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-light hover:text-white transition font-normal capitalize'>
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/orderlist/seller'
                        class='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-light hover:text-white transition font-normal capitalize'>
                        Orders
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </li>
          <li>
            {userInfo && userInfo.isAdmin && (
              <div>
                <div className='dropdown1 inline-block relative'>
                  <Link
                    to='#'
                    className='block md:inline-block px-4 text-2xl bg-gray-300 rounded items-center border-0 bg-secondary text-light hover:text-white border-none z-10'>
                    <span className='mb-2'>
                      Admin <i className='fa fa-caret-down' />
                    </span>
                  </Link>
                  <ul class='dropdown-menu bg-secondary w-40 move absolute hidden text-gray-700 pt-1'>
                    <li>
                      <Link
                        to='/dashboard'
                        class='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-light hover:text-white transition font-normal capitalize'>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/productlist'
                        class='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-light hover:text-white transition font-normal capitalize'>
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/orderlist'
                        class='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-light hover:text-white transition font-normal capitalize'>
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/userlist'
                        class='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-light hover:text-white transition font-normal capitalize'>
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/support'
                        class='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-light hover:text-white transition font-normal capitalize'>
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </li>
        </ul>
      </header>
      <aside
        className={
          sidebarIsOpen
            ? 'open bg-secondary text-3xl transition'
            : 'bg-secondary text-3xl'
        }>
        <ul className='categories '>
          <li>
            <strong>Categories</strong>
            <Link
              to='#'
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              className='close-sidebar bg-light py-2 px-3 text-primary hover:text-light hover:bg-primary transition-all rounded'>
              <i className='fa fa-close' />
            </Link>
          </li>
          {loadingCategories ? (
            <Spinner />
          ) : errorCategories ? (
            <Alert variant='danger'>{errorCategories}</Alert>
          ) : (
            categories.map(category => (
              <li key={category}>
                <Link
                  className='font-normal text-xl hover:text-light'
                  to={`/search/category/${category}`}
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
                  {category}
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
    </Fragment>
  );
};

export default Navbar;
