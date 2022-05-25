import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux';
import store from "./redux/store";
import Spinner from "./components/layouts/Spinner";
import MainRoutes from './components/routing/MainRoutes';
import { loadUser, logout } from './redux/features/auth/authSlice';
import setAuthToken from './utils/setAuthToken';
import 'react-toastify/dist/ReactToastify.css';
import './sass/styles.scss';
import PrivateRoute from "./components/routing/PrivateRoutes";
import AdminRoute from "./components/routing/AdminRoutes";
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
const Landing = lazy(() => import("./components/layouts/Landing"));

// import Alert from '../layouts/Alert';
const Register = lazy(() => import("./components/auth/Register"));
const Login = lazy(() => import('./components/auth/Login'));
const Product = lazy(() => import('./components/product/Product'));
const ProductDetail = lazy(() => import('./components/product/ProductDetail'));
const Cart = lazy(() => import('./components/cart/Cart'));
const Orders = lazy(() => import('./components/order/Orders'));
const OrderDetail = lazy(() => import('./components/order/OrderDetail'));
const Profile = lazy(() => import('./components/profile/Profile'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const Shipping = lazy(() => import('./components/cart/Shipping'));
const ConfirmOrder = lazy(() => import('./components/cart/ConfirmOrder'));
const PaymentContainer = lazy(() => import('./components/cart/PaymentContainer'));
const OrderSuccess = lazy(() => import('./components/cart/OrderSuccess'));
const Map = lazy(() => import('./components/layouts/Map'));
// import Map from '../layouts/Map';

// ========================================

const NotFound = lazy(() => import('./components/layouts/NotFound'));
const AdminSlideList = lazy(() => import('./components/admin/slide/AdminSlideList'));
const AdminSlideDetail = lazy(() => import('./components/admin/slide/AdminSlideDetail'));
const AdminSlideCreate = lazy(() => import('./components/admin/slide/AdminSlideCreate'));
const AdminImageList = lazy(() => import('./components/admin/image/AdminImageList'));
const AdminImageDetail = lazy(() => import('./components/admin/image/AdminImageDetail'));
const AdminProductList = lazy(() => import('./components/admin/product/AdminProductList'));
const AdminProductDetail = lazy(() => import('./components/admin/product/AdminProductDetail'));
const AdminProductCreate = lazy(() => import('./components/admin/product/AdminProductCreate'));
const AdminUserList = lazy(() => import('./components/admin/users/AdminUserList'));
const AdminUserDetail = lazy(() => import('./components/admin/users/AdminUserDetail'));
const AdminOrders = lazy(() => import('./components/admin/orders/AdminOrders'));
const AdminOrderDetail = lazy(() => import('./components/admin/orders/AdminOrderDetail'));

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
        <Suspense
          fallback={
            <main className='container'><Spinner /></main>
          }
        >
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
        </Suspense>
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