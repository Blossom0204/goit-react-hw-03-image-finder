import {
  ImageGalleryItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styles'
import PropTypes from 'prop-types'

const ImageGalleryItemList = ({
  alt = '',
  webformatURL,
  largeImageURL,
  loadLargeImageURL,
}) => {
  return (
    <ImageGalleryItem>
      <ImageGalleryItemImage
        alt={alt}
        src={webformatURL}
        onClick={() => loadLargeImageURL(largeImageURL)}
      />
    </ImageGalleryItem>
  )
}

ImageGalleryItemList.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    alt: PropTypes.string,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    loadLargeImageURL: PropTypes.func.isRequired,
  }),
}

export default ImageGalleryItemList
