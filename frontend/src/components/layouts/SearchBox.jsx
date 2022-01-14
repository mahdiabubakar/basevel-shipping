import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
  };
  return (
    <form className='search' onSubmit={onSubmit}>
      <div className='row'>
        <input
          type='text'
          name='q'
          id='q'
          placeholder='Search Item'
          className='border-1 shadow appearance-none border rounded py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
          onChange={e => setName(e.target.value)}
        />
        <button className='bg-primary text-light border-none' type='submit'>
          <i className='fa fa-search' />
        </button>
      </div>
    </form>
  );
}
