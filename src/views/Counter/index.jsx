import React, { Component } from 'react';
import Loadable from 'react-loadable';

const LoadableCounter = Loadable({
  loader: () => import('./CounterView.jsx'),
  loading() {
    return <div>Loading...</div>;
  }
});

class Counter extends Component {
  render() {
    return <LoadableCounter />;
  }
}

export default Counter;

