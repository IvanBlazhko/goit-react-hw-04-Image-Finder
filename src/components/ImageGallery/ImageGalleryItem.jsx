import Style from './ImageGallery.module.css';

export const ImageGalleryItem = ({
  description,
  smallImage,
  largeImage,
  getLargeURL,
}) => {
  return (
    <div className={Style.ImageGalleryItem}>
      <img
        name={largeImage}
        src={smallImage}
        alt={description}
        className={Style.ImageGalleryItem__image}
        onClick={getLargeURL}
      />
    </div>
  );
};

export default ImageGalleryItem;
