import React from 'react';
import { Link } from 'react-router-dom';
import formatter from '../../utils/formatter';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className='p-2 border-2 border-solid border-primary rounded-lg mx-2 my-2 w-64 md:w-auto'>
      <Link to={`/product/${product._id}`}>
        <img className='medium' src={product.image} alt={product.name} />
      </Link>
      <div className='card-body w-full'>
        <Link
          to={`/product/${product._id}`}
          className='text-primary hover:text-secondary transition'>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className='row'>
          <div className='price'>{formatter.format(product.price)}</div>
          <div>
            <Link
              to={`/seller/${product.seller._id}`}
              className='text-secondary'>
              {product.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
