import api from "../../../utils/api";

const getAllImages = async (pageNumber, itemsPerPage) => {
  const res = await api.get(`/images/all?pageNumber=${pageNumber}&offsetItems=${itemsPerPage}`);
  let result = res.data.data;
  return result;
};

const getImageDetails = async (image_id) => {
  const res = await api.get(`/images/${image_id}`);
  let result = res.data.data.image;
  return result;
};

const deleteImage = async (image_id, history) => {
  await api.delete(`/images/${image_id}`);
  return history.push('/admin/image/list');
};

const imageService = {
  getAllImages,
  getImageDetails,
  deleteImage
};
export default imageService;