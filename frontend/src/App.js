import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Admin Route
import AdminRoute from './components/admin/AdminRoute';

// Components
import UserList from './components/pages/UserList';
import UserEdit from './components/pages/UserEdit';
import ShippingAddress from './components/pages/ShippingAddress';
import ProductEdit from './components/pages/ProductEdit';
import PaymentMethod from './components/pages/PaymentMethod';
import Search from './components/layouts/Search';
import OrderHistory from './components/pages/OrderHistory';
import PlaceOrder from './components/pages/PlaceOrder';
import Seller from './components/pages/Seller';
import Map from './components/maps/Map';
import ChatBox from './components/layouts/ChatBox';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Cart from './components/pages/Cart';
import Navbar from './components/layouts/Navbar';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import ProductList from './components/pages/ProductList';
import OrderList from './components/pages/OrderList';
import Product from './components/pages/Product';
import PrivateRoute from './components/routing/PrivateRoute';
import Order from './components/pages/Order';
import Support from './components/pages/Support';

import SellerRoute from './components/layouts/SellerRoute';

// ACTIONS
import { listProductCategories } from './actionsReducers/product/productActions';

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
            <Route path='/seller/:id' element={<Seller />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/cart/:id' element={<Cart />}></Route>
            <Route path='/product/:id' element={<Product />} exact></Route>
            <Route path='/product/:id/edit' element={ProductEdit} exact></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/shipping' element={<ShippingAddress />}></Route>
            <Route path='/payment' element={<PaymentMethod />}></Route>
            <Route path='/placeorder' element={<PlaceOrder />}></Route>
            <Route path='/order/:id' element={<Order />}></Route>
            <Route path='/orderhistory' element={<OrderHistory />}></Route>
            <Route path='/search/name' element={<Search />} exact></Route>
            <Route path='/search/name/:name' element={<Search />} exact></Route>
            <Route
              path='/search/category/:category'
              element={<Search />}
              exact></Route>
            <Route
              path='/search/category/:category/name/:name'
              element={<Search />}
              exact></Route>
            <Route
              path='/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber'
              element={<Search />}
              exact></Route>

            <Route
              path='/profile'
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path='/map'
              element={
                <PrivateRoute>
                  <Map />
                </PrivateRoute>
              }
            />

            <Route
              path='/productlist'
              element={
                <AdminRoute>
                  <ProductList />
                </AdminRoute>
              }
            />

            <Route
              path='/productlist/pageNumber/:pageNumber'
              element={
                <AdminRoute>
                  <ProductList />
                </AdminRoute>
              }
            />
            <Route
              path='/orderlist'
              element={
                <AdminRoute>
                  <OrderList />
                </AdminRoute>
              }
            />
            <Route
              path='/userlist'
              element={
                <AdminRoute>
                  <UserList />
                </AdminRoute>
              }
            />
            <Route
              path='/user/:id/edit'
              element={
                <AdminRoute>
                  <UserEdit />
                </AdminRoute>
              }
            />
            <Route
              path='/dashboard'
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path='/support'
              element={
                <AdminRoute>
                  <Support />
                </AdminRoute>
              }
            />
            <Route
              path='/productlist/seller'
              element={
                <SellerRoute>
                  <ProductList />
                </SellerRoute>
              }
            />
            <Route
              path='/orderlist/seller'
              element={
                <SellerRoute>
                  <OrderList />
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
