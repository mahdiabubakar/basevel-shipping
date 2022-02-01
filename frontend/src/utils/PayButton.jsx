import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

const PayButton = ({ order, userInfo }) => {
  console.log(order.orderItems[0].image);
  const config = {
    public_key: process.env.REACT_APP_FLUTTER_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: '200',
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userInfo.email,
      phonenumber: '07064586146',
      name: userInfo.name,
    },
    customizations: {
      title: 'Basevell',
      description: 'Payment for items in cart',
      logo: order.orderItems[0].image,
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay Now!',
    callback: response => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div>
      <FlutterWaveButton
        className='bg-primary block text-light transition hover:bg-secondary'
        {...fwConfig}
      />
    </div>
  );
};

export default PayButton;
