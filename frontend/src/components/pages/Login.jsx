import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import loginSvg from '../../img/forget-login.svg';

// Actions
import { login } from '../../actionsReducers/auth/authActions';

// Components
import Spinner from '../../components/layouts/Spinner';
import Alert from '../../components/layouts/Alert';

const Login = () => {
  const navigate = useNavigate();

  // FORM STATES
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // Destructuring
  const { email, password } = user;
  // On Chenge
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(user));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='text-red-400 hidden lg:block lg:w-full'>
        <img src={loginSvg} className='lg:w-1/2 m-auto' alt='Login' />
      </div>
      <form className='form w-full md:w-1/2 lg:w-full' onSubmit={onSubmit}>
        <div className='w-full m-auto'>
          <div className='-mb-5'>
            <h1>Log In</h1>
          </div>
          {loading && <Spinner />}
          {error && <Alert variant='danger'>{error}</Alert>}
          <div>
            <label>Email address</label>
            <input
              type='email'
              required
              placeholder='Email'
              name='email'
              value={email}
              className='lg:w-1/2'
              onChange={onChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              required
              className='lg:w-1/2'
              onChange={onChange}
            />
          </div>
          <div>
            <label />
            <button
              className='bg-secondary lg:w-1/2 text-light hover:outline-0'
              type='submit'>
              Log In
            </button>
          </div>
          <div>
            <span className='mt-3 mb-3'>
              New customer?{' '}
              <Link
                to={`/register?redirect=${redirect}`}
                className='bg-primary p-3 rounded text-white hover:text-white transition hover:bg-secondary'>
                Create your account
              </Link>
            </span>
          </div>
        </div>
        <div></div>
      </form>
    </div>
  );
};

export default Login;
