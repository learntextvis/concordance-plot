import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import Concordance from './components/concordance/concordance.jsx';

import '../index.html';

// This will render out an an example of viscomponent

import data from '../data/data.json';
import config from '../data/config.json';

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <Concordance
      config={config}
      data={data[0]}
    />,
    document.querySelector("#main"));
});
