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
      {/* <div>
        <header className='row p-4 bg-pink-400'>
          <div>
            <button
              type='button'
              className='open-sidebar'
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
              <i className='fa fa-bars' />
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
                  {userInfo.name} <i className='fa fa-caret-down' />{' '}
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
                  Seller <i className='fa fa-caret-down' />
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
                  Admin <i className='fa fa-caret-down' />
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
                <i className='fa fa-close' />
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
      </div> */}
      <header className='flex flex-wrap items-center justify-between px-4 bg-secondary h-24 fixed top-0 right-0 left-0'>
        <div className='flex flex-no-shrink items-center mr-6 py-3 text-light'>
          <span className='mr-2'>
            <Link
              to='#'
              className='open-sidebar'
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
              <i className='fa fa-bars text-3xl cursor-pointer text-light hover:text-white transition' />
            </Link>
          </span>
          <Link to='/' className='flex content-center justify-center'>
            <span className='font-semibold tracking-tight text-light capitalize hover:text-white transition md:text-xl'>
              Basevel
            </span>
          </Link>
        </div>
        <div>{/* <SearchBox /> */}</div>

        <input className='menu-btn hidden' type='checkbox' id='menu-btn' />
        <label
          className='menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none'
          for='menu-btn'>
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
              <div className='dropdown'>
                <Link
                  to='#'
                  className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal capitalize'>
                  {userInfo.name} <i className='fa fa-caret-down' />{' '}
                </Link>
                <ul className='dropdown-content bg-secondary'>
                  <li>
                    <Link
                      to='/profile'
                      className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                      User Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/orderhistory'
                      className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                      Order History
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='#signout'
                      className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'
                      onClick={onClick}>
                      Log out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to='/login'>Sign In</Link>
            )}
          </li>
          <li>
            {userInfo && userInfo.isSeller && (
              <div className='dropdown'>
                <Link
                  to='#admin'
                  className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                  Seller <i className='fa fa-caret-down' />
                </Link>
                <ul className='dropdown-content'>
                  <li className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                    <Link to='/productlist/seller'>Products</Link>
                  </li>
                  <li className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                    <Link to='/orderlist/seller'>Orders</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            {userInfo && userInfo.isAdmin && (
              <div className='dropdown'>
                <Link
                  to='#admin'
                  className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                  Admin <i className='fa fa-caret-down' />
                </Link>
                <ul className='dropdown-content'>
                  <li className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                    <Link to='/dashboard'>Dashboard</Link>
                  </li>
                  <li className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                    <Link to='/productlist'>Products</Link>
                  </li>
                  <li className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                    <Link to='/orderlist'>Orders</Link>
                  </li>
                  <li className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                    <Link to='/userlist'>Users</Link>
                  </li>
                  <li className='block md:inline-block px-4 no-underline text-2xl  text-light hover:text-white transition font-normal'>
                    <Link to='/support'>Support</Link>
                  </li>
                </ul>
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
