import React from "react";
import { Outlet } from "react-router-dom";

const MainRoutes = () => {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
};
export default MainRoutes;
// OZRIGINAL
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import PrivateRoute from "./PrivateRoutes";
// import AdminRoute from "./AdminRoutes";

// // import Alert from '../layouts/Alert';
// import Register from "../auth/Register";
// import Login from '../auth/Login';
// import Product from '../product/Product';
// import ProductDetail from '../product/ProductDetail';
// import Cart from '../cart/Cart';
// import Orders from '../order/Orders';
// import OrderDetail from '../order/OrderDetail';
// import Profile from '../profile/Profile';
// import ForgotPassword from '../auth/ForgotPassword';
// import ResetPassword from '../auth/ResetPassword';
// import Shipping from '../cart/Shipping';
// import ConfirmOrder from '../cart/ConfirmOrder';
// import PaymentContainer from '../cart/PaymentContainer';
// import OrderSuccess from '../cart/OrderSuccess';
// // import Map from '../layouts/Map';

// // ========================================

// import NotFound from '../layouts/NotFound';
// import AdminSlideList from '../admin/slide/AdminSlideList';
// import AdminSlideDetail from '../admin/slide/AdminSlideDetail';
// import AdminSlideCreate from '../admin/slide/AdminSlideCreate';
// import AdminImageList from '../admin/image/AdminImageList';
// import AdminImageDetail from '../admin/image/AdminImageDetail';
// import AdminProductList from '../admin/product/AdminProductList';
// import AdminProductDetail from '../admin/product/AdminProductDetail';
// import AdminProductCreate from '../admin/product/AdminProductCreate';
// import AdminUserList from '../admin/users/AdminUserList';
// import AdminUserDetail from '../admin/users/AdminUserDetail';
// import AdminOrders from '../admin/orders/AdminOrders';
// import AdminOrderDetail from '../admin/orders/AdminOrderDetail';

// const MainRoutes = () => {
//   return (
//     <main className="container">
//       {/* <Alert /> */}
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/search/:keyword" element={<Product />} />
//         <Route path="/shop" element={<Product />} />
//         <Route path="/product/:prod_id" element={<ProductDetail />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/shipping-address" element={<Shipping />} />
//         <Route path="/confirm-order" element={<ConfirmOrder />} />
//         <Route path="/payment" element={<PaymentContainer />} />
//         <Route path="/success" element={<OrderSuccess />} />

//         <Route
//           path="/orders"
//           element={<PrivateRoute component={Orders} />}
//         />
//         <Route
//           path="/order/:order_id/detail"
//           element={<PrivateRoute component={OrderDetail} />}
//         />
//         <Route
//           path="/profile"
//           element={<PrivateRoute component={Profile} />}
//         />
//         {/* <Route
//           path="/map"
//          element={<PrivateRoute component={Map} />}
//         /> */}

//         {/* ADMIN */}
//         <Route
//           path="/admin/slide/list"
//           element={<AdminRoute component={AdminSlideList} />}
//         />
//         <Route
//           path="/admin/slide/create"
//           element={<AdminRoute component={AdminSlideCreate} />}
//         />
//         <Route
//           path="/admin/slide/:slide_id/detail"
//           element={<AdminRoute component={AdminSlideDetail} />}
//         />
//         <Route
//           path="/admin/image/list"
//           element={<AdminRoute component={AdminImageList} />}
//         />
//         <Route
//           path="/admin/image/:image_id/detail"
//           element={<AdminRoute component={AdminImageDetail} />}
//         />
//         <Route
//           path="/admin/product-list"
//           element={<AdminRoute component={AdminProductList} />}
//         />
//         <Route
//           path="/admin/product/create"
//           element={<AdminRoute component={AdminProductCreate} />}
//         />
//         <Route
//           path="/admin/product/:prod_id/detail"
//           element={<AdminRoute component={AdminProductDetail} />}
//         />
//         <Route
//           path="/admin/user-list"
//           element={<AdminRoute component={AdminUserList} />}
//         />
//         <Route
//           path="/admin/user/:user_id"
//           element={<AdminRoute component={AdminUserDetail} />}
//         />
//         <Route
//           path="/admin/order-list"
//           element={<AdminRoute component={AdminOrders} />}
//         />
//         <Route
//           path="/admin/order/:order_id/detail"
//           element={<AdminRoute component={AdminOrderDetail} />}
//         />
//         <Route path="/*" element={<NotFound />} />
//       </Routes>
//     </main>
//   );
// };
// export default MainRoutes;

// /*




// */