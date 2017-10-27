import React from 'react';
import PropTypes from 'prop-types';
import './Image.scss';


const Image = ({ image, fetchImage, removeImage }) => (
  <div className="Image">
    { image ? <img alt="" src={image} /> : <span>No image</span> }
    <div className="ImageButtons">
      <button onClick={fetchImage}>Fetch new Image</button>
      <button onClick={removeImage}>Remove Image</button>
    </div>
  </div>
);

Image.propTypes = {
  image: PropTypes.string,
  fetchImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired
};

Image.defaultProps = {
  image: null
};

export default Image;
