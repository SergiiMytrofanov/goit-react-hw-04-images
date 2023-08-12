
import React from 'react';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends React.Component {
  render() {
    const { images, onItemClick } = this.props;
    return (
      <ul className={styles.ImageGallery}>
        {images.map((image) => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            onItemClick={onItemClick}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
