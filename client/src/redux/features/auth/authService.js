import api from "../../../utils/api";
import toast from "react-toastify";

const loadUser = async () => {
  const res = await api.get('/auth');
  let result = res.data.data;
  // TODO: apply client side once first dispatch is approved
  // if (result.userInfo.stripe_cust_id) {
    // await dispatch(addCardToUser(result.userInfo.stripe_cust_id));
  localStorage.setItem("__userInfo", JSON.stringify(result.userInfo));
  return result;
};
    // dispatch({ type: AUTH_USER_LOADED_REQUEST })
    
    // if (result.userInfo.stripe_cust_id) {
      
      // dispatch({
        //   type: AUTH_USER_LOADED,
        //   payload: result
        // })
      // localStorage.setItem("__userInfo", JSON.stringify(getState().auth.userInfo));
    // }
    // toast.error("Failed to retrieve user info.");
    // dispatch({ type: AUTH_USER_LOADED_FAILURE })
    // dispatch({type: AUTH_ERROR});
    // dispatch(setAlert('Failed to retrieve user info.', 'danger'));

const registerUser = async (formRegData) => {
  const res = await api.post('/auth/register', formRegData);
  const result = res.data.data;
  return result;
    // dispatch({type: AUTH_REGISTER_REQUEST})

    // dispatch({
    //   type: AUTH_REGISTER_SUCCESS,
    //   payload: result
    // })
    // dispatch(loadUser());
    // dispatch(setAlert('Successfully registered. Welcome.', 'success'));
    // dispatch(setAlert('Failed to Register', 'danger'));
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    // dispatch({type: AUTH_REGISTER_FAILURE});
};

const loginUser = async (formData) => {
  // try {
    // dispatch({type: AUTH_LOGIN_REQUEST})
    const res = await api.post('/auth/login', formData);

    let result = res.data.data;
    return result;
    // dispatch({
    //   type: AUTH_LOGIN_SUCCESS,
    //   payload: result
    // })

    // dispatch(loadUser());
    // dispatch(setAlert('Welcome!', 'success'));
  // } catch (err) {
    // dispatch(setAlert('Failed to login. Incorrect email or password.', 'danger'));
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    // dispatch({type: AUTH_LOGIN_FAILURE});
  // }
};

const logout = async (history) => {
  // dispatch({type: CART_CLEAR_ITEMS});
  // dispatch({type: CLEAR_CARD_INFO});
  // dispatch({type: USER_DETAILS_RESET});
  // dispatch({type: AUTH_USER_LOGOUT});
  // dispatch({type: ORDER_CLEAR_INFO});
  if (localStorage.getItem('__cart')) localStorage.removeItem('__cart');
  if (localStorage.getItem('__paymentMethod')) localStorage.removeItem('__paymentMethod');
  if (localStorage.getItem('__shippingAddress')) localStorage.removeItem('__shippingAddress');
  if (localStorage.getItem('__userInfo')) localStorage.removeItem('__userInfo');

  history.push('/');
  // dispatch(setAlert('Logout successful.', 'success'));

  return await api.post('/auth/logout');
};

const deleteUser = async (history) => {
    // dispatch({type: CART_CLEAR_ITEMS});
    // dispatch({type: USER_DETAILS_RESET});
    // dispatch({type: AUTH_USER_DELETE_REQUEST});

  await api.delete('/auth/remove');

  if (localStorage.getItem('__cart')) localStorage.removeItem('__cart');
  if (localStorage.getItem('__paymentMethod')) localStorage.removeItem('__paymentMethod');
  if (localStorage.getItem('__shippingAddress')) localStorage.removeItem('__shippingAddress');
  if (localStorage.getItem('__userInfo')) localStorage.removeItem('__userInfo');

  return history.push('/');
    // dispatch(setAlert('Your user account has been deleted.', 'success'));
    // dispatch({type: AUTH_USER_DELETE_FAILURE});
    // const errors = err.response.data.errors;
    // if (errors) {
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    // dispatch(setAlert("Failed to delete account.", "danger"));
  // }
};

const forgotPassword = async (email) => {
    // dispatch({type: AUTH_FORGOT_PASSWORD_REQUEST})
  const res = await api.post('/auth/forgot-password', {email});

  let result = res.data;
  return result;

    // TODO: dispatch(setAlert('Password reset link sent to your email.', 'success'));
  // } catch (err) {
    //TODO: dispatch(setAlert('Failed to send reset link. Check email address and try again.', 'danger'));
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    // dispatch({type: AUTH_FORGOT_PASSWORD_FAILURE});
  // }
};

const verifyPassword = async (token, email, history) => {
  // try {
    // dispatch({type: AUTH_VERIFY_PASSWORD_REQUEST})
  const res = await api.post(`/auth/verify-reset?token=${token}&email=${email}`);

  let result = res.data;
  return result;
    // dispatch({
    //   type: AUTH_VERIFY_PASSWORD_SUCCESS,
    //   payload: result
    // })
    // TODO: dispatch(setAlert('Reset link valid.', 'success'));
  // } catch (err) {
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    // TODO: dispatch(setAlert('Reset link invalid. Please try password reset again.', 'danger'));
    // dispatch({type: AUTH_VERIFY_PASSWORD_FAILURE});
  // }
};

const resetPassword = async (token, email, passwords, history) => {
    // dispatch({type: AUTH_FORGOT_PASSWORD_REQUEST})
  const res = await api.post(`/auth/reset-password?token=${token}&email=${email}`, passwords);
  let result = res.data.status;
  history.push('/login');
  return result;

   // TODO: dispatch(setAlert('Password reset. Please login using new password.', 'success'));
   // TODO: dispatch(setAlert('Failed to reset password. Please try password reset again.', 'danger'));
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    // dispatch({type: AUTH_FORGOT_PASSWORD_FAILURE});
  // }
};

const refreshAccessToken = async (newAccessToken, tokenExample) => {
  // try {
    // dispatch({type: TOKEN_REQUEST});
  // localStorage.setItem("token", getState().auth.token);
  console.log("Access Token Refresh - newAccessToken")
  console.log(newAccessToken);
  console.log("Access Token Refresh - tokenexample")
  console.log(tokenExample);
  console.log("---------------------------------")
  localStorage.setItem("token", newAccessToken);
  // } catch (err) {
    // TODO: dispatch(setAlert("Failed to refresh token.", "danger"));
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    // dispatch({type: TOKEN_FAILURE});
  // }
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