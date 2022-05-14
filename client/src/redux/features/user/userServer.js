import api from "../../../utils/api";

const getUserProfile = async (card) => {
  const res = await api.get('/users/me');
  let result = res.data.data;
  return result;
};

const getUserProfileAdmin = async (user_id) => {
  const res = await api.get(`/users/${user_id}`);
  const result = res.data.data;
  return result;
};

const getUsersAdmin = async () => {
  const res = await api.get(`/users`);
  const result = res.data.data.profiles;
  return result;
};

const updateUserInfo = async (userForm) => {
  const res = await api.put(`/users/info`, userForm);
  let result = res.data.data;
  localStorage.setItem('userInfo', JSON.stringify(result));
  return result;
};

const createUserProfile = async (profileForm) => {
  const res = await api.post(`/users/profile`, profileForm);
  let result = res.data.data;
  localStorage.setItem('userInfo', JSON.stringify(result));
  return result;
};

const updateUserProfile = async (profileForm) => {
  const res = await api.put(`/users/profile`, profileForm);
  let result = res.data.data;
  localStorage.setItem('userInfo', JSON.stringify(result));
  return result;
};

const updateUserAdmin = async (user_id, userForm) => {
  const res = await api.put(`/users/${user_id}`, userForm);
  let result = res.data.data;
  localStorage.setItem('__userInfo', JSON.stringify(result));
  return result;
};

const userService = {
  getUserProfile,
  getUserProfileAdmin,
  getUsersAdmin,
  updateUserInfo,
  createUserProfile,
  updateUserProfile,
  updateUserAdmin
};
export default userService;