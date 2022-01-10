import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Actions
import { login } from '../actionsReducers/auth/authActions';

// Components
import Spinner from '../components/layouts/Spinner';
import Alert from '../components/layouts/Alert';

const SigninScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  // Submit handlers
  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <Spinner />}
        {error && <Alert variant='danger'>{error}</Alert>}
        <div>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            placeholder='Enter email'
            required
            onChange={e => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter password'
            required
            onChange={e => setPassword(e.target.value)}></input>
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>
            Log in
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
