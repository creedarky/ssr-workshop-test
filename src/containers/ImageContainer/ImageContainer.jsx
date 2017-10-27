import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchImage, removeImage } from 'actions/image.js';
import Image from 'components/Image/Image.jsx';

class ImageContainer extends Component {

  componentDidMount() {
    if (!this.props.image) {
      this.props.fetchImage();
    }
  }

  render() {
    return (
      <Image
        image={this.props.image}
        fetchImage={this.props.fetchImage}
        removeImage={this.props.removeImage}
      />
    );
  }
}

ImageContainer.propTypes = {
  image: PropTypes.string,
  fetchImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired
};

ImageContainer.defaultProps = {
  image: null
};

function mapStateToProps({ image }) {
  return {
    image
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchImage, removeImage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageContainer);
