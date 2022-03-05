import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import productSvg from '../../img/product-svg.svg';

// Actions
import {
  createProduct,
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
  // const { id: productId } = params;

  const [productItem, setProductItem] = useState({
    // id: productId,
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
    // if (!product || product._id !== productId || successUpdate) {
    //   dispatch({ type: PRODUCT_UPDATE_RESET });
    //   dispatch(detailsProduct(productId));
    // } else {
    setProductItem({
      ...productItem,
      name: name,
      price: price,
      image: image,
      category: category,
      brand: brand,
      countInStock: countInStock,
      description: description,
    });
    // }

    // eslint-disable-next-line
  }, [dispatch, navigate, product, successUpdate]);
  const onSubmit = e => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      createProduct(
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      ),
    );
    dispatch(
      updateProduct({
        // _id: productId,
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
    const formData = new FormData();
    formData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/uploads', formData, {
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
          <div>{/* <h1>Product ID: {productId}</h1> */}</div>
          {/* {loadingUpdate && <Spinner />} */}
          {errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}
          {error ? (
            <Alert variant='danger'>{error}</Alert>
          ) : (
            <>
              <div>
                <label>Item name</label>
                <input
                  type='text'
                  name='name'
                  value={name}
                  placeholder='Infinix S4'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                  required
                />
              </div>
              <div>
                <label>Item price (Naira)</label>
                <input
                  type='number'
                  name='price'
                  value={price}
                  placeholder='38,900.89'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                  required
                />
              </div>
              <div>
                <label htmlFor='imageFile'>Image file</label>
                <input
                  type='file'
                  id='imageFile'
                  label='Choose Image'
                  onChange={upLoadFile}
                  accept='image/*'
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                />
                {/* {loadingUpload && <Spinner />} */}
                {errorUpload && <Alert variant='danger'>{errorUpload}</Alert>}
              </div>
              <div>
                <label>Item category</label>
                <input
                  type='text'
                  name='category'
                  value={category}
                  placeholder='Smart Phones'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                />
              </div>
              <div>
                <label>Item brand</label>
                <input
                  type='text'
                  name='brand'
                  value={brand}
                  placeholder='Infinix Mobile'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                />
              </div>
              <div>
                <label htmlFor='countInStock'>Amount in Store</label>
                <input
                  type='number'
                  name='countInStock'
                  value={countInStock}
                  placeholder='120'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary capitalize'
                />
              </div>
              <div>
                <label>Item description</label>
                <textarea
                  type='text'
                  name='description'
                  value={description}
                  placeholder='6GBRAM, 64GB Storage, 2.0GHz*8, 4000mah, 720*1520 screen wide/height, Android 9 dark blue'
                  rows='8'
                  onChange={onChange}
                  className='lg:w-2/3 border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'></textarea>
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
