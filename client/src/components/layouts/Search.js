import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?keyword=${keyword}`);
      // setKeyword('')
    } else {
      navigate(`/shop`);
    };
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={searchHandler}>
        <div className="search__input-group">
          <input
            type="text"
            className="search__input"
            placeholder="search products..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="search__confirm-btn">
            <button className="search__btn">
              <FaSearch />
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
export default Search;