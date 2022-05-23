import Axios from 'axios';
import history from './history';
import store from '../redux/store';
import { logout, refreshAccessToken } from '../redux/features/auth/authSlice';

const api = Axios.create({
  // development
  baseURL: 'http://localhost:5000/api',
  // baseURL: `${process.env.HEROKU_DOMAIN}/api`,
  // production
  // baseURL: `https://blazrgear.herokuapp.com/api`,
  // timeout:5000,
  timeout:25000,
  // 'Content-Type': 'multipart/form-data'
  // headers: {
    // "Authorization": "Bearer " + localStorage.getItem("token"),
    // 'X-Content-Type-Options': "nosniff",
    // "Accept": "application/json",
    // "Accept": 'multipart/form-data',
    // "Content-Type": 'multipart/form-data',
    // 'Content-Type': 'application/json',
  // },
  credentials: 'include',
  withCredentials: true
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    //checking if accessToken exists
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//*** ORIGINAL REQQUEST
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    //extracting response and config objects
    const { response, config } = error;
    //checking if error is Aunothorized error
    let originalRequest = config;

    if (response?.status === 401 && originalRequest.url.includes("auth/refresh-token")) {
      // stop loop
      store.dispatch(logout({navigate: null, history}));
      return Promise.reject(error);
    }
    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refResponse = await api.get("/auth/refresh-token");
        console.log("refreshing token of access")
        let accessToken = refResponse.data.data.token;
        if (accessToken) {
          console.log("acess token exists")
          console.log(accessToken)
          store.dispatch(refreshAccessToken(accessToken));
          config.headers["Authorization"] = "Bearer " + accessToken;
        }
        //with new token retry original request
        return api(originalRequest);
      } catch (err) {
        // store.dispatch(logout())
        if (err.response && err.response.data) {
          return Promise.reject(err.response.data);
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error)
  }
);
export default api;