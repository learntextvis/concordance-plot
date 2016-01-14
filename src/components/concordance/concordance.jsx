import React from 'react';
import Concordance from '../../chart/concordance';

import './concordance.css';

 export default class ConcordanceComponent extends React.Component {

  componentDidMount() {
    this.chart = new Concordance({
      container: this.refs.plot,
      width: 600,
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
        <p className='concordance-title'>{this.props.data.name}</p>
        <div ref='plot' className="concordance-plot"></div>
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
