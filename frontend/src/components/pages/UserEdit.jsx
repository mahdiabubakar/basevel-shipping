import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  detailsUser,
  updateUser,
} from '../../actionsReducers/auth/authActions';

import profileSvg from '../../img/profile-svg.svg';

// components
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';
import { USER_UPDATE_RESET } from '../../actionsReducers/types';

const UserEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: userId } = params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone('0' + user.phone);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, navigate, successUpdate, user, userId]);

  const onSubmit = e => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='text-red-400 hidden lg:block lg:w-full'>
        <img src={profileSvg} className='lg:w-1/2 m-auto' alt='User Profile' />
      </div>
      <form className='form w-full md:w-1/2 lg:w-full' onSubmit={onSubmit}>
        <div>
          <h1 className='capitalize'>Edit User: {name}</h1>
        </div>
        {/* {loadingUpdate && <Spinner />} */}
        {errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <>
            <div>
              <label htmlFor='name' className='block'>
                Name
              </label>
              <input
                id='name'
                type='text'
                placeholder='John Doe'
                value={name}
                onChange={e => setName(e.target.value)}
                className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
              />
            </div>
            <div>
              <label htmlFor='email' className='block'>
                Phone
              </label>
              <input
                id='phone'
                type='number'
                placeholder='08108624958'
                value={phone}
                onChange={e => setEmail(e.target.value)}
                className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
              />
            </div>
            <div>
              <label htmlFor='email' className='block'>
                Email
              </label>
              <input
                id='email'
                type='email'
                placeholder='john.doe@mail.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
              />
            </div>
            <div>
              <label htmlFor='isSeller'>Is Seller</label>
              <input
                id='isSeller'
                type='checkbox'
                checked={isSeller}
                onChange={e => setIsSeller(e.target.checked)}
              />
            </div>
            <div className='py-2'>
              <label htmlFor='isAdmin'>Is Admin</label>
              <input
                id='isAdmin'
                type='checkbox'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}></input>
            </div>
            <div>
              <button
                type='submit'
                className='bg-primary p-3 rounded lg:w-1/2 text-white hover:text-white transition hover:bg-secondary'>
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UserEdit;
