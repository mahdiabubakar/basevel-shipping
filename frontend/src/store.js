import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './actionsReducers/cart/cartReducers';

import {
  orderCreate,
  orderDelete,
  orderDeliver,
  orderDetails,
  orderList,
  orderMineList,
  orderPay,
  orderSummary,
} from './actionsReducers/order/orderReducers';

import {
  productCreate,
  productDelete,
  productDetails,
  productList,
  productReviewCreate,
  productUpdate,
} from './actionsReducers/product/productReducers';

// Imported reducers
import {
  userLogin,
  userAddressMap,
  userDelete,
  userDetails,
  userList,
  userRegister,
  userTopSellerList,
  userUpdateProfile,
  userUpdate,
} from './actionsReducers/auth/authReducers';
import { productCategoryList } from './actionsReducers/product/productReducers';

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
};
const reducer = combineReducers({
  productList: productList,
  productDetails: productDetails,
  cart: cartReducer,
  userLogin,
  userRegister: userRegister,
  orderCreate: orderCreate,
  orderDetails: orderDetails,
  orderPay: orderPay,
  orderMineList: orderMineList,
  userDetails: userDetails,
  userUpdateProfile: userUpdateProfile,
  userUpdate: userUpdate,
  productCreate: productCreate,
  productUpdate: productUpdate,
  productDelete: productDelete,
  orderList: orderList,
  orderDelete: orderDelete,
  orderDeliver: orderDeliver,
  userList: userList,
  userDelete: userDelete,
  userTopSellersList: userTopSellerList,
  productCategoryList: productCategoryList,
  productReviewCreate: productReviewCreate,
  userAddressMap: userAddressMap,
  orderSummary: orderSummary,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
);

export default store;
