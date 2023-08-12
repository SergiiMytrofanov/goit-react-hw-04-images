import React, { useEffect } from 'react';
import * as basicLightbox from 'basiclightbox';
import styles from './Modal.module.css';

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const modalInstance = basicLightbox.create(`
      <div class=${styles.Overlay}>
        <div class=${styles.Modal}>
          <img src="${largeImageURL}" alt="Large Image" />
        </div>
      </div>
    `);

    modalInstance.show();
    window.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';

    return () => {
      modalInstance.close();
      window.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [largeImageURL, onClose]);

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.Overlay} onClick={handleModalClick}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt="Large" />
      </div>
    </div>
  );
};



export default Modal;
