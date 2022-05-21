import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCartGuest, resetCartOnProductDelete } from '../../redux/features/cart/cartSlice';
import { getUserProfile } from '../../redux/features/user/userSlice'
import { getAllProductIds } from '../../redux/features/product/productSlice';
import CartItem from './CartItem';
import Spinner from '../layouts/Spinner';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuth = useSelector(state => state.auth);
  const productDetails = useSelector(state => state.product);
  const cartDetails = useSelector(state => state.cart);
  const [hasMounted, setHasMounted] = useState(false);
  // const [updatingCart, setUpdatingCart] = useState(false);
  const { isAuthenticated } = userAuth;
  let { productIds } = productDetails;
  let { loading, cartItems, shippingAddress } = cartDetails;
  let price = {};

  useEffect(() => {
    dispatch(getAllProductIds());

    dispatch(getCartGuest());
    if (isAuthenticated) {
      dispatch(getUserProfile());
      // dispatch(getCart());
      // return dispatch(getCartGuest()); 
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    setHasMounted(true);
  }, [dispatch]); 

  if (!hasMounted) {
    return null;
  }

  // check/compare states of cartItems and products. The purpose is to replace cart if products where removed from the shop
  let match = [];
  let currentLS = localStorage.getItem('__cart');
  let currentLocalStorage;
  if (currentLS) currentLocalStorage = JSON.parse(currentLS);
  if (productIds.length > 0 && cartItems.length > 0 && hasMounted) {
    for(let i = 0; i < cartItems.length; i++) {
      for(let j = 0; j < productIds.length; j++) {
        if (cartItems[i].product.product_id === productIds[j].id) {
          match.push(cartItems[i]);
          break;
        }
      }
    };
    // setUpdatingCart(true);
    if (currentLocalStorage.length > 0) {
      if (match.length !== currentLocalStorage.length) {
        dispatch(resetCartOnProductDelete(match));
      };
    };
    // setUpdatingCart(false);
  }

  // if (updatingCart) setUpdatingCart(false);

  const checkoutHandler = () => {
    // if (updatingCart) return;
    if (!isAuthenticated) {
      toast.warn('Please login / create account to continue with checkout.', {theme: 'colored', toastId: "loginToastId"});
      return navigate('/login');
    }
    // const orderPrice = localStorage.setItem('__orderPrice', JSON.stringify(price));
    if (Object.keys(shippingAddress).length === 0 || !shippingAddress) {
      navigate("/shipping-address");
    } else {
      navigate("/payment");
    }
  };

  price.subTotal = cartItems.reduce((acc, item) => acc += item.product.price * item.qty, 0).toFixed(2);
  price.tax = Number(price.subTotal * 0.11).toFixed(2);
  price.shippingTotal = 
    price.subTotal < 50 && price.subTotal > 0.01 ? (
      3.00
    ) : price.subTotal > 50 && price.subTotal < 100 ? (
      Number(price.subTotal * 0.069).toFixed(2)
    ) : (
      0
    );
  price.grandTotal = (Number(price.subTotal) + Number(price.tax) + Number(price.shippingTotal)).toFixed(2);

  return loading ? (
    <Spinner />
  ) : (
    <section className="carts">
      <div className="carts__header">
        <h2 className="carts__title">Your Cart</h2>
        <div className="carts__total-items">{cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)} Items</div>
      </div>
      <div className="carts__content">
        <div className="carts__list">
          {cartItems.length === 0 || !cartItems ? (
            <div className="">
              <div className="">Cart is Empty</div>
              <Link to="/shop">
                <div className="">
                  Continue Shopping
                </div>
              </Link>
            </div>
          ) : (
            cartItems.map((cart, i) => <CartItem cart={cart} key={i}/>)
          )}
        </div>
        <div className="carts__total">
          <h4 className="carts__total-header">Order Summary</h4>
          <div className="carts__totals">
            <div className="carts__subtotal">
              Sub-Total: $ {price.subTotal}
            </div>
            <div className="carts__tax-total">
              Tax: $ {price.tax}
            </div>
            <div className="carts__shipping-total">
              Shipping: $ {price.shippingTotal}
            </div>
            <div className="carts__grand-total">
              <span>Grand Total: </span>
              <span>$ {price.grandTotal}</span>
            </div>
            {cartItems.length !== 0 && (
              <div className="carts__btn-checkout" onClick={() => checkoutHandler()}>
                Checkout
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Cart;