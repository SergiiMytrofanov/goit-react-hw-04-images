
import React from 'react';
import * as basicLightbox from 'basiclightbox';
import styles from './Modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    this.modalInstance = basicLightbox.create(`
      <div class=${styles.Overlay}>
        <div class=${styles.Modal}>
          <img src="${this.props.largeImageURL}" alt="Large Image" />
        </div>
      </div>
    `);

    this.modalInstance.show();
    window.addEventListener('keydown', this.handleEscapeKey);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    this.modalInstance.close();
    window.removeEventListener('keydown', this.handleEscapeKey);
    document.body.style.overflow = 'auto';
  }

  handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      this.modalInstance.close();
      this.props.onClose();
    }
  };

  handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      this.modalInstance.close();
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={styles.Overlay} onClick={this.handleModalClick}>
        <div className={styles.Modal}>
          <img src={this.props.largeImageURL} alt="Large"/>
        </div>
      </div>
    );
  }
}

export default Modal;
