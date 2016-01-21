import React from "react";
import ReactDOM from 'react-dom';
import Concordance from '../concordance/concordance.jsx';


export default class Concordances extends React.Component {
  constructor() {
    super();
  }

  renderConcordance(d, i) {
    return (
      <Concordance
          key={i}
          index={i}
          config={this.props.config}
          query={this.props.query}
          allData={this.props.data}
          data={d} />
    );
  }

  render() {
    return (
      <div>
        {this.props.data.map((d,i) => this.renderConcordance(d,i) )}
      </div>
    );
  }
};

Concordances.propTypes = {
  config: React.PropTypes.object.isRequired,
  // Text to search for
  query: React.PropTypes.string,
  // data object
  data: React.PropTypes.array.isRequired
};

Concordances.defaultProps = {
  query: ""
};

/**
 * Helper method for instatiating this method imperatively
 * (as opposed to declaratively with React.)
 *
 * @param  {Object} opts display paramters.
 * @param  {Object} opts.config
 * @param  {Array} opts.data
 * @param  {DOMNode} opts.container
 * @param  {String} opts.query
 *
 */
Concordances.show = function(opts) {
  var config = opts.config;
  var data = opts.data;
  var query = opts.query;
  var container = opts.container;

  ReactDOM.render(
    <div>
      <Concordances
        config={config}
        text={data}
        query={query}
      />
    </div>,
    container
  );
};
