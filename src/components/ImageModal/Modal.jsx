import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import Style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }
  handelKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };
  handelBackdropClick = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      this.props.closeModal();
    }
  };
  render() {
    const { selectedImg } = this.props;
    return createPortal(
      <div className={Style.Overlay} onClick={this.handelBackdropClick}>
        <div className={Style.Modal}>
          <img src={selectedImg} alt="img" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.proptype = {
  selectedImg: PropTypes.func,
  closeModal: PropTypes.func,
};
