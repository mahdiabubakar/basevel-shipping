import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

import {
  // createProduct,
  deleteProduct,
  listProducts,
} from '../../actionsReducers/product/productActions';

// Components
import Alert from '../layouts/Alert';
import Spinner from '../layouts/Spinner';

// Types
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../../actionsReducers/types';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageNumber = 1 } = useParams();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector(state => state.productCreate);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      // navigate(`/product/${createdProduct?._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : '', pageNumber }),
    );
  }, [
    createdProduct,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = product => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const onClick = () => {
    navigate('/productedit');
  };
  if (!productCreate) return;
  return (
    <div>
      <div className='row'>
        <h1>Products</h1>
        <button
          type='button'
          className='bg-primary hover:bg-secondary text-light transition'
          onClick={onClick}>
          Create Product
        </button>
      </div>

      {loadingDelete && <Spinner />}
      {errorDelete && <Alert variant='danger'>{errorDelete}</Alert>}

      {loadingCreate && <Spinner />}
      {errorCreate && <Alert variant='danger'>{errorCreate}</Alert>}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type='button'
                      className='small bg-light hover:bg-secondary text-black hover:text-light transition'
                      onClick={() => navigate(`/product/${product._id}/edit`)}>
                      Edit
                    </button>
                    <button
                      type='button'
                      className='small bg-primary hover:bg-danger text-light transition'
                      onClick={() => deleteHandler(product)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex content-center justify-center center pagination'>
            {[...Array(pages).keys()].map(x => (
              <Link
                className={
                  x + 1 === page
                    ? 'active bg-primary text-light hover:bg-secondary hover:text-light'
                    : 'bg-primary text-light hover:bg-secondary hover:text-light'
                }
                key={x + 1}
                to={`/productlist/pageNumber/${x + 1}`}>
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
