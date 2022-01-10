import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { listProducts } from '../../actionsReducers/product/productActions';
import { detailsUser } from '../../actionsReducers/auth/authActions';

// components
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';
import Product from '../layouts/Product';
import Rating from '../layouts/Rating';

const SellerScreen = () => {
  const params = useParams();
  const { id: sellerId } = params;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const productList = useSelector(state => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);
  return (
    <div className='row top'>
      <div className='col-1'>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <ul className='card card-body'>
            <li>
              <div className='row start'>
                <div className='p-1'>
                  <img
                    className='small'
                    src={user.seller.logo}
                    alt={user.seller.name}></img>
                </div>
                <div className='p-1'>
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}></Rating>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className='col-3'>
        {loadingProducts ? (
          <Spinner />
        ) : errorProducts ? (
          <Alert variant='danger'>{errorProducts}</Alert>
        ) : (
          <>
            {products.length === 0 && <Alert>No Product Found</Alert>}
            <div className='row center'>
              {products.map(product => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerScreen;
