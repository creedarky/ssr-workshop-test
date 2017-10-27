import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'components/Header/Header.jsx';
import Main from 'components/Main/Main.jsx';
import Footer from 'components/Footer/Footer.jsx';
import routes from 'routes.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        {
          routes.map(route => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))
        }
      </Main>
      <Footer />
    </div>
  );
}

export default App;
