import React, { useState } from 'react';
import styles from './App.module.css';

import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const API_KEY = '33677208-f1f2404fc2dd629d3112c23cb';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    fetchImages(newQuery, 1);
  };

  const fetchImages = (query, page) => {
    setIsLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => response.json())
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data.hits]);
        setPage((prevPage) => prevPage + 1);
        setTotalHits(data.totalHits);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLoadMore = () => {
    fetchImages(query, page);
  };

  const handleItemClick = (largeImageURL) => {
    setModalImage(largeImageURL);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setModalImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onItemClick={handleItemClick} />
      {isLoading && <Loader />}
      <Button
        onClick={handleLoadMore}
        images={images}
        isLoading={isLoading}
        totalHits={totalHits}
      />
      {modalImage && <Modal largeImageURL={modalImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
