import React from 'react';
import { Link } from 'react-router-dom';
import formatter from '../../utils/formatter';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div key={product._id} className='bg-gray-100 p-1 text-black m-2'>
      <Link to={`/product/${product._id}`}>
        <img className='medium' src={product.image} alt={product.name} />
      </Link>
      <div className='card-body'>
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}></Rating>
        <div className='row'>
          <div className='price'>{formatter.format(product.price)}</div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
