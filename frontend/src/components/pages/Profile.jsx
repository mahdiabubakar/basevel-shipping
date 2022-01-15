import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  detailsUser,
  updateUserProfile,
} from '../../actionsReducers/auth/authActions';

import profileSvg from '../../img/profile-svg.svg';

import Spinner from '../../components/layouts/Spinner';
import Alert from '../../components/layouts/Alert';
import { USER_UPDATE_PROFILE_RESET } from '../../actionsReducers/types';

const Profile = () => {
  // user profile STATE
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sellerName: '',
    sellerLogo: '',
    sellerDescription: '',
  });

  const {
    name,
    email,
    password,
    confirmPassword,
    sellerDescription,
    sellerLogo,
    sellerName,
  } = userProfile;

  // On Chenge
  const onChange = e => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setUserProfile({
        ...userProfile,
        name: user.name,
        email: user.email,
        sellerName: user.seller.name,
        sellerLogo: user.seller.logo,
        sellerDescription: user.seller.description,
      });
    }
    // eslint-disable-next-line
  }, [dispatch, userInfo._id, user]);
  const onSubmit = e => {
    e.preventDefault();

    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        }),
      );
    }
  };
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='text-red-400 hidden lg:block lg:w-full'>
        <img src={profileSvg} className='lg:w-1/2 m-auto' alt='User Profile' />
      </div>
      <form className='form w-full md:w-1/2 lg:w-full' onSubmit={onSubmit}>
        <div className='w-full m-auto'>
          <div>
            <h1>User Profile</h1>
          </div>
          {loading ? (
            <Spinner />
          ) : error ? (
            <Alert variant='danger'>{error}</Alert>
          ) : (
            <>
              {loadingUpdate && <Alert />}
              {errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}
              {successUpdate && (
                <Alert variant='success'>Profile Updated Successfully</Alert>
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
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  value={email}
                  placeholder='Enter email'
                  onChange={onChange}
                  className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  ype='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  placeholder='Enter previous password'
                  className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                />
              </div>
              <div>
                <label>confirm Password</label>
                <input
                  type='password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={onChange}
                  placeholder='Confirm password'
                  className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                />
              </div>
              {user.isSeller && (
                <>
                  <h2>Seller</h2>
                  <div>
                    <label>Seller Name</label>
                    <input
                      type='text'
                      name='sellerName'
                      value={sellerName}
                      placeholder='Enter Seller Name'
                      onChange={onChange}
                      className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                    />
                  </div>
                  <div>
                    <label>Seller Logo</label>
                    {/* <input
                      type='text'
                      value={sellerLogo}
                      name='sellerLogo'
                      placeholder='Enter Seller Logo'
                      onChange={onChange}
                      className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                    /> */}
                    <input
                      type='file'
                      name='sellerLogo'
                      value={sellerLogo}
                      placeholder='Enter Seller Logo'
                      onChange={onChange}
                      className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                      accept='image/*'
                    />
                  </div>
                  <div>
                    <label>Seller Description</label>
                    <input
                      type='text'
                      value={sellerDescription}
                      name='sellerDescription'
                      placeholder='Enter Seller Description'
                      onChange={onChange}
                      className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                    />
                  </div>
                </>
              )}
              <div>
                <label />
                <button
                  className='bg-primary p-3 rounded lg:w-1/2 text-white hover:text-white transition hover:bg-secondary'
                  type='submit'>
                  Update
                </button>
              </div>
            </>
          )}{' '}
        </div>
      </form>
    </div>
  );
};

export default Profile;
