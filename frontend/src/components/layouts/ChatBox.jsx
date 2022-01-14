import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

const ChatBox = props => {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([
    { name: 'Admin', body: 'Hello there, Please ask your question.' },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
    if (socket) {
      socket.emit('onLogin', {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on('message', data => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [messages, isOpen, socket, userInfo]);

  const supportHandler = () => {
    setIsOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = e => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Error. Please type message.');
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.name }]);
      setMessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className='chatbox'>
      {!isOpen ? (
        <Link
          to='#'
          className='bg-light p-4 text-primary hover:text-light hover:bg-primary transition-all rounded'
          onClick={supportHandler}>
          <i class='fas fa-question-circle' />
        </Link>
      ) : (
        <div className='card card-body'>
          <div className='row'>
            <strong>Support </strong>
            <Link
              to='#'
              className='bg-primary p-4 text-light hover:text-white hover:bg-secondary transition-all rounded'
              onClick={closeHandler}>
              <i className='fa fa-close' />
            </Link>
          </div>
          <ul ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{`${msg.name}: `}</strong> {msg.body}
              </li>
            ))}
          </ul>
          <div>
            <form onSubmit={submitHandler} className='row'>
              <input
                value={messageBody}
                onChange={e => setMessageBody(e.target.value)}
                type='text'
                placeholder='type message'
                className='lg:w-1/2 border-1 shadow appearance-none border rounded w-full py-3 px-2 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
              />
              <button
                type='submit'
                className='bg-primary p-3 rounded text-white hover:text-white transition hover:bg-secondary'>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
