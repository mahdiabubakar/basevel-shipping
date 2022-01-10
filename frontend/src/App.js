import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';

import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

import ProductScreen from './screens/ProductScreen';

import ShippingAddressScreen from './screens/ShippingAddressScreen';

import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';

import Login from './components/pages/Login';

import SearchScreen from './screens/SearchScreen';

import { listProductCategories } from './actionsReducers/product/productActions';

import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';

// Components
import Navbar from './components/layouts/Navbar';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import ProductList from './components/pages/ProductList';

// Styles
import './App.css';

const App = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Navbar />
        <main>
          <Routes>
            <Route path='/seller/:id' element={<SellerScreen />}></Route>
            <Route path='/cart' element={<CartScreen />}></Route>
            <Route path='/cart/:id' element={<CartScreen />}></Route>
            <Route
              path='/product/:id'
              element={<ProductScreen />}
              exact></Route>
            <Route
              path='/product/:id/edit'
              element={ProductEditScreen}
              exact></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/shipping' element={<ShippingAddressScreen />}></Route>
            <Route path='/payment' element={<PaymentMethodScreen />}></Route>
            <Route path='/placeorder' element={<PlaceOrderScreen />}></Route>
            <Route path='/order/:id' element={<OrderScreen />}></Route>
            <Route
              path='/orderhistory'
              element={<OrderHistoryScreen />}></Route>
            <Route path='/search/name' element={<SearchScreen />} exact></Route>
            <Route
              path='/search/name/:name'
              element={<SearchScreen />}
              exact></Route>
            <Route
              path='/search/category/:category'
              element={<SearchScreen />}
              exact></Route>
            <Route
              path='/search/category/:category/name/:name'
              element={<SearchScreen />}
              exact></Route>
            <Route
              path='/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber'
              element={<SearchScreen />}
              exact></Route>

            <Route
              path='/profile'
              element={
                <PrivateRoute>
                  {/* <ProfileScreen /> */}
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path='/map'
              element={
                <PrivateRoute>
                  <MapScreen />
                </PrivateRoute>
              }
            />

            <Route
              path='/productlist'
              element={
                <AdminRoute>
                  {/* <ProductListScreen /> */}
                  <ProductList />
                </AdminRoute>
              }
            />

            <Route
              path='/productlist/pageNumber/:pageNumber'
              element={
                <AdminRoute>
                  {/* <ProductListScreen /> */}
                  <ProductList />
                </AdminRoute>
              }
            />
            <Route
              path='/orderlist'
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/userlist'
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/user/:id/edit'
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/dashboard'
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/support'
              element={
                <AdminRoute>
                  <SupportScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/productlist/seller'
              element={
                <SellerRoute>
                  {/* <ProductListScreen /> */}
                  <ProductList />
                </SellerRoute>
              }
            />
            <Route
              path='/orderlist/seller'
              element={
                <SellerRoute>
                  <OrderListScreen />
                </SellerRoute>
              }
            />

            <Route path='/' element={<Home />} exact></Route>
          </Routes>
        </main>
        <footer className='row center'>
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
