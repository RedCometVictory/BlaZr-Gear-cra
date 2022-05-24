import api from "../../../utils/api";
import { createProductForm, updateProductForm } from "../../../utils/formDataServices";

const getAllProductIds = async () => {
  const res = await api.get(`/products/product-ids`);
  let result = res.data.data.productIds;
  return result;
};

const listAllCategories = async () => {
  const res = await api.get(`/products/categories`);
  let result = res.data.data.categories;
  return result;
};

const listAllProducts = async (keyword, category, pageNumber, itemsPerPage) => {
  const res = await api.get(`/products?keyword=${keyword}&category=${category}&pageNumber=${pageNumber}&offsetItems=${itemsPerPage}`);
  let result = res.data.data;
  return result;
};

const listTopProducts = async () => {
  const res = await api.get(`/products/top`);
  let result = res.data.data.topProducts;
  return result;
};

const listProductDetails = async (prod_id) => {
  const res = await api.get(`/products/${prod_id}`);
  let result = res.data.data;
  return result;
};

const createProduct = async (productForm, navigate) => {
  let servicedData = await createProductForm(productForm);
  await api.post(`/products`, servicedData);
  return navigate('/admin/product-list');
};

const createProductReview = async (prod_id, reviewForm, currProductByIdReviews) => {
  const res = await api.post(`/products/${prod_id}/reviews`, reviewForm);
  let result = res.data.data.review;
  let newState = [result, ...currProductByIdReviews.productReviews]
  return newState;
};

const updateProductReview = async (prod_id, review_id, reviewForm, currProductByIdReviews) => {
  const res = await api.put(`/products/${prod_id}/reviews/${review_id}`, reviewForm);
  let result = res.data.data.updatedReview;
  let newState;
  newState = currProductByIdReviews.productReviews.map(review => review.id === result.id ? review = result : review);
  return newState;
};

const deleteProductReview = async (prod_id, review_id, currProductByIdReviews) => {
  await api.delete(`/products/${prod_id}/reviews/${review_id}`);
  let newState = {...currProductByIdReviews};
  newState = newState.productReviews.filter(review => review.id !== review_id);
  return newState;
};

const updateProduct = async (prod_id, productForm, currProdById) => {
  let servicedData = await updateProductForm(productForm);
  const res = await api.put(`/products/${prod_id}`, servicedData);
  let result = res.data.data.productInfo;
  return result;
};

const deleteProduct = async (prod_id, navigate) => {
  await api.delete(`/products/${prod_id}`);
  return navigate('/admin/product-list');
};

const productService = {
  getAllProductIds,
  listAllCategories,
  listAllProducts,
  listTopProducts,
  listProductDetails,
  createProduct,
  createProductReview,
  updateProductReview,
  deleteProductReview,
  updateProduct,
  deleteProduct
};
export default productService;