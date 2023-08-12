
import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, images, isLoading, totalHits }) => {
  const shouldRenderButton = images.length < totalHits && !isLoading;

  return shouldRenderButton ? (
    <button className={styles.Button} type="button" onClick={onClick}>
      Load More
    </button>
  ) : null;
};

export default Button;
