import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux';
import store from "./redux/store";
import MainRoutes from './components/routing/MainRoutes';
import { loadUser, logout } from './redux/features/auth/authSlice';
import setAuthToken from './utils/setAuthToken';
import 'react-toastify/dist/ReactToastify.css';
import './sass/styles.scss';
import PrivateRoute from "./components/routing/PrivateRoutes";
import AdminRoute from "./components/routing/AdminRoutes";
import Navbar from './components/layouts/Navbar';
import Landing from "./components/layouts/Landing";
import Footer from './components/layouts/Footer';

// import Alert from '../layouts/Alert';
import Register from "./components/auth/Register";
import Login from './components/auth/Login';
import Product from './components/product/Product';
import ProductDetail from './components/product/ProductDetail';
import Cart from './components/cart/Cart';
import Orders from './components/order/Orders';
import OrderDetail from './components/order/OrderDetail';
import Profile from './components/profile/Profile';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import PaymentContainer from './components/cart/PaymentContainer';
import OrderSuccess from './components/cart/OrderSuccess';
import Map from './components/layouts/Map';
// import Map from '../layouts/Map';

// ========================================

import NotFound from './components/layouts/NotFound';
import AdminSlideList from './components/admin/slide/AdminSlideList';
import AdminSlideDetail from './components/admin/slide/AdminSlideDetail';
import AdminSlideCreate from './components/admin/slide/AdminSlideCreate';
import AdminImageList from './components/admin/image/AdminImageList';
import AdminImageDetail from './components/admin/image/AdminImageDetail';
import AdminProductList from './components/admin/product/AdminProductList';
import AdminProductDetail from './components/admin/product/AdminProductDetail';
import AdminProductCreate from './components/admin/product/AdminProductCreate';
import AdminUserList from './components/admin/users/AdminUserList';
import AdminUserDetail from './components/admin/users/AdminUserDetail';
import AdminOrders from './components/admin/orders/AdminOrders';
import AdminOrderDetail from './components/admin/orders/AdminOrderDetail';

const App = () => {
  useEffect (() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    store.dispatch(loadUser());
    // logout user from all tabs if logged out from one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch(logout());
    });
  }, []);

  return (<>
    <Provider store={store} >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<MainRoutes />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shop" element={<Product />} />
            <Route path="/product/:prod_id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/shipping-address" element={<Shipping />} />
            <Route path="/confirm-order" element={<ConfirmOrder />} />
            <Route path="/payment" element={<PaymentContainer />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
          <Route
            path="/orders"
            element={<PrivateRoute component={Orders} />}
          />
          <Route
            path="/order/:order_id/detail"
            element={<PrivateRoute component={OrderDetail} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            path="/map"
            element={<PrivateRoute component={Map} />}
          />

          {/* ADMIN */}
          <Route
            path="/admin/slide/list"
            element={<AdminRoute component={AdminSlideList} />}
          />
          <Route
            path="/admin/slide/create"
            element={<AdminRoute component={AdminSlideCreate} />}
          />
          <Route
            path="/admin/slide/:slide_id/detail"
            element={<AdminRoute component={AdminSlideDetail} />}
          />
          <Route
            path="/admin/image/list"
            element={<AdminRoute component={AdminImageList} />}
          />
          <Route
            path="/admin/image/:image_id/detail"
            element={<AdminRoute component={AdminImageDetail} />}
          />
          <Route
            path="/admin/product-list"
            element={<AdminRoute component={AdminProductList} />}
          />
          <Route
            path="/admin/product/create"
            element={<AdminRoute component={AdminProductCreate} />}
          />
          <Route
            path="/admin/product/:prod_id/detail"
            element={<AdminRoute component={AdminProductDetail} />}
          />
          <Route
            path="/admin/user-list"
            element={<AdminRoute component={AdminUserList} />}
          />
          <Route
            path="/admin/user/:user_id"
            element={<AdminRoute component={AdminUserDetail} />}
          />
          <Route
            path="/admin/order-list"
            element={<AdminRoute component={AdminOrders} />}
          />
          <Route
            path="/admin/order/:order_id/detail"
            element={<AdminRoute component={AdminOrderDetail} />}
          />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position='bottom-left'
        newestOnTop={true}
        autoClose={5000}
        closeOnClick
        pauseOnHover
      />
    </Provider>
  </>)
};
export default App;