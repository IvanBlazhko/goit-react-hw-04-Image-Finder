import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../ImageModal/Modal';
import { fetchImg } from '../../PixabayAPI/API';
import Spinner from '../Spiner/Spinner';

class App extends Component {
  state = {
    searchImg: '',
    selectedImg: '',
    page: 1,
    isLoading: false,
    showBtn: null,
    images: null,
    status: 'idle',
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { searchImg, page } = this.state;
    if (prevState.searchImg !== searchImg || prevState.page !== page) {
      this.setState({ status: 'pending' });
      try {
        const data = await fetchImg(searchImg, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          showBtn: page < data.totalHits / 12,
          status: 'resolved',
        }));
      } catch (error) {
        toast.error('Error, please reload the page');
        this.setState({
          status: 'rejected',
          error: 'Error, please reload the page',
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  pageIncrement = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  getLargeURL = event => {
    this.setState({
      selectedImg: event.target.name,
    });
  };
  handelImg = inputSearch => {
    this.setState({
      searchImg: inputSearch,
      images: [],
      page: 1,
    });
  };
  closeModal = () => {
    this.setState({
      selectedImg: '',
    });
  };
  render() {
    const { images, selectedImg, status, showBtn } = this.state;

    if (status === 'idle') {
      return <Searchbar handelImg={this.handelImg} />;
    }
    if (status === 'rejected') {
      return (
        <>
          <Searchbar handelImg={this.handelImg} />
          <ToastContainer autoClose={3000} theme={'colored'} />
        </>
      );
    }
    if (status === 'pending') {
      return (
        <>
          <Searchbar handelImg={this.handelImg} />
          <ImageGallery images={images} getLargeURL={this.getLargeURL} />
          <Spinner />
        </>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <Searchbar handelImg={this.handelImg} />
          <ImageGallery images={images} getLargeURL={this.getLargeURL} />
          {showBtn && <Button pageIncrement={this.pageIncrement} />}
          {selectedImg && (
            <Modal selectedImg={selectedImg} closeModal={this.closeModal} />
          )}
        </>
      );
    }
  }
}

export default App;
