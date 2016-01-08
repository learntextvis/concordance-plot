import React from 'react';
import ReactDOM from 'react-dom';
import Chart from '../../chart/chart';

import './concordance.css';

/**
 * Contains UI for the main configuration options that
 * modify the visualization.
 */
 export default class Concordance extends React.Component {

  componentDidMount() {
    this.chart = new Chart({
      container: ReactDOM.findDOMNode(this)
    });

    this.chart.initialRender();
    this.chart.update(this.props.data, this.props.config);
    this.chart.render();
  }

  componentDidUpdate() {
    this.chart.update(this.props.data, this.props.config);
    this.chart.render();
  }

  render() {
    return (
      <div className='concordance'></div>
    );
  }
}

Concordance.propTypes = {
  // document properties here.
  config: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired
};
