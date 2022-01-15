import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
  };
  return (
    <form className='search' onSubmit={onSubmit}>
      <div className='flex justify-center w-full mt-2'>
        <input
          type='text'
          name='q'
          id='q'
          placeholder='Search Item'
          className='border-1 w-full md:w-1/2 shadow appearance-none border rounded rounded-r-none py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
          onChange={e => setName(e.target.value)}
        />
        <button
          className='bg-primary text-light border-none rounded-l-none'
          type='submit'>
          <i className='fa fa-search' />{' '}
          <span className='hidden md:inline-block'>Search Item</span>
        </button>
      </div>
    </form>
  );
};
export default SearchBox;
