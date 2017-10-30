import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { fetchImage } from 'actions/image';

const LoadableHome = Loadable({
  loader: () => import('./HomeView.jsx'),
  loading() {
    return <div>Loading...</div>;
  }
});

class Home extends Component {
  render() {
    return <LoadableHome />;
  }
}

Home.fetchData = ({ dispatch }) => dispatch(fetchImage());

export default Home;

