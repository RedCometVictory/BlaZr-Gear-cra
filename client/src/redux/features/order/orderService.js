import api from "../../../utils/api";

const createOrder = async (orderFormData) => {
  const res = await api.post('/orders', orderFormData);
  let result = res.data.data;
  return result;
};

const getAllUserOrders = async (pageNumber, itemsPerPage) => {
  const res = await api.get(`/orders/my-orders?pageNumber=${pageNumber}&offsetItems=${itemsPerPage}`);
  let result = res.data.data;
  return result;
};
const getAllAdminOrders = async (pageNumber, itemsPerPage) => {
  const res = await api.get(`/orders?pageNumber=${pageNumber}&offsetItems=${itemsPerPage}`);
  let result = res.data.data;
  return result;
};

const getOrderDetails = async (order_id) => {
  const res = await api.get(`/orders/${order_id}`);
  let result = res.data.data;
  return result;
};

const getOrderDetailAdmin = async (order_id) => {
  const res = await api.get(`/orders/admin/${order_id}`);
  let result = res.data.data;
  return result;
};

const payOrder = async (order_id, paymentResult) => {
  const res = await api.get(`/orders/${order_id}/pay`, paymentResult);
  let result = res.data.data;
  return result;
};

const updateOrderStatusToShipped = async (order_id) => {
  const res = await api.get(`/orders/${order_id}/status-to-shipped`);
  let result = res.data.data;
  return result;
};

const deliverOrder = async (order_id) => {
  const res = await api.get(`/orders/${order_id}/deliver`);
  let result = res.data.data;
  return result;
};

const refundOrder = async (order_id) => {
  const res = await api.get(`/orders/${order_id}/refund`);
  let result = res.data.data;
  return result;
};
const refundPayPalOrder = async (orderId, chargeData) => {
  const res = await api.post(`/payment/refund-paypal/order/${orderId}`, chargeData);
  let result = res.data.data;
  return result;
};

const deleteOrder = async (order_id, history) => {
  await api.delete(`/orders/${order_id}/remove`);
  return history.push('/admin/order-list');
};

const orderService = {
  createOrder,
  getAllUserOrders,
  getAllAdminOrders,
  getOrderDetails,
  getOrderDetailAdmin,
  payOrder,
  updateOrderStatusToShipped,
  deliverOrder,
  refundOrder,
  refundPayPalOrder,
  deleteOrder
};
export default orderService;