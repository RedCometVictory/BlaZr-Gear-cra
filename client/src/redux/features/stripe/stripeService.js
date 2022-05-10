import api from "../../../utils/api";
import { createUpdateSlideShowForm } from '../../../utils/formDataServices';

const setCard = async (slide_id) => {
  const res = await api.get(`/slides/${slide_id}`);
  let result = res.data.data.slideInfo;
  return result;
};

const addCardToUser = async (slideForm, history) => {
  let servicedData = createUpdateSlideShowForm(slideForm);
  await api.post(`/slides/add`, servicedData);
  return history.push('/admin/slide/list');
};

const singleCharge = async (slide_id, slideForm, history) => {
  let servicedData = await createUpdateSlideShowForm(slideForm);
  const res = await api.put(`/slides/${slide_id}/update`, servicedData);
  history.push('/admin/slide/list');
  return res.data.data.slide;
};

const saveCardAndCharge = async (slide_id, slideForm, history) => {
  let servicedData = await createUpdateSlideShowForm(slideForm);
  const res = await api.put(`/slides/${slide_id}/update`, servicedData);
  history.push('/admin/slide/list');
  return res.data.data.slide;
};

const singleChargeCard = async (slide_id, slideForm, history) => {
  let servicedData = await createUpdateSlideShowForm(slideForm);
  const res = await api.put(`/slides/${slide_id}/update`, servicedData);
  history.push('/admin/slide/list');
  return res.data.data.slide;
};

const deleteCard = async (slide_id, history) => {
  await api.delete(`/slides/${slide_id}`);
  history.push('/admin/slide/list');
};
const getStripeCharge = async (slide_id, history) => {
  await api.delete(`/slides/${slide_id}`);
  history.push('/admin/slide/list');
};

const refundCharge = async (slide_id, history) => {
  await api.delete(`/slides/${slide_id}`);
  history.push('/admin/slide/list');
};

const stripeService = {
  setCard,
  addCardToUser,
  singleCharge,
  saveCardAndCharge,
  singleChargeCard,
  deleteCard,
  getStripeCharge,
  refundCharge
};
export default stripeService;