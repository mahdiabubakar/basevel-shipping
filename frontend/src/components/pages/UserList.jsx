import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, listUsers } from '../../actionsReducers/auth/authActions';

// components
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';
import { USER_DETAILS_RESET } from '../../actionsReducers/types';

const UserList = () => {
  const navigate = useNavigate();
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector(state => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = user => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {loadingDelete && <Spinner />}
      {errorDelete && <Alert variant='danger'>{errorDelete}</Alert>}
      {successDelete && (
        <Alert variant='success'>User Deleted Successfully</Alert>
      )}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'YES' : ' NO'}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <button
                    type='button'
                    className='small'
                    onClick={() => navigate(`/user/${user._id}/edit`)}>
                    Edit
                  </button>
                  <button
                    type='button'
                    className='small'
                    onClick={() => deleteHandler(user)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
