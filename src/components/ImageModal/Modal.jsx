import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import Style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ selectedImg, closeModal }) => {
  useEffect(() => {
    const handelKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handelKeyDown);
    return () => {
      window.removeEventListener('keydown', handelKeyDown);
    };
  }, [closeModal]);

  const handelBackdropClick = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className={Style.Overlay} onClick={handelBackdropClick}>
      <div className={Style.Modal}>
        <img src={selectedImg} alt="img" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.proptype = {
  selectedImg: PropTypes.func,
  closeModal: PropTypes.func,
};
