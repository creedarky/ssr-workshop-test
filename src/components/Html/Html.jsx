/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const Html = ({ title, style, scripts, markup, initialState }) => (
  <html lang="en">
    <head>
      <title>{title}</title>
      <link type="text/css" rel="stylesheet" href={`/${style.name}`} />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__ = ${serialize(initialState)}`
        }}
      />
      {scripts.map(s => <script src={`/${s.name}`} />)}
    </body>
  </html>
  );

Html.propTypes = {
  title: PropTypes.string,
  style: PropTypes.string.isRequired,
  scripts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired,
  markup: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialState: PropTypes.object.isRequired
};

Html.defaultProps = {
  title: ''
};


export default Html;
