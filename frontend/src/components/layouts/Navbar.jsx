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
      </div> */}

      <nav className='nav flex flex-wrap items-center justify-between px-4 bg-secondary'>
        <div className='flex flex-no-shrink items-center mr-6 py-3 text-light'>
          <svg
            className='fill-current h-8 mr-2 w-8'
            xmlns='http://www.w3.org/2000/svg'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='1.5'
            clip-rule='evenodd'
            viewBox='0 0 716 895'>
            <path d='M357.776 0l357.77 178.885v536.657l-357.77 178.89L0 715.542V178.885'></path>
            <path
              className='text-light fill-current'
              d='M357.776 804.982l268.32-134.16v-178.89l-89.44-44.72 89.44-44.72V223.606L357.776 89.442v626.1l-178.89-89.44V178.885l-89.443 44.721v447.216l268.333 134.16z'></path>
            <path d='M447.216 670.822l89.44-44.72v-89.45l-89.44-44.72v178.89zM447.216 402.492l89.44-44.721v-89.443l-89.44-44.722'></path>
          </svg>
          <span className='font-semibold text-xl tracking-tight'>
            Luke Bennett
          </span>
        </div>

        <input className='menu-btn hidden' type='checkbox' id='menu-btn' />
        <label
          className='menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none'
          for='menu-btn'>
          <span className='navicon bg-light flex items-center relative'></span>
        </label>

        <ul className='menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto'>
          <li className='md:border-none'>
            <Link
              to='/'
              className='block md:inline-block px-4 py-3 no-underline text-light hover:text-white transition font-bold'>
              Home
            </Link>
          </li>

          <li className='md:border-none'>
            <Link
              to='/about/'
              className='block md:inline-block px-4 py-3 no-underline text-light hover:text-white transition font-bold'>
              About
            </Link>
          </li>

          <li className='md:border-none'>
            <Link
              to='/blog/'
              className='block md:inline-block px-4 py-3 no-underline text-light hover:text-white transition font-bold'>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
