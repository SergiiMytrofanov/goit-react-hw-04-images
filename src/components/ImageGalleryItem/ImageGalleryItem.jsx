
import React from 'react';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  render() {
    const { webformatURL, onItemClick, tags } = this.props;
    return (
      <li className={styles.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={styles.ImageGalleryItemImage}
          onClick={() => onItemClick(webformatURL)}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
