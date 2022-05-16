import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductReview, deleteProductReview } from '../../redux/features/product/productSlice';

const ReviewItem = ({ review }) => {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.auth);
  const { userInfo } = userAuth;
  const [editForm, showEditForm] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [setConfirmDelete, isSetConfirmDelete] = useState(false);
  const [editFormData, setEditFormData] = useState({title: `${review.title}`, description: `${review.description}`});

  const { title, description } = editFormData;

  const onChangeHandler = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const editFormHandler = () => {
    showEditForm(!editForm);
  };
  
  const submitEditHandler = e => {
    e.preventDefault();
    let formData = {...editFormData, rating};
    
    dispatch(updateProductReview({prod_id: review.product_id, review_id: review.id, formData}));
    setEditFormData({ title: '', description: '' });
    setRating(1);
  };

  return (
    <div className="review">
      <div className="review__header">
        <div className="review__username">
          {review.username}
        </div>
        <p>|</p>
        <ReactStars
          className="review__user-review"
          count={5}
          size={18}
          edit={false}
          value={review.rating}
          activeColor='#e4d023'
        />
        <div className="review__btns">
          {!setConfirmDelete && editForm && (
            <div className="review__edit-submit">
              <input type="submit" form="edit-review-form" value="Submit Edit" />
            </div>
          )}
          {!setConfirmDelete && userInfo && userInfo.id === review.user_id && (
            <>
            <div className="review__edit" onClick={() => editFormHandler()}>
              {!editForm ? (
                <>Edit Review</>
              ) : (
                <>Cancel Review</>
              )}
            </div>
            <div className="">
              <button className="review__delete" onClick={() => isSetConfirmDelete(true)}>X</button>
            </div>
            </>
          )}
        </div>
        {setConfirmDelete && (
          <div className="review__delete-confirm">
            <div>Are you sure?</div>
            <div className="review__delete-btns">
              <button className="btns del-primary" onClick={e => dispatch(deleteProductReview({prod_id: review.product_id, review_id: review.id}))}>Yes</button>
              <button className="btns del-secondary" onClick={() => isSetConfirmDelete(false)}>No</button>
            </div>
          </div>
        )}
      </div>
      <div className="review__created-date">{review.created_at}</div>
      {editForm ? (
        <form id='edit-review-form' className="reviews__form" onSubmit={submitEditHandler}>
          <div className="reviews__form-group">
            <ReactStars
              className="product__rating"
              count={5}
              size={18}
              value={rating}
              onChange={(newScore) => {
                setRating(newScore);
              }}
              activeColor='#e4d023'
            />
          </div>
          <div className="reviews__form-group">
            <input
              className="form-input"
              type="text"
              name="title"
              value={title}
              maxLength={120}
              onChange={e => onChangeHandler(e)}
              placeholder="Review Title" aria-required="true" 
            />
          </div>
          <div className="reviews__form-group">
            <textarea
              className="form-textarea"
              name="description"
              placeholder="Write a review."
              onChange={e => onChangeHandler(e)}
              value={description}
              cols="30" rows="5" required
            ></textarea>
          </div>
        </form>
      ) : (
        <>
        <div className="review__title">{review.title}</div>
        <div className="review__text">
          {review.description}
        </div>
        </>
      )}
    </div>
  )
}
export default ReviewItem;