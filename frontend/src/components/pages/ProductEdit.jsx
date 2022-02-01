import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import productSvg from '../../img/product-svg.svg';

// Actions
import {
  detailsProduct,
  updateProduct,
} from '../../actionsReducers/product/productActions';

// components
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';
import { PRODUCT_UPDATE_RESET } from '../../actionsReducers/types';

const ProductEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const [productItem, setProductItem] = useState({
    id: productId,
    name: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
    brand: '',
    description: '',
  });

  const { name, price, image, category, brand, countInStock, description } =
    productItem;

  const onChange = e => {
    setProductItem({ ...productItem, [e.target.name]: e.target.value });
  };

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      navigate('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setProductItem({
        ...productItem,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        countInStock: product.countInStock,
        description: product.description,
      });
    }

    // eslint-disable-next-line
  }, [dispatch, navigate, product, productId, successUpdate]);
  const onSubmit = e => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      }),
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);

  const [errorUpload, setErrorUpload] = useState('');

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const upLoadFile = async e => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setProductItem({ ...productItem, image: data });
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div className='flex justify-center items-center w-full h-full overflow-auto'>
      <div className='text-red-400 hidden lg:block lg:w-full'>
        <img src={productSvg} className='lg:w-2/3 m-auto' alt='Product Page' />
      </div>
      <form className='form w-full md:w-1/2 lg:w-full' onSubmit={onSubmit}>
        <div className='w-full m-auto'>
          <div>
            <h1>Product ID: {productId}</h1>
          </div>
          {loadingUpdate && <Spinner />}
          {errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}
          {loading ? (
            <Spinner />
          ) : error ? (
            <Alert variant='danger'>{error}</Alert>
          ) : (
            <>
              <div>
                <label>Name</label>
                <input
                  type='text'
                  name='name'
                  value={name}
                  placeholder='Enter name'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                  required
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type='number'
                  name='price'
                  value={price}
                  placeholder='Enter price'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                  required
                />
              </div>
              <div>
                <label htmlFor='imageFile'>Image File</label>
                <input
                  type='file'
                  id='imageFile'
                  label='Choose Image'
                  onChange={upLoadFile}
                  accept='image/*'
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                />
                {loadingUpload && <Spinner />}
                {errorUpload && <Alert variant='danger'>{errorUpload}</Alert>}
              </div>
              <div>
                <label>Category</label>
                <input
                  type='text'
                  name='category'
                  value={category}
                  placeholder='Enter category'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                />
              </div>
              <div>
                <label>Brand</label>
                <input
                  type='text'
                  name='brand'
                  value={brand}
                  placeholder='Enter brand'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                />
              </div>
              <div>
                <label htmlFor='countInStock'>Count In Stock</label>
                <input
                  type='number'
                  name='countInStock'
                  value={countInStock}
                  placeholder='Enter countInStock'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  type='text'
                  name='description'
                  value={description}
                  placeholder='Enter description'
                  rows='3'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'></textarea>
              </div>
              <div>
                <label />
                <button
                  className='bg-primary p-3 rounded lg:w-2/3 text-white hover:text-white transition hover:bg-secondary'
                  type='submit'>
                  Update
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
