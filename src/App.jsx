import { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Loader from './components/Loader/Loader'
import Searchedbar from './components/Searchbar/Searchbar'
import Api from './services/api'
import ImageGalleryList from './components/ImageGallery/ImageGallery'
import Button from './components/Button/Button'
import ModalWindow from './components/Modal/Modal'
import PropTypes from 'prop-types'

class App extends Component {
  state = {
    error: null,
    images: [],
    isLoading: false,
    selectedImage: '',
    page: 1,
    searchQuery: '',
    showModal: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages()
    }

    if (this.state.page !== 2 && prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state
    this.toggleLoader()

    Api.fetchImages({ searchQuery, page })
      .then((hits) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }))
      })
      .catch((error) => this.setState({ error: 'No image foumd' }))
      .finally(() => this.setState(this.toggleLoader()))
  }

  loadLargeImageURL = (largeImageURL) => {
    this.setState({ selectedImage: largeImageURL })
    this.toggleModal()
  }

  handleSubmit = (value) => {
    this.setState({
      images: [],
      page: 1,
      searchQuery: value,
    })
  }

  toggleLoader = () => {
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }))
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  }

  render() {
    const { error, images, isLoading, selectedImage, showModal } = this.state
    return (
      <>
        {error &&
          toast.error('No image found!', {
            position: 'top-right',
            autoClose: 3000,
          })}
        <Searchedbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        <ImageGalleryList images={images} onSelect={this.loadLargeImageURL} />
        {images.length > 11 && <Button onClick={this.fetchImages} />}
        {showModal && (
          <ModalWindow
            onClose={this.toggleModal}
            largeImageURL={selectedImage}
          />
        )}
        {<ToastContainer position="top-right" autoClose={3000} />}
      </>
    )
  }
}
App.propTypes = {
  error: PropTypes.string,
  images: PropTypes.array,
  isLoading: PropTypes.bool,
  selectedImage: PropTypes.string,
  page: PropTypes.number,
  searchQuery: PropTypes.string,
  showModal: PropTypes.bool,
}
export default App
