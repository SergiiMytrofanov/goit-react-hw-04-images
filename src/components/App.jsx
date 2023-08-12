import React from 'react';
import styles from './App.module.css';

import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const API_KEY = '33677208-f1f2404fc2dd629d3112c23cb';

class App extends React.Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    modalImage: null,
    totalHits: 0, // Initialize totalHits
  };

  handleSearch = (newQuery) => {
    this.setState({ query: newQuery, images: [], page: 1 });
    this.fetchImages(newQuery, 1);
  };

  fetchImages = (query, page) => {
    this.setState({ isLoading: true });
    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
          totalHits: data.totalHits, // Update totalHits
        }));
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleLoadMore = () => {
    const { query, page } = this.state;
    this.fetchImages(query, page);
  };

  handleItemClick = (largeImageURL) => {
    this.setState({ modalImage: largeImageURL });
    document.body.style.overflow = 'hidden';
  };

  handleCloseModal = () => {
    this.setState({ modalImage: null });
    document.body.style.overflow = 'auto';
  };

  render() {
    const { images, isLoading, modalImage, totalHits } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onItemClick={this.handleItemClick} />
        {isLoading && <Loader />}
        <Button
          onClick={this.handleLoadMore}
          images={images}
          isLoading={isLoading}
          totalHits={totalHits}
        />
        {modalImage && <Modal largeImageURL={modalImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;
