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
  console.log("SERVICE- products all")
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
  console.log("SERVICE- products details")
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
  // TODO: remove console and comments upon testing
  const res = await api.post(`/products/${prod_id}/reviews`, reviewForm);
  let result = res.data.data.review;
  console.log("currProdByIdReviews - service");
  console.log(currProductByIdReviews)
  // let {productInfo, productRating, productReviews} = currProductByIdReviews;
  // let newState = {...currProductByIdReviews};
  // let newState = currProductByIdReviews.productReviews.unshift(result);
  let newState = [result, ...currProductByIdReviews.productReviews]
  console.log("currProdByIdReviews - service, updated");
  console.log(newState)
  return newState;
/*
let initState = {
  userInfo: {name: "JKay", lastname: "Rises"},
  rating: {score: 5},
  reviews: [
    {id: 1, review: "Cool dude."},
    {id: 2, review: "Helpful."},
    {id: 3, review: "Kind."}
  ]
}

let item = {id: 4, review: "Another one."}

console.log("initState")
console.log(initState)
console.log("============")
console.log("initState - updated")
let newState = {...initState}
let newUserInfo = {name: "Ryan", lastname: "Bryan"}
newState.userInfo = newUserInfo;
//newState = newState.reviews.filter(item=>item.id !== 2)
//newState.reviews.unshift(item)
console.log(newState)

const newstate = {...state}
        const index = newstate.forms.findIndex(f => f.id === action.form.id);
        newstate.forms[index].__formSections.push(action.payload);
        return newstate
  state.order = {
    orderInfo: action.payload.orderInfo,
    orderItems: [...state.order.orderItems],
    userInfo: {...state.order.userInfo}
  };
*/
};

const updateProductReview = async (prod_id, review_id, reviewForm, currProductByIdReviews) => {
  const res = await api.put(`/products/${prod_id}/reviews/${review_id}`, reviewForm);
  let result = res.data.data.updatedReview;

  console.log("currProdByIdReviews - service");
  console.log("currProductByIdReviews")
  console.log(currProductByIdReviews)
  console.log("reviewForm")
  console.log(reviewForm)
  // let newState = {...currProductByIdReviews};
  let newState;
  newState = currProductByIdReviews.productReviews.map(review => review.id === result.id ? review = result : review);
  
  console.log("currProdByIdReviews - service, updated");
  console.log(newState)
  return newState;// saves as [{}], should be {}
};

const deleteProductReview = async (prod_id, review_id, currProductByIdReviews) => {
  await api.delete(`/products/${prod_id}/reviews/${review_id}`);
  let newState = {...currProductByIdReviews};
  newState = newState.productReviews.filter(review => review.id !== review_id);
  return newState;
};

const updateProduct = async (prod_id, productForm, currProdById) => {
// try {
  // let servicedData = await updateProductForm(productForm);
  // dispatch({type: PRODUCT_UPDATE_REQUEST});
  // const res = await api.put(`/products/${prod_id}`, servicedData);
  // let result = res.data.data.productInfo;
  console.log("updating product info - SERVICE")
  console.log(prod_id)
      console.log(productForm)
  // let servicedData = await updateProductForm(productForm);
  let servicedData = await updateProductForm(productForm);
  console.log("servicedData")
  console.log(servicedData)
  const res = await api.put(`/products/${prod_id}`, servicedData);
  // const res = await api.put(`/products/${prod_id}`, productForm);

  let result = res.data.data.productInfo;
  console.log("result")
  console.log(result)
  // let newState = {...currProdById};
  console.log("newState")
  // console.log(newState)
  // newState.productInfo = result;
  // state.productById = action.payload;
  console.log(result)
  console.log("-------newstate aftere update-------")
  // console.log(newState)
  console.log(result)
  return result;
  
  
  // } catch (err) {
  //   console.error(err)
  // }
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