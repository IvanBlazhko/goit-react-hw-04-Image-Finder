import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import Modal from '../components/ImageModal/Modal';
import { fetchImg } from '../PixabayAPI/API';
import Spinner from '../components/Spiner/Spinner';

class App extends Component {
  state = {
    searchImg: '',
    selectedImg: '',
    page: 1,
    isLoading: false,
    images: null,
    status: 'idle',
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { searchImg, page } = this.state;
    if (prevState.searchImg !== searchImg || prevState.page < page) {
      if (prevState.searchImg !== searchImg) this.reset();
      this.setState({ status: 'pending' });
      try {
        const data = await fetchImg(searchImg, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...data],
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
  reset = () => {
    this.setState({
      images: [],
      page: 1,
    });
  };
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
    });
  };
  closeModal = () => {
    this.setState({
      selectedImg: '',
    });
  };
  render() {
    const { images, selectedImg, status } = this.state;

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
          <Button pageIncrement={this.pageIncrement} />
          {selectedImg && (
            <Modal selectedImg={selectedImg} closeModal={this.closeModal} />
          )}
        </>
      );
    }
  }
}

export default App;
