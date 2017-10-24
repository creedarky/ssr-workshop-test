import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppView from 'views/AppView.jsx';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router><AppView /></Router>
  </Provider>
);

Root.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  store: PropTypes.object.isRequired
};

export default Root;
