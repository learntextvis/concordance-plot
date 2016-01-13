import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import Concordance from './components/concordance/concordance.jsx';

import '../index.html';

// This will render out an an example of viscomponent

import data from '../data/data.json';
import config from '../data/config.json';

function renderConcordance(d,i) {
  return <Concordance
    key={i}
    config={config}
    match={config.match}
    data={d} />;
}

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <div>
      {data.map(function(d,i) { return renderConcordance(d,i); })}
    </div>,
    document.querySelector("#main"));
});
