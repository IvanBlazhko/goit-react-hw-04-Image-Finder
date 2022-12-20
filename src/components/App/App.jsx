import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../ImageModal/Modal';
import { fetchImg } from '../../PixabayAPI/API';
import Spinner from '../Spiner/Spinner';

const App = () => {
  const [searchImg, setSearchImg] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const fetchData = async () => {
      if (searchImg !== '') {
        setStatus('pending');
        try {
          const data = await fetchImg(searchImg, page);
          setImages(prevState => [...prevState, ...data.hits]);
          setShowBtn(page < data.totalHits / 12);
          setStatus('resolved');
        } catch (error) {
          toast.error('Error, please reload the page');
          setStatus('rejected');
        } finally {
        }
      }
    };
    fetchData();
  }, [searchImg, page]);

  const pageIncrement = () => {
    setPage(prevState => prevState + 1);
  };

  const getLargeURL = event => {
    setSelectedImg(event.target.name);
  };

  const handelImg = inputSearch => {
    setSearchImg(inputSearch);
    setImages([]);
    setPage(1);
  };

  const closeModal = () => {
    setSelectedImg('');
  };

  if (status === 'idle') {
    return <Searchbar handelImg={handelImg} />;
  }
  if (status === 'rejected') {
    return (
      <>
        <Searchbar handelImg={handelImg} />
        <ToastContainer autoClose={3000} theme={'colored'} />
      </>
    );
  }
  if (status === 'pending') {
    return (
      <>
        <Searchbar handelImg={handelImg} />
        <ImageGallery images={images} getLargeURL={getLargeURL} />
        <Spinner />
      </>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        <Searchbar handelImg={handelImg} />
        <ImageGallery images={images} getLargeURL={getLargeURL} />
        {showBtn && <Button pageIncrement={pageIncrement} />}
        {selectedImg && (
          <Modal selectedImg={selectedImg} closeModal={closeModal} />
        )}
      </>
    );
  }
};

export default App;
