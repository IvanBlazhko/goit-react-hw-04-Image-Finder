import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Style from './Searchbar.module.css';

const Searchbar = ({ handelImg }) => {
  const [inputSearch, setInputSearch] = useState('');

  const handelInputValue = event => {
    setInputSearch(event.currentTarget.value);
  };

  const onSearchImage = event => {
    event.preventDefault();
    handelImg(inputSearch);
    reset();
  };

  const reset = () => {
    setInputSearch('');
  };

  return (
    <header className={Style.Searchbar}>
      <form className={Style.SearchForm}>
        <label className={Style.SearchForm__button_label}>Search:</label>
        <input
          className={Style.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          onChange={handelInputValue}
          value={inputSearch}
        />
        <button
          type="submit"
          className={Style.SearchForm__button}
          onClick={onSearchImage}
        >
          Find
        </button>
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.proptype = {
  handelInputValue: PropTypes.func,
};
