import api from "../../../utils/api";
import { refundOrder as refundOrderSlice } from "../order/orderSlice";

const setCard = async (card) => {
  return card;
};

const addCardToUser = async (stripeId) => {
  const res = await api.post('/payment/add-user-card', { stripeId });
  let result = res.data.data;
  return result;
};

const singleCharge = async (total, description, cart) => {
  const chargeData = { total, description, cart };
  const res = await api.post('/payment/single-checkout-charge', chargeData);
  let result = res.data.data.clientSecret;
  return result;
};

const saveCardAndCharge = async (total, description, cart) => {
  const chargeData = {total, description, cart};
  const res = await api.post('/payment/save-card-charge', chargeData);
  let result = res.data.data.clientSecret;
  return result;
};

const singleChargeCard = async (card, total, description, cart) => {
  const chargeData = {card, total, description, cart};
  const res = await api.post('/payment/checkout-charge-card', chargeData);
  let result = res.data.data.clientSecret;
  return result;
};

const deleteCard = async (cardId, currCards) => {
  const res = await api.post('/payment/delete-card', {cardId});
  let result = res.data.data;
  // filter by payment method id
  let removedPM = currCards.data.filter(pm => pm.id !== result.deleted.id);
  return removedPM;
};

const getStripeCharge = async (chargeId) => {
  const res = await api.post('/payment/get-stripe-charge', { chargeId });
  let result = res.data.data;
  return result;
};

const refundCharge = async (orderId, userId, stripePaymentId, amount, thunkAPI) => {
  const chargeData = { orderId, userId, stripePaymentId, amount };
  await api.post(`/payment/refund-charge/order/${orderId}`, chargeData);
  // thunkAPI.dispatch(refundOrderSlice());
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