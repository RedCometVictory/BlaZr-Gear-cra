import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import ProductItem from './ProductItem';
import { listAllCategories, listAllProducts } from '../../redux/features/product/productSlice';
import Paginate from '../layouts/Paginate';
import Spinner from '../layouts/Spinner';

const Product = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.product);
  const { loading, categories, products, page, pages } = allProducts;
  const [searchParams, setSearchParams] = useSearchParams();
  let keyword = searchParams.get("keyword") || '';
  const [hasMounted, setHasMounted] = useState(false);
  let [currentPage, setCurrentPage] = useState(page || 1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    dispatch(listAllCategories())
    // dispatch(listAllProducts(keyword ? keyword : '', category !== 'All' ? category : '', currentPage, itemsPerPage));
    dispatch(listAllProducts({keyword: keyword ? keyword : '', category: category !== 'All' ? category : '', currentPage, itemsPerPage}));
  }, [dispatch, keyword, category, currentPage, itemsPerPage, searchParams]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const categoryChange = (e) => {
    setIsLoading(true);
    setCurrentPage(1);
    setCategory(e.target.value); // 12 or 20, dropdown
  };

  const itemCountChange = (e) => {
    setIsLoading(true);
    if (e.target.value > itemsPerPage) {
      setCurrentPage(currentPage = currentPage - 1);
    }
    setItemsPerPage(Number(e.target.value)); // 12 or 20, dropdown
  };

  const pageChange = (chosenPage) => {
    setCurrentPage(chosenPage);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
    <section className="products">
      <div className="products__header">
        <h2>
          <Link to="/shop">Shop</Link>
        </h2>
        <div className="products__items-page">
          <span>Items per Page:{" "}</span>
          <div className="products__items-select">
            <select name="category" value={category} onChange={e => categoryChange(e)}>
              {categories.map((category, index) => (
                <option value={category.category} key={index}>{category.category}</option>
              ))}
            </select>
            <select name="itemCount" value={itemsPerPage} onChange={e => itemCountChange(e)}>
              <option value="12">12</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
      <div className="products__container">
      {products && products.length > 0 ? (
        products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <div className="">No items found. Try another search term.</div>
      )}
      </div>
    </section>
    <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} pages={pages} pageChange={pageChange} />
    </>
  )
}
export default Product;