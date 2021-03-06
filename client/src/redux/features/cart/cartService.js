import api from "../../../utils/api";

const getCart = async () => {
  const res = await api.get('/cart/me');
  let result = res.data.data.cartItems;
  return result;
};

const getCartGuest = async (currentCart) => {
  let result = currentCart;
  // const res = await api.get('/cart/me');
  // const result = res.data.data;
  return result;
};

const resetCartOnProductDelete = async (match, currCartItems) => {
    localStorage.setItem('__cart', JSON.stringify(match));
    return match;
};

const addItemToCart = async (prod_id, qty, currCartItems) => {
  const res = await api.get(`/products/${prod_id}`, qty);
  let result = res.data.data;
  const item = result;
  const existItem = currCartItems.find(i => i.product.id === item.product.id);
  if (existItem) {
    currCartItems = currCartItems.map(i => i.product.id === existItem.product.id ? item : i);
    localStorage.setItem('__cart', JSON.stringify(currCartItems));
    return currCartItems;
  } else {
    currCartItems = [...currCartItems, item]
    localStorage.setItem('__cart', JSON.stringify(currCartItems));
    return currCartItems;
  }
};

const addItemToCartGuest = async (prod_id, qty, currCartItems) => {
  const res = await api.get(`/products/${prod_id}`);
  let product = res.data.data.productInfo;
  const item = {product, qty};
  const existItem = currCartItems.find(i => i.product.id === item.product.id);
  if (existItem) {
    currCartItems = currCartItems.map(i => i.product.id === existItem.product.id ? item : i);
    localStorage.setItem('__cart', JSON.stringify(currCartItems));
    return currCartItems;
  } else {
    currCartItems = [...currCartItems, item]
    localStorage.setItem('__cart', JSON.stringify(currCartItems));
    return currCartItems;
  }
};

const updateItemInCart = async (prod_id, cartQty, currCartItems) => {
  const res = await api.get(`/products/${prod_id}`);
  let result = res.data.data;
  const item = {product: result, cartQty};
  const existItem = currCartItems.find(i => i.product.id === item.product.id);
  if (existItem) {
    currCartItems = currCartItems.map(i => i.product.id === existItem.product.id ? item : i);
    localStorage.setItem('__cart', JSON.stringify(currCartItems));
    return currCartItems;
  } else {
    currCartItems = [...currCartItems, item]
    localStorage.setItem('__cart', JSON.stringify(currCartItems));
    return currCartItems;
  }
};

const removeFromCart = async (currCartItems) => {
  const res = await api.delete(`/cart/delete`);
  let result = res.data.data;
  let final;
  final = currCartItems.filter(i => i.product.id !== result);
  localStorage.setItem('__cart', JSON.stringify(result));
  return final;
};

const removeFromCartGuest = async (prod_id, currCartItems) => {
  let result;
  result = currCartItems.filter(i => i.product.id !== prod_id);
  localStorage.setItem('__cart', JSON.stringify(result));
  return result;
};

const shippingAddressForCart = async (shippingAddress) => {
  localStorage.setItem('__shippingAddress', JSON.stringify(shippingAddress));
  return shippingAddress;
};

const paymentMethodForCart = async (formData) => {
  localStorage.setItem("__paymentMethod", JSON.stringify(formData));
  return formData;
};

const cartService = {
  getCart,
  getCartGuest,
  resetCartOnProductDelete,
  addItemToCart,
  addItemToCartGuest,
  updateItemInCart,
  removeFromCart,
  removeFromCartGuest,
  shippingAddressForCart,
  paymentMethodForCart
};
export default cartService;