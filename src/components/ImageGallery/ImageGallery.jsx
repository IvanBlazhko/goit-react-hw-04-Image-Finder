import PropTypes from 'prop-types';
import Style from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

export const ImageGallery = ({ images, getLargeURL }) => {
  return (
    <div className={Style.ImageGallery}>
      {images.map(({ id, user, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          description={user}
          smallImage={webformatURL}
          largeImage={largeImageURL}
          getLargeURL={getLargeURL}
        />
      ))}
    </div>
  );
};

export default ImageGallery;

ImageGallery.proptype = {
  images: PropTypes.array,
  getLargeURL: PropTypes.func,
};
