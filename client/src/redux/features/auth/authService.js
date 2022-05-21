import api from "../../../utils/api";
import { toast } from "react-toastify";
import { addCardToUser, stripeReset } from "../stripe/stripeSlice";
import { userReset } from "../user/userSlice";
import { clearCart } from "../cart/cartSlice";
import { orderReset } from "../order/orderSlice";
import { loadUser as loadUserSlice, clearAuth } from "./authSlice";

const loadUser = async (thunkAPI) => {
  const res = await api.get('/auth');
  let result = res.data.data;
  if (result.userInfo.stripe_cust_id) {
    thunkAPI.dispatch(addCardToUser(result.userInfo.stripe_cust_id));
  }

  localStorage.setItem("__userInfo", JSON.stringify(result.userInfo));
  return result;
};
    // todo ensure userinfo double spaced on all ls examples  // localStorage.setItem("__userInfo", JSON.stringify(getState().auth.userInfo));

const registerUser = async (formRegData, thunkAPI) => {
  const res = await api.post('/auth/register', formRegData);
  const result = res.data.data;
  thunkAPI.dispatch(loadUserSlice())
  return result;
};

const loginUser = async (formData, thunkAPI) => {
  const res = await api.post('/auth/login', formData);
  let result = res.data.data;

  thunkAPI.dispatch(loadUserSlice())
  return result;
};

const logout = async (navigate, history = null, thunkAPI) => {
  thunkAPI.dispatch(clearCart());
  thunkAPI.dispatch(stripeReset());
  thunkAPI.dispatch(userReset());
  thunkAPI.dispatch(orderReset());
  thunkAPI.dispatch(clearAuth());
  if (localStorage.getItem('__cart')) localStorage.removeItem('__cart');
  if (localStorage.getItem('__paymentMethod')) localStorage.removeItem('__paymentMethod');
  if (localStorage.getItem('__shippingAddress')) localStorage.removeItem('__shippingAddress');
  if (localStorage.getItem('__userInfo')) localStorage.removeItem('__userInfo');

  if (navigate) navigate('/');
  if (history && !navigate) history.push("/");
  // toast.success("Logout successful.", {theme: "colored"});

  return await api.post('/auth/logout');
};

const deleteUser = async (navigate, thunkAPI) => {
  thunkAPI.dispatch(clearCart());
  thunkAPI.dispatch(userReset());
  thunkAPI.dispatch(clearAuth());

  await api.delete('/auth/remove');

  return navigate('/');
};

// * works
const forgotPassword = async (email) => {
  const res = await api.post('/auth/forgot-password', {email});

  let result = res.data;
  return result;
};

// * works
const verifyPassword = async (token, email, navigate) => {
  const res = await api.post(`/auth/verify-reset?token=${token}&email=${email}`);

  let result = res.data;
  return result;
};

// * works
const resetPassword = async (token, email, passwords, navigate) => {
  const res = await api.post(`/auth/reset-password?token=${token}&email=${email}`, passwords);
  let result = res.data.status;
  navigate('/login');
  return result;
};

const refreshAccessToken = async (newAccessToken, tokenExample) => {
  console.log("Access Token Refresh - newAccessToken")
  console.log(newAccessToken);
  console.log("Access Token Refresh - tokenexample")
  console.log(tokenExample);
  console.log("---------------------------------")
  localStorage.setItem("token", newAccessToken);
  // TODO: remove console.log and tokenexample after test
};

const authService = {
  loadUser,
  registerUser,
  loginUser,
  logout,
  deleteUser,
  forgotPassword,
  verifyPassword,
  resetPassword,
  refreshAccessToken
};
export default authService;