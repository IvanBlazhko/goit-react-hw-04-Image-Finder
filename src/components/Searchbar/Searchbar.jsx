import { Component } from 'react';
import PropTypes from 'prop-types';

import Style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputSearch: '',
  };
  handelInputValue = event => {
    this.setState({
      inputSearch: event.currentTarget.value,
    });
  };
  onSearchImage = event => {
    event.preventDefault();
    this.props.handelImg(this.state.inputSearch);
    this.reset();
  };
  reset = () => {
    this.setState({
      inputSearch: '',
    });
  };
  render() {
    const { inputSearch } = this.state;
    return (
      <header className={Style.Searchbar}>
        <form className={Style.SearchForm}>
          <label className={Style.SearchForm__button_label}>Search:</label>
          <input
            className={Style.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            onChange={this.handelInputValue}
            value={inputSearch}
          />
          <button
            type="submit"
            className={Style.SearchForm__button}
            onClick={this.onSearchImage}
          >
            Find
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.proptype = {
  handelInputValue: PropTypes.func,
};
