import React from 'react';
import Container from 'components/Container/Container.jsx';
import ImageContainer from 'containers/ImageContainer/ImageContainer.jsx';
import { fetchImage } from 'actions/image.js';

function HomeView() {
  return (
    <Container>
      <h1>Welcome to hatch-react</h1>
      <p>hatch-react is a React starter kit. It features:</p>
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>React Router</li>
        <li>HOME</li>
        <li>a</li>
      </ul>
      <ImageContainer />
    </Container>
  );
}

HomeView.fetchData = ({ dispatch }) => dispatch(fetchImage());

export default HomeView;
