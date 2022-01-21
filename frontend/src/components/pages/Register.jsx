import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import registerSvg from '../../img/login-svg.svg';

// Actions
import { register } from '../../actionsReducers/auth/authActions';
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';

const Register = () => {
  const navigate = useNavigate();

  // FORM STATES
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Destructuring
  const { name, email, password, confirmPassword } = user;
  // On Chenge
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='text-red-400 hidden lg:block lg:w-full'>
        <img
          src={registerSvg}
          className='lg:w-1/2 m-auto'
          alt='Register User'
        />
      </div>
      <form className='form flex w-full md:w-1/2 lg:w-full' onSubmit={onSubmit}>
        <div className='w-full m-auto'>
          <div>
            <h1>Create Account</h1>
          </div>
          {loading && <Spinner />}
          {error && (
            <div className='lg:w-1/2'>
              <Alert variant='danger'>
                {error === 'User exist' && (
                  <p>
                    User already exist,{' '}
                    <Link
                      to={`/login?redirect=${redirect}`}
                      className='text-primary border-primary'>
                      Login
                    </Link>{' '}
                    to continue
                  </p>
                )}
              </Alert>
            </div>
          )}
          <div>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={name}
              placeholder='Enter name'
              onChange={onChange}
              className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
              required
            />
          </div>
          <div>
            <label>Email address</label>
            <input
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={onChange}
              className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
              required
            />
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onChange}
              placeholder='Confirm password'
              className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
              required
            />
          </div>
          <div>
            <label />
            <button
              className='bg-secondary lg:w-1/2 text-light hover:outline-0'
              type='submit'>
              Register
            </button>
          </div>
          <div>
            <span className='mt-3 mb-3'>
              Already have an account?{' '}
              <Link
                to={`/login?redirect=${redirect}`}
                className='bg-primary p-3 rounded text-white hover:text-white transition hover:bg-secondary'>
                Login
              </Link>{' '}
              here.
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
