import React from 'react';
import ReactDOM from 'react-dom';
import Concordance from '../../chart/concordance';

import './concordance.css';

/**
 * Contains UI for the main configuration options that
 * modify the visualization.
 */
 export default class ConcordanceComponent extends React.Component {

  componentDidMount() {
    this.chart = new Concordance({
      container: ReactDOM.findDOMNode(this),
      width: 400,
      height: 80
    });

    this.chart.initialRender();
    this.chart.update(this.props.data, this.props.config);
    this.chart.render(this.props.match);
  }

  componentDidUpdate() {
    this.chart.update(this.props.data, this.props.config);
    this.chart.render(this.props.match);
  }

  render() {
    return (
      <div className='concordance'>
        <p>{this.props.data.name}</p>
      </div>
    );
  }
}

ConcordanceComponent.propTypes = {
  config: React.PropTypes.object.isRequired,
  // Text to search for
  match: React.PropTypes.string.isRequired,
  // data object
  data: React.PropTypes.object.isRequired
};
