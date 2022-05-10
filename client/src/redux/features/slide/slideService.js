import api from "../../../utils/api";
import { createUpdateSlideShowForm } from '../../../utils/formDataServices';

const getAllSlides = async () => {
  const res = await api.get(`/slides/all`);
  let result = res.data.data.slides;
  return result;
};

const getSlideDetails = async (slide_id) => {
  const res = await api.get(`/slides/${slide_id}`);
  let result = res.data.data.slideInfo;
  return result;
};

const createSlide = async (slideForm, history) => {
  let servicedData = createUpdateSlideShowForm(slideForm);
  await api.post(`/slides/add`, servicedData);
  return history.push('/admin/slide/list');
};

const updateSlide = async (slide_id, slideForm, history) => {
  let servicedData = await createUpdateSlideShowForm(slideForm);
  const res = await api.put(`/slides/${slide_id}/update`, servicedData);
  history.push('/admin/slide/list');
  return res.data.data.slide;
};

const deleteSlide = async (slide_id, history) => {
  await api.delete(`/slides/${slide_id}`);
  history.push('/admin/slide/list');
};

const slideService = {
  getAllSlides,
  getSlideDetails,
  createSlide,
  updateSlide,
  deleteSlide
};
export default slideService;